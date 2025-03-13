const express = require("express");
const router = express.Router();
const {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  revokeSubscription,
  upgradeSubscription
} = require("../controllers/subscriptionController");

// Route pour créer un abonnement (POST)
router.post("/subscription", createSubscription);

// Route pour récupérer tous les abonnements (GET)
router.get("/subscription", getAllSubscriptions);

// Route pour récupérer un abonnement spécifique par ID (GET)
router.get("/subscription/:subscriptionId", getSubscriptionById);

// Route pour mettre à jour un abonnement spécifique (PATCH)
router.patch("/subscription/:subscriptionId", updateSubscription);

// Route pour supprimer un abonnement spécifique (DELETE)
router.delete("/subscription/:subscriptionId", deleteSubscription);

// Route pour révoquer un abonnement spécifique (PATCH)
router.patch("/subscription/:subscriptionId/revoke", revokeSubscription);

// Route pour mettre à niveau un abonnement spécifique (PATCH)
router.patch("/subscription/:subscriptionId/upgrade", upgradeSubscription);

module.exports = router;
