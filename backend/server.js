const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes'); // <-- 1. Import your product routes

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/orders', orderRoutes);
// Routes Middleware
app.use('/api/products', productRoutes); // <-- 2. Any URL starting with /api/products uses this router

// Grab URI from environment variables
const dbURI = process.env.MONGO_URI;

// Connect Engine
mongoose.connect(dbURI)
  .then(() => {
    console.log("🚀 Success: Connected securely to MongoDB Cloud Database!");
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`📡 Server is live and running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Error: ", err.message);
  });

// Test Endpoint
app.get('/', (req, res) => {
  res.send('API Gateway Status: Connected!');
});