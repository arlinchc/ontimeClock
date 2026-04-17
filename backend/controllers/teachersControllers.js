//controlador para invocar al modelo 
const teachersModel = require ('../modelos/teachersModel');

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await teachersModel.getTeachers();
        res.json(teachers);
    } catch (error) {
        console.error('Error al obtener docentes:', error.message);
        res.status(500).json({ error: 'Error al obtener docentes' });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const teacher = await teachersModel.createTeacher(req.body);
        res.status(201).json(teacher);
    } catch (error) {
        console.error('Error al crear docente:', error.message);
        res.status(500).json({ error: 'Error al crear docente' });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const teacher = await teachersModel.updateTeacher(
            req.params.matricula,
            req.body
        );

        if (!teacher) {
            return res.status(404).json({ error: 'Docente no encontrado' });
        }

        res.json(teacher);
    } catch (error) {
        console.error('Error al actualizar docente:', error.message);
        res.status(500).json({ error: 'Error al actualizar docente' });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const result = await teachersModel.deleteTeacher(req.params.matricula);
        res.json(result);
    } catch (error) {
        console.error('Error al eliminar docente:', error.message);
        res.status(500).json({ error: 'Error al eliminar docente' });
    }
};