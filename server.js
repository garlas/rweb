const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables from .env

const app = express();

app.use(
  cors({
    origin: "https://rsmage.site", // Domain dengan HTTPS
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Import Routes
const productRoutes = require("./routes/products");

// Routes Middleware
app.use("/api/products", productRoutes); // All routes under /api/products will be handled by productRoutes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to the Products API");
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
