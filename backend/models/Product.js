const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"]
  },
  stock: {
    type: Number,
    required: [true, "Inventory stock level is required"],
    min: [0, "Stock cannot be negative"],
    default: 0
  },
  category: {
    type: String,
    default: "General",
    trim: true
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150"
  }
}, {
  timestamps: true // Automatically creates createdAt and updatedAt fields
});

// This is the line that compiles the schema into a working Model and exports it!
module.exports = mongoose.model('Product', ProductSchema);