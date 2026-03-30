//Modelo para acceso a la base de datos de los profesores

const pool = require('../config/db.js'); // Asume que tienes conexión a DB

// GET — Obtener todos los docentes
const getAllTeachers = async () => {
    try {
        const query = 'SELECT * FROM teachers ORDER BY id DESC';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// POST — Crear nuevo docente
const createTeacher = async (teacherData) => {
    try {
        const { matricula, name, subject, email, phone, degree, status, avatar } = teacherData;
        
        const query = `
            INSERT INTO teachers (matricula, name, subject, email, phone, degree, status, avatar)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        
        const result = await pool.query(query, [matricula, name, subject, email, phone, degree, status, avatar]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// PUT — Actualizar docente
const updateTeacher = async (id, teacherData) => {
    try {
        const { matricula, name, subject, email, phone, degree, status, avatar } = teacherData;
        
        const query = `
            UPDATE teachers 
            SET matricula = $1, name = $2, subject = $3, email = $4, phone = $5, degree = $6, status = $7, avatar = $8
            WHERE id = $9
            RETURNING *
        `;
        
        const result = await pool.query(query, [matricula, name, subject, email, phone, degree, status, avatar, id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

// DELETE — Eliminar docente
const deleteTeacher = async (id) => {
    try {
        const query = 'DELETE FROM teachers WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher,
};