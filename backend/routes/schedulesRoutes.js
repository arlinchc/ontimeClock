const express = require('express');
const router = express.Router();
const controller = require('../controllers/schedulesController');

// Get all schedules
router.get('/', controller.getSchedules);

// Get schedules by teacher
router.get('/teacher/:teacherId', controller.getSchedulesByTeacher);

// Get all teachers (for the form dropdown)
router.get('/data/teachers', controller.getTeachers);

// Get schedule by ID
router.get('/:id', controller.getScheduleById);

// Create new schedule
router.post('/', controller.createSchedule);

// Update schedule
router.put('/:id', controller.updateSchedule);

// Delete schedule
router.delete('/:id', controller.deleteSchedule);

module.exports = router;

