const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  attendance: Number,
  gpa: Number,
  backlogs: Number,
  assignment_rate: Number,
  risk: String,
  probability: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
