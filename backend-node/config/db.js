const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Newer mongoose/mongo drivers don't require these options and may reject them.
    // Let mongoose use its defaults by passing only the URI.
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
