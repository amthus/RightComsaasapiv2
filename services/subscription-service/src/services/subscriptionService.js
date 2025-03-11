const Subscription = require("../models/subscriptionModel.js");
const mongoose = require("mongoose");

const { StatusCodes } = require("http-status-codes");

class SubscriptionService {
  async createSubscription(subscriptionData) {
    try {
      //checking if the product exists
      console.log(subscriptionData.plan_id);

      const planExist = await mongoose
        .model("Plan")
        .findById(subscriptionData.plan_id);
      console.log(planExist);


      const subscription = await Subscription.createSubscription(
        subscriptionData.user_id,
        subscriptionData.plan_id,
        subscriptionData.start_date,
        subscriptionData.end_date,
        subscriptionData.status
      );

      return subscription;
    } catch (error) {
      if (!planExist) {
        throw { status: StatusCodes.BAD_REQUEST, message: erreurs };
      }
      if (!userExist) {
        throw { status: StatusCodes.BAD_REQUEST, message: erreurs };
      }
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
        status: 500,
        message: "Une erreur inattendue est survenue",
        error: error.message,
      };
    }
  }

  async getSubscription(subscriptionData) {
    try {
      const subscription = await Subscription.find({}).sort("createdAt");
      return subscription;
    } catch (error) {
      throw error;
    }
  }

  async updateSubscription(subscriptionData) {
    const subscription = await Subscription.findByIdAndUpdate(
      { _id: subscriptionData.subscription_id },
      {
        status: subscriptionData.status,
      },
      { new: true, runValidators: true }
    );

    return subscription;
  }
}
module.exports = new SubscriptionService();
