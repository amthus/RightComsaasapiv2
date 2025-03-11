const Yup = require('yup');

// Schéma de validation pour le produit
const productValidationSchema = Yup.object().shape({
    product_name: Yup.string().required('Le nom du produit est requis'),
    description: Yup.string().required('La description est requise'),
    file: Yup.mixed()
      .nullable()
      .test('fileSize', 'Le fichier doit être de taille inférieure à 5 Mo', (value) => {
        return !value || (value && value.size <= 5 * 1024 * 1024);
      })
  });

module.exports = { productValidationSchema };
