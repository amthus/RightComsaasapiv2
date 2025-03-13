const PlanService = require("../services/planService");
const { StatusCodes } = require("http-status-codes");

const sendResponse = (res, status, data = null, message = null, error = null) => {
  res.status(status).json({ data, message, error });
};

// Créer un plan
const createPlan = async (req, res) => {
  const { name, price, billing_cycle, features, product_id } = req.body;
  try {
    const plan = await PlanService.createPlan({
      name,
      price,
      billing_cycle,
      features,
      product_id,
    });
    sendResponse(res, StatusCodes.CREATED, plan, "Plan créé avec succès");
  } catch (error) {
    sendResponse(
      res,
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      "Une erreur est survenue lors de la création du plan",
      error.message
    );
  }
};

// Récupérer tous les plans
const getAllPlan = async (req, res) => {
  try {
    const plans = await PlanService.getPlans();
    sendResponse(res, StatusCodes.OK, plans, "Plans récupérés avec succès");
  } catch (error) {
    sendResponse(
      res,
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      "Une erreur est survenue lors de la récupération des plans",
      error.message
    );
  }
};



// Mettre à jour un plan
const updatePlan = async (req, res) => {
  try {
    const {
      body: { name, price, billing_cycle, features },
      params: { id: plan_id },
    } = req;
    
    const plan = await PlanService.updatePlan({
      name,
      price,
      billing_cycle,
      features,
      plan_id,
    });

    if (!plan) {
      sendResponse(res, StatusCodes.NOT_FOUND, null, `Aucun plan trouvé avec l'ID ${plan_id}`);
    } else {
      sendResponse(res, StatusCodes.OK, plan, "Plan mis à jour avec succès");
    }
  } catch (error) {
    sendResponse(
      res,
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      "Une erreur est survenue lors de la mise à jour du plan",
      error.message
    );
  }
};

// Supprimer un plan
const deletePlan = async (req, res) => {
  try {
    const {
      params: { id: plan_id },
    } = req;

    const plan = await PlanService.deletePlan({ plan_id });

    if (!plan) {
      sendResponse(res, StatusCodes.NOT_FOUND, null, `Aucun plan trouvé avec l'ID ${plan_id}`);
    } else {
      sendResponse(res, StatusCodes.OK, null, "Plan supprimé avec succès");
    }
  } catch (error) {
    sendResponse(
      res,
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      "Une erreur est survenue lors de la suppression du plan",
      error.message
    );
  }
};

// Récupérer les plans par product_id
const getPlansByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("Product ID reçu :", productId); 

    const plans = await PlanService.getPlansByProductId(productId);
    if (plans.length === 0) {
      return sendResponse(
        res,
        StatusCodes.OK,
        null,
        "Aucun plan créé pour l'instant"
      );
    }
    sendResponse(res, StatusCodes.OK, plans, "Plans récupérés avec succès");
  } catch (error) {
    sendResponse(
      res,
      error.status || StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      "Une erreur est survenue lors de la récupération des plans",
      error.message
    );
  }
};

module.exports = {
  getAllPlan,
  createPlan,
  updatePlan,
  deletePlan,
  getPlansByProductId,
};