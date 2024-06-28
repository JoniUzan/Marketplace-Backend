const PRODUCTS = require("../data/products-data.json");
const Product = require("../models/product-model");

function makeFilter(q) {
  const res = {};
  if (q["name"]) {
    res.name = { $regex: q["name"], $options: "i" }; // "i" for case-insensitive
  }

  if (q["minPrice"] || q["maxPrice"]) {
    res.price = {};
    if (q["minPrice"]) {
      res.price.$gte = q["minPrice"];
    }
    if (q["maxPrice"]) {
      res.price.$lte = q["maxPrice"];
    }
  }

  return res;
}

// Get products count
async function getProductCount(req, res) {
  const filter = makeFilter(req.query);
  try {
    const count = await Product.countDocuments(filter);
    res.json({ count });
  } catch (err) {
    console.log(
      "product-controler, getProductCount. Error while getting products count",
      err
    );
    res.status(500).json({ message: err.message });
  }
}

async function getProducts(req, res) {
  const { query } = req;
  const filter = makeFilter(req.query);

  let page = query.page || 1;
  if (page < 1) page = 1;

  const limit = query.limit || 12;
  const startIndex = (page - 1) * limit || 0;
  try {
    const products = await Product.find(filter).skip(startIndex).limit(limit);
    res.json(products);
  } catch (err) {
    console.log(
      "product-controler, getProduct. Error while getting products",
      err
    );
    res.status(500).json({ message: err.message });
  }
}

async function getProductsById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `product-controler, getProductById. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }
    console.log(
      `product-controler, getProductById. Error while getting Product with id: ${id}`,
      err.name
    );
    res.status(500).json({ message: err.message });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log(
        `product-controler, getProductById. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "product deleted" });
  } catch (err) {
    console.log(
      `product-controler, getProductById. Error while deleting product with id: ${id}`
    );
    res.status(500).json({ message: err.message });
  }
}

// Create new Product
async function createProduct(req, res) {
  const ProductToAdd = req.body;
  const newProduct = new Product(ProductToAdd);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.log(
      "product-controler, createProduct. Error while creating product",
      err
    );

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`product-controler, createProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`product-controler, createProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

// Update Product
async function updateProduct(req, res) {
  const { id } = req.params;
  const newProduct = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      newProduct,
      { new: true, runValidators: true } // validate before updating
    );

    if (!updateProduct) {
      console.log(
        `product-controler, updateProduct. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.log(
      `product-controler, updateProduct. Error while updating robot with id: ${id}`,
      err
    );

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`product-controler, updateProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`product-controler, updateProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while updating product" });
    }
  }
}

module.exports = {
  getProducts,
  getProductCount,
  getProductsById,
  deleteProduct,
  createProduct,
  updateProduct,
};
