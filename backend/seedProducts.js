const mongoose = require('mongoose');
const Product = require('./models/Product'); // Ensure this path matches your Product model location
require('dotenv').config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    price: 129900,
    stock: 15,
    category: "Phones",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 119999,
    stock: 12,
    category: "Phones",
    image: "https://images.unsplash.com/photo-1707148560370-13dfba9557b4?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "OnePlus 12",
    price: 64999,
    stock: 20,
    category: "Phones",
    image: "https://images.unsplash.com/photo-1715064506822-bc5d944e8c18?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 29990,
    stock: 25,
    category: "Headphones",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Apple AirPods Pro (2nd Gen)",
    price: 24900,
    stock: 40,
    category: "Headphones",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "MacBook Pro M3 (14-inch)",
    price: 169900,
    stock: 8,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "ASUS ROG Zephyrus G14",
    price: 144990,
    stock: 10,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Dell XPS 13",
    price: 114990,
    stock: 7,
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Logitech G502 Hero Mouse",
    price: 4495,
    stock: 50,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Keychron K2 Mechanical Keyboard",
    price: 7499,
    stock: 30,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop"
  }
];

const seedDB = async () => {
  try {
    // Connect to database using your .env URI variable
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database for seeding...");

    // Optional: Uncomment the next line if you want to clear out old testing products first
    // await Product.deleteMany({}); 

    // Insert the dataset payload array
    await Product.insertMany(sampleProducts);
    console.log("🚀 Success: 10 real-world products added with images!");
    
    // Disconnect safely
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed error matrix:", error.message);
    process.exit(1);
  }
};

seedDB();