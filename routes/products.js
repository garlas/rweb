const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Middleware untuk mendapatkan produk berdasarkan ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}

// Mendapatkan semua produk
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mendapatkan satu produk berdasarkan ID
router.get("/:id", getProduct, (req, res) => {
  res.json(res.product);
});

// Membuat produk baru
router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    whatsapp: req.body.whatsapp,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mengupdate produk
router.put("/:id", getProduct, async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.image != null) {
    res.product.image = req.body.image;
  }
  if (req.body.whatsapp != null) {
    res.product.whatsapp = req.body.whatsapp;
  }

  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Menghapus produk
router.delete("/:id", getProduct, async (req, res) => {
  try {
    await Product.deleteOne({ _id: res.product._id });
    res.json({ message: "Produk dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
