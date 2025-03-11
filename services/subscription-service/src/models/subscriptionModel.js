const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a User ID"],
    },
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: [true, "Please provide a Plan ID"],
    },
    start_date: {
      type: Date,
      required: [true, "Please provide a start date"],
    },
    end_date: {
      type: Date,
      required: [true, "Please provide an end date"],
    },
    status: {
      type: String,
      enum: ["active", "pending", "suspended", "canceled", "expired"],
      default: "pending",
      required: [true, "Please provide a status"],
    },
  },
  { timestamps: true }
);

SubscriptionSchema.statics.createSubscription = async function (
  user_id,
  plan_id,
  start_date,
  end_date,
  status
) {
  try {
    const subscription = new this({
      user_id,
      plan_id,
      start_date,
      end_date,
      status,
    });
    return await subscription.save();
  } catch (error) {
    throw new Error("Error creating subscription: " + error.message);
  }
};

module.exports = mongoose.model("Subscription", SubscriptionSchema);
