const express = require('express');
const router = express.Router();

const {
  getSummaryReport,
  getTeacherReportDetails,
} = require('../controllers/reportsControllers');

router.get('/', getSummaryReport);
router.get('/:matricula/details', getTeacherReportDetails);

module.exports = router;
