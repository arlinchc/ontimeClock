//rutas para registros de asistencia
const express = require("express");
const router = express.Router();

const {
    createRecord,
    getRecords,
    getRecordsByMatricula
} = require('../controllers/recordsControllers');

router.post("/", createRecord);
router.get("/", getRecords);
router.get("/:matricula", getRecordsByMatricula);

module.exports = router;
