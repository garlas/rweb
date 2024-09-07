const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Membuat aplikasi Express
const app = express();

// Middleware CORS diatur di sini, sebelum rute
app.use(
  cors({
    origin: ["https://rsmage.vercel.app", "https://rsmage.site"], // Ganti dengan domain yang diizinkan
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware untuk JSON parsing
app.use(express.json());

// Ganti dengan URI MongoDB kamu
const mongoUri =
  "mongodb+srv://garinnugroho1345:-Zfg3MMd*-P3MXq@cluster0.panko.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Menghubungkan ke MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Model Produk
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  whatsapp: String,
});

const Product = mongoose.model("Product", productSchema);

// Rute dasar
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Mendapatkan semua produk
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Menambahkan produk baru
app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mengupdate produk
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Menghapus produk
app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Port yang digunakan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
