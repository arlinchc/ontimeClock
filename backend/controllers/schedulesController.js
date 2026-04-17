const schedulesModel = require('../models/schedulesModel');
const teachersModel = require('../models/teachesModel');

exports.getSchedules = async (req, res) => {
    try {
        const schedules = await schedulesModel.getAllSchedules();
        res.json(schedules);
    } catch (error) {
        console.error('Error getting schedules:', error);
        res.status(500).json({ error: 'Failed to fetch schedules' });
    }
};

exports.getScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        const schedule = await schedulesModel.getScheduleById(id);
        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }
        res.json(schedule);
    } catch (error) {
        console.error('Error getting schedule:', error);
        res.status(500).json({ error: 'Failed to fetch schedule' });
    }
};

exports.getSchedulesByTeacher = async (req, res) => {
    try {
        const { teacherId } = req.params;
        const schedules = await schedulesModel.getSchedulesByTeacher(teacherId);
        res.json(schedules);
    } catch (error) {
        console.error('Error getting schedules by teacher:', error);
        res.status(500).json({ error: 'Failed to fetch schedules by teacher' });
    }
};

exports.createSchedule = async (req, res) => {
    try {
        const { teacher_id, subject, day, start_time, end_time, room, group_name } = req.body;

        // Validate required fields
        if (!teacher_id || !subject || !day || !start_time || !end_time || !room || !group_name) {
            return res.status(400).json({ 
                error: 'Missing required fields: teacher_id, subject, day, start_time, end_time, room, group_name' 
            });
        }

        // Verify teacher exists
        const teacher = await teachersModel.getTeacherById(teacher_id);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const schedule = await schedulesModel.createSchedule({
            teacher_id,
            subject,
            day,
            start_time,
            end_time,
            room,
            group_name
        });

        res.status(201).json(schedule);
    } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ error: 'Failed to create schedule' });
    }
};

exports.updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { teacher_id, subject, day, start_time, end_time, room, group_name } = req.body;

        const schedule = await schedulesModel.updateSchedule(id, {
            teacher_id,
            subject,
            day,
            start_time,
            end_time,
            room,
            group_name
        });

        res.json(schedule);
    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).json({ error: 'Failed to update schedule' });
    }
};

exports.deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        await schedulesModel.deleteSchedule(id);
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ error: 'Failed to delete schedule' });
    }
};

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await teachersModel.getAllTeachers();
        res.json(teachers);
    } catch (error) {
        console.error('Error getting teachers:', error);
        res.status(500).json({ error: 'Failed to fetch teachers' });
    }
};

