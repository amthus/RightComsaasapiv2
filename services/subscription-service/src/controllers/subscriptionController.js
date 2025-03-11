const Subscription = require("../models/subscriptionModel.js");
const SubscriptionService = require("../services/subscriptionService.js");
const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

const createSubscription = async (req, res) => {
  const { user_id, plan_id, start_date, end_date, status } = req.body;
  try {
    const subscription = await SubscriptionService.createSubscription({
      user_id,
      plan_id,
      start_date,
      end_date,
      status,
    });

    res.status(StatusCodes.CREATED).json({ subscription });
  } catch (error) {
    return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Une erreur innatendu est survenue",
      error: error.message,
    });
  }
};
const getAllSubscription = async (req, res) => {
  const plan = await SubscriptionService.getSubscription();

  res.status(StatusCodes.OK).json({ plan, count: plan.length });
};
const updateSubscription = async (req, res) => {
  try {
    const {
      body: { status },
      params: { id: subscription_id },
    } = req;

    const subscription = await SubscriptionService.updateSubscription({
      status,
      subscription_id,
    });

    if (!subscription) {
      res.status(StatusCodes.NOT_FOUND).json(`Aucun subscription avec l'id ${subscription_id}`);
    } else {
      res.status(StatusCodes.OK).json({ subscription });
    }
  } catch (error) {
    res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "une erreur innatendu est survenue" });
  }
};
module.exports = { createSubscription, getAllSubscription,updateSubscription };
