const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 1. Import all route middleware controllers
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); // <-- Added this to handle login/register

const app = express();

// 2. Global Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads

// 3. Mount Routes API Endpoints
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes); // <-- Added this: routing /api/auth/register and /api/auth/login

// 4. Test Root Route Endpoint
app.get('/', (req, res) => {
  res.send('API Gateway Status: Connected and Running! 🚀');
});

// 5. Connect Engine to MongoDB Cloud Database Cluster
const dbURI = process.env.MONGO_URI;

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