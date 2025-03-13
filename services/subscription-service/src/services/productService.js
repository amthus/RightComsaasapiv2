const Product = require("../models/productModel.js");
const path = require("path");
const fs = require("fs").promises;
const { StatusCodes } = require("http-status-codes");
const removeImage = require("../utils/removeImage.js");

class ProductService {
  async createProduct(productData) {
    //get the current imagePath
    let imagePath = null;
    try {
      if (productData.file) {
        imagePath = `public/uploads/${productData.file.filename}`;
      }
      //add new product
      const product = await Product.createProduct(
        productData.product_name,
        productData.description
      );
      //renommage du l'image sur 
      if (productData.file) {
        const file = productData.file;
        const productId = product._id;

        const newImageName = `${productId}${path.extname(file.originalname)}`;
        const newPath = `public/uploads/${newImageName}`;

        await fs.rename(imagePath, newPath, (err) => {
          if (err) reject("Erreur lors du renommage de l'image");
          resolve();
        });
      }

      return product;
    } catch (error) {
      if (imagePath) {
        console.log(imagePath);
        await fs.unlink(imagePath).catch(() => {});
      }
      if (error.name === "ValidationError") {
        const erreurs = Object.values(error.errors).map((err) => err.message);
        throw { status: StatusCodes.BAD_REQUEST, message: erreurs };
      }

      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        throw {
          status: StatusCodes.BAD_REQUEST,
          message: `Le produit '${error.keyValue[field]}'existe déjà`,
        };
      }

      throw {
        status: 500,
        message: "Une erreur inattendue est survenue",
        error: error.message,
      };
    }
  }

  async getProduct(productData) {
    try {
      const products = await Product.find({}).sort("createdAt");
      return products;
    } catch (error) {
      throw error;
    }
  }
  async updateProduct(productData) {
    if (productData.product_name === "" || productData.description === "") {
      throw new Error();
    }
    const product = await Product.findByIdAndUpdate(
      { _id: productData.product_id },
      {
        logo: productData.logo,
        product_name: productData.product_name,
        description: productData.description,
      },
      { new: true, runValidators: true }
    );

    return product;
  }
  async deleteProduct(productData) {
    try {
      const product = await Product.findByIdAndDelete({
        _id: productData.product_id,
      });
      if (product) {
        removeImage(productData.product_id);
      }

      return product;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService();
