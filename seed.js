// seed.js
// This script seeds the database with sample data.
// This is for development purposes only and should not be used in production.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Product = require("./models/product-model");

dotenv.config(); // Load environment variables

// Sample data
const products = [
  {
    id: "P12346",
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 150,
    category: "Electronics",
  },
  {
    id: "P12348",
    name: "Smartphone",
    price: 599.99,
    quantity: 75,
    category: "Electronics",
  },
  {
    id: "P12349",
    name: "Laptop",
    price: 1299.99,
    quantity: 50,
    category: "Electronics",
  },
  {
    id: "P12350",
    name: "Smartwatch",
    price: 199.99,
    quantity: 200,
    category: "Electronics",
  },
  {
    id: "P12351",
    name: "Bluetooth Speaker",
    price: 49.99,
    quantity: 300,
    category: "Electronics",
  },
  {
    id: "P12352",
    name: "Tablet",
    price: 299.99,
    quantity: 100,
    category: "Electronics",
  },
  {
    id: "P12353",
    name: "Gaming Console",
    price: 399.99,
    quantity: 60,
    category: "Electronics",
  },
  {
    id: "P12354",
    name: "Digital Camera",
    price: 499.99,
    quantity: 80,
    category: "Electronics",
  },
  {
    id: "P12355",
    name: "E-reader",
    price: 129.99,
    quantity: 120,
    category: "Electronics",
  },
  {
    id: "P12356",
    name: "External Hard Drive",
    price: 79.99,
    quantity: 250,
    category: "Electronics",
  },
  {
    id: "P12357",
    name: "Wireless Mouse",
    price: 29.99,
    quantity: 400,
    category: "Accessories",
  },
  {
    id: "P12358",
    name: "Mechanical Keyboard",
    price: 89.99,
    quantity: 150,
    category: "Accessories",
  },
  {
    id: "P12359",
    name: "Fitness Tracker",
    price: 149.99,
    quantity: 180,
    category: "Wearables",
  },
  {
    id: "P12360",
    name: "4K TV",
    price: 799.99,
    quantity: 40,
    category: "Electronics",
  },
  {
    id: "P12361",
    name: "VR Headset",
    price: 349.99,
    quantity: 55,
    category: "Electronics",
  },
  {
    id: "P12362",
    name: "Portable Charger",
    price: 24.99,
    quantity: 500,
    category: "Accessories",
  },
  {
    id: "P12363",
    name: "Smart Home Hub",
    price: 99.99,
    quantity: 140,
    category: "Smart Home",
  },
  {
    id: "P12364",
    name: "Electric Toothbrush",
    price: 69.99,
    quantity: 200,
    category: "Health",
  },
  {
    id: "P12365",
    name: "Air Purifier",
    price: 149.99,
    quantity: 90,
    category: "Home Appliances",
  },
  {
    id: "P12366",
    name: "Coffee Maker",
    price: 79.99,
    quantity: 110,
    category: "Home Appliances",
  },
  {
    id: "P12367",
    name: "Instant Pot",
    price: 99.99,
    quantity: 130,
    category: "Home Appliances",
  },
  {
    id: "P12368",
    name: "Robot Vacuum",
    price: 299.99,
    quantity: 70,
    category: "Home Appliances",
  },
  {
    id: "P12369",
    name: "Smart Thermostat",
    price: 199.99,
    quantity: 85,
    category: "Smart Home",
  },
  {
    id: "P12370",
    name: "Noise Cancelling Headphones",
    price: 249.99,
    quantity: 65,
    category: "Electronics",
  },
  {
    id: "P12371",
    name: "Dash Cam",
    price: 59.99,
    quantity: 150,
    category: "Automotive",
  },
  {
    id: "P12372",
    name: "Action Camera",
    price: 199.99,
    quantity: 90,
    category: "Electronics",
  },
  {
    id: "P12373",
    name: "Wireless Charger",
    price: 39.99,
    quantity: 220,
    category: "Accessories",
  },
  {
    id: "P12374",
    name: "Smart Light Bulbs",
    price: 49.99,
    quantity: 300,
    category: "Smart Home",
  },
  {
    id: "P12375",
    name: "Streaming Device",
    price: 49.99,
    quantity: 180,
    category: "Electronics",
  },
  {
    id: "P12376",
    name: "Home Security Camera",
    price: 129.99,
    quantity: 100,
    category: "Smart Home",
  },
];

// Insert sample data into the database
async function seedDB() {
  await connectDB(); // Connect to the database
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDB();
