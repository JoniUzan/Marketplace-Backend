const express = require("express");
const {
  getProducts,
  getProductCount,
  getProductsById,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("../controllers/products-controler");

const router = express.Router();

router.get("/", getProducts);
router.get("/count", getProductCount);
router.get("/:id", getProductsById);
router.delete("/:id", deleteProduct);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);

module.exports = router;
