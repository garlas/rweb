const express = require("express");
const path = require("path");
const app = express();

// Middleware untuk parsing JSON dan URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk mengakses folder uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import dan gunakan router
const productRouter = require("./api/products");
app.use("/products", productRouter);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
