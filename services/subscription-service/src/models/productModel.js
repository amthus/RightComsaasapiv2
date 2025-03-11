const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "Please provide a product name"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
  },
  { timestamps: true }
);

ProductSchema.statics.createProduct = async function (product_name, description) {
  const product = new this({ product_name, description });
  return product.save();
};

module.exports = mongoose.model("Product", ProductSchema);
