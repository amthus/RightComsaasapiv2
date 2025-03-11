const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription", // Correction de Product → Subscription
      required: [true, "Please provide a subscription ID"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
