//Se definen los endpoints para las APIS
const express = require("express");

const router = express.Router();

const {
    getTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher
} = require("../controllers/teachersController");

router.get("/", getTeachers);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

module.exports = router;