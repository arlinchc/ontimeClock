const express = require('express');
const router = express.Router();
const controller = require('../controllers/teachersController');

router.get('/', controller.getTeachers);
router.post('/', controller.createTeacher);
router.get('/:id', controller.getTeacherById);
router.put('/:id', controller.updateTeacher);
router.delete('/:id', controller.deleteTeacher);
router.post('/add/teacher/', controller.newTeacher)

module.exports = router;