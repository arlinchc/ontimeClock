//controlador para invocar el modelo
const teacherModel = require("../models/teachersModel");

exports.getTeachers = async (req, res) => {
    const teachers = await teacherModel.getAllTeachers();
    res.json(teachers);
}

exports.createTeacher = async (req, res) => {
    const teacher = await teacherModel.createTeacher(req.body);
    res.json(teacher);
}

exports.updateTeacher = async (req, res) => {
    const teacher = await teacherModel.updateTeacher(
        req.params.id, 
        req.body
    );
    res.json(teacher);
}

exports.deleteTeacher = async (req, res) => {
    const result = await teacherModel.deleteTeacher(req.params.id);
    res.json(result);
}