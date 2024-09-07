const connectDB = require("./db");
const productRoutes = require("./routes/products");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Untuk memuat variabel lingkungan dari .env

const app = express();

// Atur batas ukuran payload JSON menjadi 50MB (atau sesuai kebutuhan)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

// Koneksi ke MongoDB Atlas
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // untuk parsing application/json

// Rute
app.use("/products", productRoutes);

// Rute utama
app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// mongodb+srv://garinnugroho1345:wGmiQtrjTMm5Us8t@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority;
