const ProductService = require("../services/productService");
const { StatusCodes } = require("http-status-codes");
const { productValidationSchema } = require("../utils/productValidations");
const { CustomAPIError } = require("../errors/custom-api");

const createProduct = async (req, res) => {
  const { product_name, description } = req.body;
  const file = req.file;

  try {
    // Validation des données avec Yup
    const validatedData = await productValidationSchema.validate({ product_name, description, file });

    const product = await ProductService.createProduct(validatedData);
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    res.status(error.status || StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getProduct();
    res.status(StatusCodes.OK).json({ products, count: products.length });
  } catch (error) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      body: { logo, product_name, description },
      params: { id: product_id },
    } = req;
    if (product_name === "" || description === "") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Tous les champs sont requis" });
    }
    const product = await ProductService.updateProduct({
      logo,
      product_name,
      description,
      product_id,
    });

    if (!product) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(`Aucun produit avec l'id ${product_id}`);
    } else {
      res.status(StatusCodes.OK).json({ product });
    }
  } catch (error) {
    res
      .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "une erreur innatendu est survenue" });
  }
};

const deleteProduct = async (req, res) => {
  const {
    params: { id: product_id },
  } = req;
  const product = await ProductService.deleteProduct({
    product_id,
  });

  if (!product) {
    res.status(StatusCodes.NOT_FOUND).json("produit non trouve");
  } else {
    res.status(StatusCodes.OK).json("Produit supprimé avec succes");
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
