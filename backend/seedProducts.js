const mongoose = require('mongoose');
const Product = require('./models/Product'); 
require('dotenv').config();

const sampleProducts = [
 {
  name: "iPad Air M2",
  price: 59999,
  stock: 18,
  category: "Tablets",
  image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0"
},
{
  name: "Samsung Galaxy Tab S9",
  price: 72999,
  stock: 14,
  category: "Tablets",
  image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9"
},
{
  name: "Apple Watch Series 9",
  price: 41900,
  stock: 25,
  category: "Smartwatches",
  image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d"
},
{
  name: "Samsung Galaxy Watch 6",
  price: 29999,
  stock: 22,
  category: "Smartwatches",
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
},
{
  name: "Nothing Phone 2",
  price: 44999,
  stock: 16,
  category: "Phones",
  image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
},
{
  name: "Google Pixel 8 Pro",
  price: 106999,
  stock: 10,
  category: "Phones",
  image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97"
},
{
  name: "Lenovo Legion 5 Pro",
  price: 139999,
  stock: 8,
  category: "Laptops",
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
},
{
  name: "HP Spectre x360",
  price: 124999,
  stock: 9,
  category: "Laptops",
  image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
},
{
  name: "Acer Predator Helios 16",
  price: 154999,
  stock: 6,
  category: "Laptops",
  image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed"
},
{
  name: "JBL Flip 6 Speaker",
  price: 9999,
  stock: 35,
  category: "Speakers",
  image: "https://images.unsplash.com/photo-1589003077984-894e133dabab"
},
{
  name: "Sony SRS-XB43 Speaker",
  price: 15999,
  stock: 20,
  category: "Speakers",
  image: "https://images.unsplash.com/photo-1545454675-3531b543be5d"
},
{
  name: "Amazon Echo Dot (5th Gen)",
  price: 5499,
  stock: 40,
  category: "Smart Home",
  image: "https://images.unsplash.com/photo-1543512214-318c7553f230"
},
{
  name: "Google Nest Mini",
  price: 4499,
  stock: 32,
  category: "Smart Home",
  image: "https://images.unsplash.com/photo-1512446733611-9099a758e5b7"
},
{
  name: "Anker 20000mAh Power Bank",
  price: 3499,
  stock: 60,
  category: "Accessories",
  image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5"
},
{
  name: "Samsung T7 Portable SSD 1TB",
  price: 8499,
  stock: 24,
  category: "Storage",
  image: "https://images.unsplash.com/photo-1591488320449-011701bb6704"
},
{
  name: "SanDisk Extreme 1TB SSD",
  price: 7999,
  stock: 18,
  category: "Storage",
  image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988"
},
{
  name: "Canon EOS R50 Camera",
  price: 67999,
  stock: 7,
  category: "Cameras",
  image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
},
{
  name: "GoPro HERO12 Black",
  price: 45999,
  stock: 11,
  category: "Cameras",
  image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
},
{
  name: "Xbox Series X",
  price: 54999,
  stock: 13,
  category: "Gaming",
  image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d"
},
{
  name: "PlayStation 5 Slim",
  price: 54990,
  stock: 15,
  category: "Gaming",
  image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db"
}
];

const seedDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database for seeding...");

    
    await Product.insertMany(sampleProducts);
    console.log("🚀 Success: 10 real-world products added with images!");
    
    
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed error matrix:", error.message);
    process.exit(1);
  }
};

seedDB();