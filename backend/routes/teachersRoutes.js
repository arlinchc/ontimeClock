// Rutas para la gestión de docentes

const express = require('express');
const router = express.Router();
const teachersController = require("../controllers/teachersControllers");

/**
 * @route   GET /api/teachers
 * @desc    Obtener todos los docentes
 * @access  Public
 */
router.get('/', teachersController.getAllTeachers);

/**
 * @route   POST /api/teachers
 * @desc    Agregar un nuevo docente
 * @body    { name, subject, email, phone, degree, status, avatar }
 * @access  Public
 */
router.post('/', teachersController.createTeacher);

/**
 * @route   PUT /api/teachers/:id
 * @desc    Editar un docente existente
 * @param   id — ID del docente
 * @body    { name, subject, email, phone, degree, status, avatar }
 * @access  Public
 */
router.put('/:id', teachersController.updateTeacher);

/**
 * @route   DELETE /api/teachers/:id
 * @desc    Borrar un docente
 * @param   id — ID del docente
 * @access  Public
 */
router.delete('/:id', teachersController.deleteTeacher);

module.exports = router;