// Controlador para la gestión de docentes

const teachersModel = require('../models/teachersModel');

// GET /api/teachers — Obtener todos los docentes
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await teachersModel.getAllTeachers();
        res.status(200).json({
            success: true,
            data: teachers,
        });
    } catch (error) {
        console.error('Error al obtener docentes:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al obtener los docentes.',
        });
    }
};

// POST /api/teachers — Agregar un nuevo docente
exports.createTeacher = async (req, res) => {
    try {
        const { matricula, name, subject, email, phone, degree, status, avatar } = req.body;

        // Validación de campos obligatorios
        if (!name || !subject || !email) {
            return res.status(400).json({
                success: false,
                message: 'Los campos nombre, materia y correo son obligatorios.',
            });
        }

        const newTeacher = await teachersModel.createTeacher({
            matricula,
            name,
            subject,
            email,
            phone,
            degree,
            status,
            avatar,
        });

        res.status(201).json({
            success: true,
            message: 'Docente creado exitosamente.',
            data: newTeacher,
        });
    } catch (error) {
        console.error('Error al crear docente:', error);

        // Manejo de correo duplicado (unique constraint de PostgreSQL)
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: 'Ya existe un docente registrado con ese correo.',
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error interno al crear el docente.',
        });
    }
};

// PUT /api/teachers/:id — Editar un docente existente
exports.updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { matricula, name, subject, email, phone, degree, status, avatar } = req.body;

        // Validación de campos obligatorios
        if (!name || !subject || !email) {
            return res.status(400).json({
                success: false,
                message: 'Los campos nombre, materia y correo son obligatorios.',
            });
        }

        const updatedTeacher = await teachersModel.updateTeacher(id, {
            matricula,
            name,
            subject,
            email,
            phone,
            degree,
            status,
            avatar,
        });

        if (!updatedTeacher) {
            return res.status(404).json({
                success: false,
                message: `No se encontró ningún docente con el ID ${id}.`,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Docente actualizado exitosamente.',
            data: updatedTeacher,
        });
    } catch (error) {
        console.error('Error al actualizar docente:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al actualizar el docente.',
        });
    }
};

// DELETE /api/teachers/:id — Borrar un docente
exports.deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await teachersModel.deleteTeacher(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: `No se encontró ningún docente con el ID ${id}.`,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Docente eliminado exitosamente.',
            data: result,
        });
    } catch (error) {
        console.error('Error al eliminar docente:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno al eliminar el docente.',
        });
    }
};