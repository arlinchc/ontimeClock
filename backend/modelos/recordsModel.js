//modelo para registros de asistencia
const pool = require('../config/db');

function getLocalDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getLocalTimeString(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

async function getTeachersColumns() {
    const result = await pool.query(
        "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'teachers'"
    );
    return new Set(result.rows.map((row) => row.column_name));
}

async function ensureRecordsTable() {
    const createTableSql = `
        CREATE TABLE IF NOT EXISTS records (
            id SERIAL PRIMARY KEY,
            matricula VARCHAR(50) NOT NULL,
            nombre VARCHAR(150) NOT NULL,
            hora_entrada TIME,
            hora_salida TIME,
            fecha DATE NOT NULL,
            CONSTRAINT records_unique_matricula_fecha UNIQUE (matricula, fecha)
        )
    `;

    await pool.query(createTableSql);

    const columnsResult = await pool.query(
        "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'records'"
    );

    if (columnsResult.rows.length === 0) {
        await pool.query('DROP TABLE IF EXISTS records');
        await pool.query(createTableSql);
        return;
    }

    const existingColumns = new Set(columnsResult.rows.map((row) => row.column_name));
    const fechaColumn = columnsResult.rows.find((row) => row.column_name === 'fecha');

    if (!existingColumns.has('matricula')) {
        await pool.query('ALTER TABLE records ADD COLUMN matricula VARCHAR(50)');
    }
    if (!existingColumns.has('nombre')) {
        await pool.query('ALTER TABLE records ADD COLUMN nombre VARCHAR(150)');
    }
    if (!existingColumns.has('hora_entrada')) {
        await pool.query('ALTER TABLE records ADD COLUMN hora_entrada TIME');
    }
    if (!existingColumns.has('hora_salida')) {
        await pool.query('ALTER TABLE records ADD COLUMN hora_salida TIME');
    }
    if (!existingColumns.has('fecha')) {
        await pool.query('ALTER TABLE records ADD COLUMN fecha DATE');
        await pool.query('UPDATE records SET fecha = CURRENT_DATE WHERE fecha IS NULL');
    } else if (fechaColumn && fechaColumn.data_type !== 'date') {
        await pool.query(
            `ALTER TABLE records
             ALTER COLUMN fecha TYPE DATE
             USING CASE
               WHEN fecha IS NULL THEN CURRENT_DATE
               ELSE DATE(fecha)
             END`
        );
    }

    await pool.query('UPDATE records SET nombre = COALESCE(nombre, \'Sin nombre\') WHERE nombre IS NULL');
    await pool.query('UPDATE records SET fecha = COALESCE(fecha, CURRENT_DATE) WHERE fecha IS NULL');

    try { await pool.query('ALTER TABLE records ALTER COLUMN matricula SET NOT NULL'); } catch (_) {}
    try { await pool.query('ALTER TABLE records ALTER COLUMN nombre SET NOT NULL'); } catch (_) {}
    try { await pool.query('ALTER TABLE records ALTER COLUMN fecha SET NOT NULL'); } catch (_) {}

    await pool.query(
        `DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1
                FROM pg_constraint
                WHERE conname = 'records_unique_matricula_fecha'
            ) THEN
                BEGIN
                    ALTER TABLE records
                    ADD CONSTRAINT records_unique_matricula_fecha UNIQUE (matricula, fecha);
                EXCEPTION WHEN unique_violation THEN
                    NULL;
                END;
            END IF;
        END $$;`
    );
}

async function getTeacherByMatricula(matricula) {
    const columns = await getTeachersColumns();
    const nameField = columns.has('nombre')
        ? 'nombre'
        : columns.has('name')
            ? 'name'
            : null;

    if (!columns.has('matricula') || !nameField) {
        throw new Error('La tabla teachers debe tener columnas matricula y nombre/name');
    }

    const result = await pool.query(
        `SELECT matricula, ${nameField} AS nombre
         FROM teachers
         WHERE CAST(matricula AS TEXT) = $1
            OR COALESCE(NULLIF(LTRIM(CAST(matricula AS TEXT), '0'), ''), '0')
               = COALESCE(NULLIF(LTRIM($1, '0'), ''), '0')`,
        [matricula]
    );

    return result.rows[0] || null;
}

exports.createRecord = async (record) => {
    const { matricula, tipo_registro } = record;
    const matriculaLimpia = String(matricula || '').trim();

    if (!matriculaLimpia) {
        throw new Error('La matrícula es obligatoria');
    }

    if (tipo_registro !== 'entrada' && tipo_registro !== 'salida') {
        throw new Error('El tipo de registro debe ser entrada o salida');
    }

    await ensureRecordsTable();

    const teacher = await getTeacherByMatricula(matriculaLimpia);
    if (!teacher) {
        throw new Error(`No existe un docente con la matrícula: ${matricula}`);
    }

    const now = new Date();
    const fechaHoy = getLocalDateString(now);
    const horaActual = getLocalTimeString(now);

    const existingResult = await pool.query(
        'SELECT * FROM records WHERE matricula = $1 AND fecha = $2',
        [teacher.matricula, fechaHoy]
    );

    const existing = existingResult.rows[0] || null;

    if (tipo_registro === 'entrada') {
        if (existing && existing.hora_entrada) {
            throw new Error('Ya registraste una entrada hoy');
        }

        const result = existing
            ? await pool.query(
                `UPDATE records
                 SET nombre = $1,
                     hora_entrada = $2
                 WHERE id = $3
                 RETURNING *`,
                [teacher.nombre, horaActual, existing.id]
            )
            : await pool.query(
                `INSERT INTO records (matricula, nombre, hora_entrada, fecha)
                 VALUES ($1, $2, $3, $4)
                 RETURNING *`,
                [teacher.matricula, teacher.nombre, horaActual, fechaHoy]
            );

        return result.rows[0];
    }

    if (!existing) {
        throw new Error('Primero debes registrar una entrada hoy');
    }

    if (existing.hora_salida) {
        throw new Error('Ya registraste una salida hoy');
    }

    const result = await pool.query(
        `UPDATE records
         SET nombre = $1,
             hora_salida = $2
         WHERE id = $3
         RETURNING *`,
        [teacher.nombre, horaActual, existing.id]
    );

    return result.rows[0];
}

exports.getRecords = async () => {
    await ensureRecordsTable();
    const result = await pool.query('SELECT * FROM records ORDER BY fecha DESC, id DESC');
    return result.rows;
}

exports.getRecordsByMatricula = async (matricula) => {
    await ensureRecordsTable();
    const result = await pool.query(
        'SELECT * FROM records WHERE matricula = $1 ORDER BY fecha DESC, id DESC',
        [matricula]
    );
    return result.rows;
}
