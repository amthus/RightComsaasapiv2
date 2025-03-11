const express = require("express");
const router = express.Router();
const {
  getAllPlan,
  createPlan,
  updatePlan,
  deletePlan,
  getPlansByProductId,
} = require("../controllers/planController");

// Route pour créer un nouveau plan
router.route("/createPlan").post(createPlan);

// Route pour récupérer tous les plans
router.route("/plans").get(getAllPlan);

// Route pour récupérer les plans par product_id
router.route("/product/:productId").get(getPlansByProductId);

// Route pour mettre à jour un plan par son ID
router.route("/updatePlan/:id").patch(updatePlan);

// Route pour supprimer un plan par son ID
router.route("/deletePlan/:id").delete(deletePlan);

module.exports = router;