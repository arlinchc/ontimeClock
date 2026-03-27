const pool = require('../config/db');

exports.getAllSchedules = async () => {
    const result = await pool.query(`
        SELECT 
            s.id,
            s.teacher_id,
            s.subject,
            s.day,
            s.start_time,
            s.end_time,
            s.room,
            s.group_name as group,
            s.created_at,
            t.name as teacher_name,
            t.subject as teacher_subject
        FROM schedules s
        LEFT JOIN teachers t ON s.teacher_id = t.id
        ORDER BY s.day, s.start_time
    `);
    return result.rows;
};

exports.getScheduleById = async (id) => {
    const result = await pool.query(`
        SELECT 
            s.id,
            s.teacher_id,
            s.subject,
            s.day,
            s.start_time,
            s.end_time,
            s.room,
            s.group_name as group,
            s.created_at,
            t.name as teacher_name,
            t.subject as teacher_subject
        FROM schedules s
        LEFT JOIN teachers t ON s.teacher_id = t.id
        WHERE s.id = $1
    `, [id]);
    return result.rows[0];
};

exports.getSchedulesByTeacher = async (teacherId) => {
    const result = await pool.query(`
        SELECT 
            s.id,
            s.teacher_id,
            s.subject,
            s.day,
            s.start_time,
            s.end_time,
            s.room,
            s.group_name as group,
            s.created_at,
            t.name as teacher_name,
            t.subject as teacher_subject
        FROM schedules s
        LEFT JOIN teachers t ON s.teacher_id = t.id
        WHERE s.teacher_id = $1
        ORDER BY s.day, s.start_time
    `, [teacherId]);
    return result.rows;
};

exports.createSchedule = async (schedule) => {
    const { teacher_id, subject, day, start_time, end_time, room, group_name } = schedule;
    
    const result = await pool.query(
        `INSERT INTO schedules (teacher_id, subject, day, start_time, end_time, room, group_name)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING 
            id,
            teacher_id,
            subject,
            day,
            start_time,
            end_time,
            room,
            group_name as group,
            created_at
        `,
        [teacher_id, subject, day, start_time, end_time, room, group_name]
    );
    return result.rows[0];
};

exports.updateSchedule = async (id, schedule) => {
    const { teacher_id, subject, day, start_time, end_time, room, group_name } = schedule;
    
    const result = await pool.query(
        `UPDATE schedules 
         SET teacher_id = $1, subject = $2, day = $3, start_time = $4, end_time = $5, room = $6, group_name = $7, updated_at = CURRENT_TIMESTAMP
         WHERE id = $8
         RETURNING 
            id,
            teacher_id,
            subject,
            day,
            start_time,
            end_time,
            room,
            group_name as group,
            created_at,
            updated_at
        `,
        [teacher_id, subject, day, start_time, end_time, room, group_name, id]
    );
    return result.rows[0];
};

exports.deleteSchedule = async (id) => {
    const result = await pool.query(
        'DELETE FROM schedules WHERE id = $1 RETURNING id',
        [id]
    );
    return result.rows[0];
};

