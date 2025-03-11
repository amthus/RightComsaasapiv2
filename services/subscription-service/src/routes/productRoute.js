const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Route pour créer un produit (POST)
router.post("/product", upload.single("image"), createProduct);

// Route pour récupérer tous les produits (GET)
router.get("/product", getAllProducts);

// Route pour mettre à jour un produit spécifique (PATCH)
router.patch("/:id", updateProduct);

// Route pour supprimer un produit spécifique (DELETE)
router.delete("/:id", deleteProduct);

module.exports = router;
