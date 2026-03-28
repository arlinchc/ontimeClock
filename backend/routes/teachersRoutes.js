//se definen los endpoints para las apis
const express = require("express");

const router = express.Router();
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