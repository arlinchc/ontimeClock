//modelos para la base de datos de teachers
const pool = require('../config/db');

async function getTeachersColumns() {
    const result = await pool.query(
        "SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'teachers'"
    );
    return new Set(result.rows.map((row) => row.column_name));
}

exports.getTeachers = async () => {
    const columns = await getTeachersColumns();
    const nameField = columns.has('nombre')
        ? 'nombre'
        : columns.has('name')
            ? 'name'
            : null;

    if (!columns.has('matricula') || !nameField) {
        throw new Error('La tabla teachers debe tener columnas matricula y nombre/name');
    }

    const extraField = columns.has('departamento')
        ? 'departamento'
        : columns.has('materia')
            ? 'materia'
            : null;

    const query = extraField
        ? `SELECT matricula, ${nameField} AS nombre, ${extraField} AS departamento FROM teachers ORDER BY ${nameField} ASC`
        : `SELECT matricula, ${nameField} AS nombre FROM teachers ORDER BY ${nameField} ASC`;

    const result = await pool.query(query);
    return result.rows;
};

exports.createTeacher = async (teacher) => {
    const { matricula, nombre, departamento, materia } = teacher;
    const columns = await getTeachersColumns();

    if (columns.has('departamento')) {
        const result = await pool.query(
            'INSERT INTO teachers (matricula, nombre, departamento) VALUES ($1, $2, $3) RETURNING matricula, nombre, departamento',
            [matricula, nombre, departamento || materia || null]
        );
        return result.rows[0];
    }

    if (columns.has('materia')) {
        const result = await pool.query(
            'INSERT INTO teachers (matricula, nombre, materia) VALUES ($1, $2, $3) RETURNING matricula, nombre, materia AS departamento',
            [matricula, nombre, materia || departamento || null]
        );
        return result.rows[0];
    }

    const result = await pool.query(
        'INSERT INTO teachers (matricula, nombre) VALUES ($1, $2) RETURNING matricula, nombre',
        [matricula, nombre]
    );
    return result.rows[0];
};

exports.updateTeacher = async (matricula, teacher) => {
    const { matricula: nuevaMatricula, nombre, departamento, materia } = teacher;
    const columns = await getTeachersColumns();

    const depColumn = columns.has('departamento')
        ? 'departamento'
        : columns.has('materia')
            ? 'materia'
            : null;

    const depValue = departamento || materia || null;

    const result = depColumn
        ? await pool.query(
            `UPDATE teachers
             SET matricula = COALESCE($1, matricula),
                 nombre = COALESCE($2, nombre),
                 ${depColumn} = COALESCE($3, ${depColumn})
             WHERE matricula = $4
             RETURNING matricula, nombre, ${depColumn} AS departamento`,
            [nuevaMatricula || null, nombre || null, depValue, matricula]
        )
        : await pool.query(
            `UPDATE teachers
             SET matricula = COALESCE($1, matricula),
                 nombre = COALESCE($2, nombre)
             WHERE matricula = $3
             RETURNING matricula, nombre`,
            [nuevaMatricula || null, nombre || null, matricula]
        );

    return result.rows[0] || null;
};

exports.deleteTeacher = async (matricula) => {
    await pool.query(
        'DELETE FROM teachers WHERE matricula = $1',
        [matricula]
    );
    return { message: 'docente eliminado' };
};