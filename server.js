require("dotenv").config(); // Gunakan dotenv untuk kredensial sensitif
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 27017; // Port server

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// MongoDB connection
const mongoURI = process.env.MONGO_URI; // Menggunakan .env untuk URI MongoDB
if (!mongoURI) {
  console.error("MONGO_URI tidak ditemukan di .env");
  process.exit(1); // Keluar dari aplikasi jika MONGO_URI tidak ditemukan
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Terhubung ke MongoDB"))
  .catch((err) => console.error("Kesalahan koneksi MongoDB:", err));

// Import routes
const productRoutes = require("./routes/products");

// Use routes
app.use("/products", productRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// gYhasslajjU65fffaJ
