const teacherModel = require('../models/teachesModel');


exports.getTeachers = async (req, res) => {
    const teachers = await teacherModel.getAllTeachers();
    res.json(teachers);
}

exports.newTeacher = async (req, res) => {
    const { name, email, phone, mat } = req.body;
    const newTeacher = await teacherModel.newTeacheradd({ name, email, phone, mat });
    res.status(201).json(newTeacher);
}

exports.getTeacherById = async (req, res) => {
    const { id } = req.params;
    const teacher = await teacherModel.getTeacherById(id);
    res.json(teacher);
}

exports.createTeacher = async (req, res) => {
    const { name, subject, email, phone, degree, status, avatar } = req.body;
    const newTeacher = await teacherModel.createTeacher({ name, subject, email, phone, degree, status, avatar });
    res.status(201).json(newTeacher);
}

exports.updateTeacher = async (req, res) => {
    const { id } = req.params;
    const { name, subject, email, phone, degree, status, avatar } = req.body;
    const updatedTeacher = await teacherModel.updateTeacher(id, { name, subject, email, phone, degree, status, avatar });
    res.json(updatedTeacher);
}

exports.deleteTeacher = async (req, res) => {
    const { id } = req.params;
    await teacherModel.deleteTeacher(id);
    res.status(204).end();
}
