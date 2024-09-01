const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Gantilah `YOUR_MONGODB_CONNECTION_STRING` dengan string koneksi yang Anda salin dari MongoDB Atlas
    await mongoose.connect(
      "mongodb+srv://garinnugroho1345:wGmiQtrjTMm5Us8t@cluster0.panko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
