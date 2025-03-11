// services/PlanService.js

const Plan = require("../models/planModel");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const planFeatures = require("../utils/planFeatures");
const {
  validateProductExistence,
  validateBillingCycle,
  validatePlanName,
  validatePlanUniqueness,
} = require("../utils/planValidations");

class PlanService {
  async createPlan(planData) {
    try {
      // Validation de l'existence du produit
      await validateProductExistence(planData.product_id);

      // Validation du cycle de facturation
      validateBillingCycle(planData.billing_cycle);

      // Validation du nom du plan
      validatePlanName(planData.name);

      // Validation de l'unicité du plan
      await validatePlanUniqueness(
        planData.product_id,
        planData.name,
        planData.billing_cycle
      );

      // Récupération des caractéristiques prédéfinies
      const planConfig = planFeatures[planData.name]?.[planData.billing_cycle];
      if (!planConfig) {
        throw {
          status: StatusCodes.BAD_REQUEST,
          message: `Le plan ${planData.name} n'existe pas pour le cycle de facturation ${planData.billing_cycle}`,
        };
      }

      // Création du plan
      const plan = await Plan.create({
        name: planData.name,
        price: planData.price,
        billing_cycle: planData.billing_cycle,
        features: planConfig.features,
        product_id: planData.product_id,
      });

      return plan;
    } catch (error) {
      if (error.name === "ValidationError") {
        const erreurs = Object.values(error.errors).map((err) => err.message);
        throw { status: StatusCodes.BAD_REQUEST, message: erreurs };
      }

      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        throw {
          status: StatusCodes.BAD_REQUEST,
          message: `La valeur '${error.keyValue[field]}' pour le champ ${field} existe déjà`,
        };
      }

      throw {
        status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Une erreur inattendue est survenue",
        error: error.message,
      };
    }
  }

  // Méthode pour récupérer tous les plans
  async getPlans() {
    try {
      const plans = await Plan.find({}).sort("createdAt");
      return plans;
    } catch (error) {
      throw error;
    }
  }

  // Méthode pour mettre à jour un plan
  async updatePlan(planData) {
    try {
      const plan = await Plan.findByIdAndUpdate(
        { _id: planData.plan_id },
        {
          name: planData.name,
          price: planData.price,
          billing_cycle: planData.billing_cycle,
          features: planData.features,
        },
        { new: true, runValidators: true }
      );

      return plan;
    } catch (error) {
      throw error;
    }
  }

  // Méthode pour supprimer un plan
  async deletePlan(planData) {
    try {
      const plan = await Plan.findByIdAndDelete({
        _id: planData.plan_id,
      });

      return plan;
    } catch (error) {
      throw error;
    }
  }

  // Méthode pour récupérer les plans par product_id
  async getPlansByProductId(productId) {
    try {
      // Validation de l'existence du produit
      await validateProductExistence(productId);

      // Récupération des plans associés au product_id
      const plans = await Plan.find({ product_id: productId }).sort("createdAt");

      return plans;
    } catch (error) {
      throw {
        status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Une erreur inattendue est survenue",
        error: error.message,
      };
    }
  }
}

module.exports = new PlanService();