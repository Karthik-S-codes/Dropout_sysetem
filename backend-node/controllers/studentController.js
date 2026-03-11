const axios = require("axios");
const Student = require("../models/Student");
const fs = require("fs");
const path = require("path");

// POST: Predict and save student
exports.predictStudent = async (req, res) => {
  try {
    const { name, attendance, gpa, backlogs, assignment_rate } = req.body;

    // Call Python ML API
    const response = await axios.post(process.env.ML_API_URL, {
      attendance: Number(attendance),
      gpa: Number(gpa),
      backlogs: Number(backlogs),
      assignment_rate: Number(assignment_rate),
    });

    const probability = response.data.probability;

    // Decide risk level
    let risk = "Low";
    if (probability > 0.7) risk = "High";
    else if (probability > 0.4) risk = "Medium";

    // Save to MongoDB
    const student = new Student({
      name,
      attendance,
      gpa,
      backlogs,
      assignment_rate,
      risk,
      probability,
    });

    await student.save();

    // Also append prediction to CSV for easy export
    try {
      const dataDir = path.join(__dirname, "..", "data");
      const csvPath = path.join(dataDir, "predictions.csv");

      // ensure data directory exists
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const header = "timestamp,name,attendance,gpa,backlogs,assignment_rate,risk,probability\n";

      const escapeCsv = (v) => {
        if (v === null || v === undefined) return "";
        const s = String(v);
        if (s.includes(",") || s.includes('"') || s.includes("\n")) {
          return '"' + s.replace(/"/g, '""') + '"';
        }
        return s;
      };

      const line = `${new Date().toISOString()},${escapeCsv(name)},${escapeCsv(attendance)},${escapeCsv(gpa)},${escapeCsv(backlogs)},${escapeCsv(assignment_rate)},${escapeCsv(risk)},${escapeCsv(probability)}\n`;

      // write header if file missing
      if (!fs.existsSync(csvPath)) {
        fs.writeFileSync(csvPath, header, { encoding: "utf8" });
      }

      fs.appendFileSync(csvPath, line, { encoding: "utf8" });
    } catch (csvErr) {
      console.error("Failed to write prediction to CSV:", csvErr);
    }

    res.json({
      message: "Prediction successful",
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction failed" });
  }
};

// GET: Fetch all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};
