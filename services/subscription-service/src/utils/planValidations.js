

const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const validateProductExistence = async (productId) => {
    // Vérifier si l'ID du produit est valide
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("L'identifiant du produit est invalide. Veuillez vérifier l'ID et réessayer.");
    }
  
  const productExist = await mongoose.model("Product").findById(productId);
  if (!productExist) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: "Le produit spécifié n'existe pas",
    };
  }
};

const validateBillingCycle = (billingCycle) => {
  const allowedBillingCycles = ["annually", "monthly"];
  if (!allowedBillingCycles.includes(billingCycle)) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: `Le cycle de facturation doit être l'un des suivants : ${allowedBillingCycles.join(", ")}`,
    };
  }
};

const validatePlanName = (planName) => {
  const allowedPlanNames = ["free", "lite", "pro", "enterprise"];
  if (!allowedPlanNames.includes(planName)) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: `Le nom du plan doit être l'un des suivants : ${allowedPlanNames.join(", ")}`,
    };
  }
};

const validatePlanUniqueness = async (productId, planName, billingCycle) => {
  const existingPlan = await mongoose.model("Plan").findOne({
    product_id: productId,
    name: planName,
    billing_cycle: billingCycle,
  });

  if (existingPlan) {
    throw {
      status: StatusCodes.BAD_REQUEST,
      message: `Un plan avec le même nom (${planName}) et le même cycle de facturation (${billingCycle}) existe déjà pour ce produit`,
    };
  }
};

module.exports = {
  validateProductExistence,
  validateBillingCycle,
  validatePlanName,
  validatePlanUniqueness,
};