const express = require('express');
const router = express.Router();
const controller = require('../controllers/teachersController');

router.get('/', controller.getTeachers);
router.post('/', controller.createTeacher);
router.get('/:id', controller.getTeacherById);
router.put('/:id', controller.updateTeacher);
router.delete('/:id', controller.deleteTeacher);
router.post('/add/teacher/', controller.newTeacher)


const {
getTeachers,
createTeacher,
updateTeacher,
deleteTeacher

} = require('../controllers/teachersControllers');

router.get("/", getTeachers);
router.post("/", createTeacher);
router.put("/:matricula", updateTeacher);
router.delete("/:matricula", deleteTeacher);
module.exports = router;