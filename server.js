const connectDB = require("./db");
const productRoutes = require("./routes/products");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Atur batas ukuran payload JSON menjadi 50MB (atau sesuai kebutuhan)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

// Rute-rute lainnya...

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
