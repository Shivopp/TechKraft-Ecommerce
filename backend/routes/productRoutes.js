const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Pulls in our Mongoose structure

// 1. GET ALL PRODUCTS (Read)
// URL: http://localhost:5000/api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetches EVERYTHING inside the products folder in MongoDB
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
});

// 2. ADD A NEW PRODUCT (Create)
// URL: http://localhost:5000/api/products
router.post('/', async (req, res) => {
  try {
    const { name, price, stock, category, image } = req.body;
    
    const newProduct = new Product({
      name,
      price,
      stock,
      category,
      image
    });

    const savedProduct = await newProduct.save(); // Pushes the new file straight into MongoDB cloud
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to create product", error: error.message });
  }
});

// 3. UPDATE AN EXISTING PRODUCT (Update)
// URL: http://localhost:5000/api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, price, stock, category, image } = req.body;
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, // Grabs the id straight from the URL parameters
      { name, price, stock, category, image },
      { new: true, runValidators: true } // Returns the newly modified object and runs validations
    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Failed to update product", error: error.message });
  }
});

// 4. DELETE A PRODUCT (Delete)
// URL: http://localhost:5000/api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully from database" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
});

module.exports = router;