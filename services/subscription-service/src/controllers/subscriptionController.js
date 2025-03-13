const subscriptionService = require("../services/subscriptionService");

// Réponse standardisée
const sendResponse = (res, status, data = null, message = null, error = null) => {
  res.status(status).json({ data, message, error });
};

// Créer un abonnement
const createSubscription = async (req, res) => {
  try {
    const { user_id, plan_id, start_date, end_date, status } = req.body;
    const subscription = await subscriptionService.createSubscription(user_id, plan_id, start_date, end_date, status);
    sendResponse(res, 201, subscription, "Abonnement créé avec succès");
  } catch (error) {
    sendResponse(res, error.status || 400, null, error.message, error);
  }
};

// Récupérer tous les abonnements
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    sendResponse(res, 200, subscriptions, "Liste des abonnements récupérée avec succès");
  } catch (error) {
    sendResponse(res, 500, null, "Erreur lors de la récupération des abonnements", error);
  }
};

// Récupérer un abonnement par son ID
const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await subscriptionService.getSubscriptionById(req.params.subscriptionId);
    if (!subscription) {
      return sendResponse(res, 404, null, "Abonnement non trouvé");
    }
    sendResponse(res, 200, subscription, "Abonnement récupéré avec succès");
  } catch (error) {
    sendResponse(res, 500, null, "Erreur lors de la récupération de l'abonnement", error);
  }
};

// Mettre à jour un abonnement
const updateSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.updateSubscription(req.params.subscriptionId, req.body);
    if (!subscription) {
      return sendResponse(res, 404, null, "Abonnement non trouvé");
    }
    sendResponse(res, 200, subscription, "Abonnement mis à jour avec succès");
  } catch (error) {
    sendResponse(res, error.status || 400, null, error.message, error);
  }
};

// Supprimer un abonnement
const deleteSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.deleteSubscription(req.params.subscriptionId);
    if (!subscription) {
      return sendResponse(res, 404, null, "Abonnement non trouvé");
    }
    sendResponse(res, 204, null, "Abonnement supprimé avec succès");
  } catch (error) {
    sendResponse(res, 500, null, "Erreur lors de la suppression de l'abonnement", error);
  }
};

// Révoquer un abonnement
const revokeSubscription = async (req, res) => {
  try {
    const subscription = await subscriptionService.revokeSubscription(req.params.subscriptionId);
    if (!subscription) {
      return sendResponse(res, 404, null, "Abonnement non trouvé");
    }
    sendResponse(res, 200, subscription, "Abonnement révoqué avec succès");
  } catch (error) {
    sendResponse(res, 500, null, "Erreur lors de la révocation de l'abonnement", error);
  }
};

// Mettre à niveau un abonnement
const upgradeSubscription = async (req, res) => {
  try {
    const { newPlanId } = req.body;
    const subscription = await subscriptionService.upgradeSubscription(req.params.subscriptionId, newPlanId);
    if (!subscription) {
      return sendResponse(res, 404, null, "Abonnement non trouvé");
    }
    sendResponse(res, 200, subscription, "Abonnement mis à niveau avec succès");
  } catch (error) {
    sendResponse(res, error.status || 400, null, error.message, error);
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  revokeSubscription,
  upgradeSubscription,
};