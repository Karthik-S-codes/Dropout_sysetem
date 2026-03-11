require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cors package for reliable handling of preflight requests
app.use(cors({ origin: '*' }));

// Simple request logger (helps debug CORS/preflight)
app.use((req, res, next) => {
  console.log(`--> ${req.method} ${req.path}`);
  next();
});

// Test route
app.get("/", (req, res) => {
  res.send("Dropout Prediction Backend (MVC) is Running ✅");
});

// Routes
app.use("/api/students", require("./routes/studentRoutes"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
