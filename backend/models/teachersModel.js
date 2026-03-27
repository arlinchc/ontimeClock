 //Modelo para acceso a la base de datos de los profesores

 const pool = require('../config/db');
 
 exports.getAllTeachers = async () => {

    const result = await pool.query('SELECT * FROM teachers order by name');
    return result.rows;
 }

exports.createTeacher = async (teacher) => {
    const {name, subject, email, phone, degree, status, avatar} = teacher;

    const result = await pool.query(
        "INSERT INTO teachers (name, subject, email, phone, degree, status, avatar) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [name, subject, email, phone, degree, status, avatar]
    );
    return result.rows[0];
}

exports.updateTeacher = async (id, teacher) => {
    const {name, subject, email, phone, degree, status, avatar} = teacher;

    const result = await pool.query(
        "UPDATE teachers SET name = $1, subject = $2, email = $3, phone = $4, degree = $5, status = $6, avatar = $7 WHERE id = $8 RETURNING *",
        [name, subject, email, phone, degree, status, avatar, id]       
    );
    return result.rows[0];
}

exports.deteleTeacher = async (id) => {
    await pool.query(
        "DELETE FROM teachers WHERE id=$1",
        [id]
    )
    return {message: "Docente borrado.."}
}


