const pool = require('../config/db');

// ── Configuración General (Tabla: "system_Config") ──
exports.getAllConfigs = async () => {
    const result = await pool.query('SELECT * FROM "system_Config" ORDER BY id');
    return result.rows;
};

exports.getConfigById = async (id) => {
    const result = await pool.query('SELECT * FROM "system_Config" WHERE id = $1', [id]);
    return result.rows[0];
};

exports.createConfig = async (config) => {
    const {
        nombre_institucion, codigo_institucional, idioma, zona_horaria,
        tolerancia_entrada, tolerancia_salida, inasistencias_permitidas,
        email_asistencia, email_reportes, push_alertas,
        resumen_diario, alertas_faltas, notif_docentes
    } = config;

    const result = await pool.query(
        `INSERT INTO "system_Config" (
            nombre_institucion, codigo_institucional, idioma, zona_horaria,
            tolerancia_entrada, tolerancia_salida, inasistencias_permitidas,
            email_asistencia, email_reportes, push_alertas,
            resumen_diario, alertas_faltas, notif_docentes
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`,
        [nombre_institucion, codigo_institucional, idioma, zona_horaria,
         tolerancia_entrada, tolerancia_salida, inasistencias_permitidas,
         email_asistencia, email_reportes, push_alertas,
         resumen_diario, alertas_faltas, notif_docentes]
    );
    return result.rows[0];
};

exports.updateConfig = async (id, config) => {
    const {
        nombre_institucion, codigo_institucional, idioma, zona_horaria,
        tolerancia_entrada, tolerancia_salida, inasistencias_permitidas,
        email_asistencia, email_reportes, push_alertas,
        resumen_diario, alertas_faltas, notif_docentes
    } = config;

    const result = await pool.query(
        `UPDATE "system_Config" SET
            nombre_institucion=$1, codigo_institucional=$2, idioma=$3, zona_horaria=$4,
            tolerancia_entrada=$5, tolerancia_salida=$6, inasistencias_permitidas=$7,
            email_asistencia=$8, email_reportes=$9, push_alertas=$10,
            resumen_diario=$11, alertas_faltas=$12, notif_docentes=$13,
            fecha_actualizacion=CURRENT_TIMESTAMP
        WHERE id=$14 RETURNING *`,
        [nombre_institucion, codigo_institucional, idioma, zona_horaria,
         tolerancia_entrada, tolerancia_salida, inasistencias_permitidas,
         email_asistencia, email_reportes, push_alertas,
         resumen_diario, alertas_faltas, notif_docentes, id]
    );
    return result.rows[0];
};

exports.deleteConfig = async (id) => {
    await pool.query('DELETE FROM "system_Config" WHERE id = $1', [id]);
    return { message: 'Configuración eliminada' };
};

// ── Work Days (Tabla: "work_days") ──
exports.getworkdays = async () => {
    const result = await pool.query('SELECT * FROM "work_days"');
    return result.rows;
};

exports.updateworkday = async (id, { nombre, dia, hora_inicio, hora_fin, activo }) => {
    const result = await pool.query(
        `UPDATE "work_days" 
         SET nombre=$1, dia=$2, hora_inicio=$3, hora_fin=$4, activo=$5
         WHERE id=$6 RETURNING *`,
        [nombre, dia, hora_inicio, hora_fin, activo, id]
    );
    return result.rows[0];
};

exports.createworkday = async ({ nombre, dia, hora_inicio, hora_fin, activo }) => {
    const result = await pool.query(
        `INSERT INTO "work_days" (nombre, dia, hora_inicio, hora_fin, activo)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nombre, dia, hora_inicio, hora_fin, activo]
    );
    return result.rows[0];
};

// ── Roles (Tabla: "roles") ──
exports.getAllRoles = async () => {
    const result = await pool.query('SELECT * FROM roles ORDER BY id');
    return result.rows;
};

exports.getRolById = async (id) => {
    const result = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
    return result.rows[0];
};

exports.createRol = async ({ nombre, permisos, usuarios, estado }) => {
    const result = await pool.query(
        `INSERT INTO roles (nombre, permisos, usuarios, estado)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [nombre, permisos, usuarios || 0, estado || 'activo']
    );
    return result.rows[0];
};

exports.updateRol = async (id, { nombre, permisos, usuarios, estado }) => {
    const result = await pool.query(
        `UPDATE roles SET nombre=$1, permisos=$2, usuarios=$3, estado=$4
         WHERE id=$5 RETURNING *`,
        [nombre, permisos, usuarios, estado, id]
    );
    return result.rows[0];
};

exports.deleteRol = async (id) => {
    await pool.query('DELETE FROM roles WHERE id = $1', [id]);
    return { message: 'Rol eliminado' };
};