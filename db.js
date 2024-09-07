require("dotenv").config(); // Memuat variabel lingkungan dari .env
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI; // Mengambil URI dari variabel lingkungan
console.log("Mongo URI:", MONGO_URI); // Debugging

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
