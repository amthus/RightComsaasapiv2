const express = require("express");
const router = express.Router();
const userController = require("../src/controllers/userController");
const authMiddleware = require("../src/middlewares/authMiddleware");


// Route pour l'inscription
router.post("/register",userController.register);

// Route pour la connexion
router.post("/login",userController.login);

// Route pour la demande de réinitialisation du mot de passe
router.post("/forgot-password", userController.forgotPassword);

// Route pour la réinitialisation du mot de passe
router.post("/reset-password", userController.resetPassword);


// Route pour obtenir le profil de l'utilisateur
router.get("/getprofile", authMiddleware, userController.getProfile);

// Route pour mettre à jour le profil de l'utilisateur
router.put("/updateprofile", authMiddleware, userController.updateProfile);

// Route pour déconnecter l'utilisateur
router.post("/logout", authMiddleware, userController.logout);


module.exports = router;