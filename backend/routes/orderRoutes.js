const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. GET ALL ORDERS
// URL: http://localhost:5000/api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Newest orders first
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

// 2. UPDATE ORDER STATUS (e.g., Pending -> Shipped)
// URL: http://localhost:5000/api/orders/:id
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: "Failed to update order status", error: error.message });
  }
});

module.exports = router;