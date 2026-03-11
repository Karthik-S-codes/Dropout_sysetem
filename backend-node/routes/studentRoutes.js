const express = require("express");
const router = express.Router();

const {
  predictStudent,
  getAllStudents,
} = require("../controllers/studentController");

// POST: Predict and save student
router.post("/predict", predictStudent);

// GET: Get all students
router.get("/", getAllStudents);

module.exports = router;
