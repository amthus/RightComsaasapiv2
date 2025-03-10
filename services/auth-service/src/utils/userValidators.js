const yup = require("yup");

// Schéma de validation pour l'inscription
const registerSchema = yup.object({
  nom: yup
    .string()
    .required("Le nom est obligatoire"),
  prenom: yup
    .string()
    .required("Le prénom est obligatoire"),
  email: yup
    .string()
    .email("Email invalide")
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
});

// Schéma de validation pour la connexion
const loginSchema = yup.object({
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  password: yup.string().required("Le mot de passe est obligatoire"),
});

// Schéma de validation pour la réinitialisation du mot de passe
const resetPasswordSchema = yup.object({
  token: yup.string().required("Le token est obligatoire"),
  newPassword: yup
    .string()
    .required("Le nouveau mot de passe est obligatoire")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
});

module.exports = {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
};