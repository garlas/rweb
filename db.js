const mongoose = require("mongoose");
require("dotenv").config(); // Memuat variabel lingkungan dari file .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Menggunakan URL dari .env
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
