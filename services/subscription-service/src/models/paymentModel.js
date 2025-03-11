const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number, // Correction de number → Number
      required: [true, "Please provide an amount"],
    },
    type: {
      type: String,
      enum: ["pay", "refund"],
      required: [true, "Please provide a payment type"],
    },
    method: {
      type: String,
      enum: ["dpo pay", "cash"],
      required: [true, "Please provide a payment method"],
    },
    subscription_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription", 
      required: [true, "Please provide a subscription ID"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
