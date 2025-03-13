const Subscription = require("../models/subscriptionModel");
const { validateProductExistence, validateUserExistence } = require("../utils/planValidations");

module.exports = {
  createSubscription: async (user_id, plan_id, start_date, end_date, status) => {
    // Valider l'existence de l'utilisateur et du produit (plan)
    await validateUserExistence(user_id);
    await validateProductExistence(plan_id);

    // Créer l'abonnement
    return await Subscription.createSubscription(user_id, plan_id, start_date, end_date, status);
  },

  getAllSubscriptions: async () => {
    return await Subscription.find();
  },

  getSubscriptionById: async (subscriptionId) => {
    return await Subscription.findById(subscriptionId);
  },

  updateSubscription: async (subscriptionId, updateData) => {
    if (updateData.user_id) {
      await validateUserExistence(updateData.user_id);
    }
    if (updateData.plan_id) {
      await validateProductExistence(updateData.plan_id);
    }

    return await Subscription.findByIdAndUpdate(subscriptionId, updateData, { new: true });
  },

  deleteSubscription: async (subscriptionId) => {
    return await Subscription.findByIdAndDelete(subscriptionId);
  },

  revokeSubscription: async (subscriptionId) => {
    return await Subscription.findByIdAndUpdate(subscriptionId, { status: "canceled" }, { new: true });
  },

  upgradeSubscription: async (subscriptionId, newPlanId) => {
    await validateProductExistence(newPlanId);

    return await Subscription.findByIdAndUpdate(subscriptionId, { plan_id: newPlanId }, { new: true });
  },
};