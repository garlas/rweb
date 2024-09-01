const express = require("express");
const connectDB = require("./db");
const productRoutes = require("./routes/products");
const cors = require("cors");

const app = express();

// Koneksi ke MongoDB Atlas
connectDB();

// MidwGmiQtrjTMm5Us8tdleware
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
