const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    name: { type: String, enum: ["free", "lite" ,"pro" ,"enterprise"], default: "free" },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    billing_cycle: {
      type: String,
      enum: ["monthly", "annually"],
      required: [true, "Please provide a billing cycle"],
    },
    features: {
      type: [String],
      default: [],
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Product",
      required: [true, "Please provide a product ID"],
    },
  },
  { timestamps: true }
);

PlanSchema.statics.createPlan = async function (
  name,
  price,
  billing_cycle,
  features,
  product_id
) {
    // Vérification que le produit existe avant de créer un plan
  try {
    const plan = new this({
      name,
      price,
      billing_cycle,
      features,
      product_id,
    });
    return await plan.save();
  } catch (error) {
    throw new Error("Error creating plan: " + error.message);
  }
};

module.exports = mongoose.model("Plan", PlanSchema);
