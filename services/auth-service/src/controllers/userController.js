const userService = require("../services/userServices");
const { registerSchema, loginSchema, resetPasswordSchema } = require("../utils/userValidators");

// Inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
  try {
    await registerSchema.validate(req.body, { abortEarly: false });
    const { nom, prenom, email, password } = req.body;
    const user = await userService.register(nom, prenom, email, password);
    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (err) {
    res.status(400).json({ error: err.errors || err.message });
  }
};

// Connexion de l'utilisateur
exports.login = async (req, res) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    const { email, password } = req.body;
    const tokens = await userService.login(email, password);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(401).json({ error: err.errors || err.message });
  }
};

// Mot de passe oublié
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await userService.forgotPassword(email);
    res.status(200).json({ message: "Email de réinitialisation envoyé" });
  } catch (err) {
    res.status(400).json({ error: err.errors || err.message });
  }
};

// Réinitialisation du mot de passe
exports.resetPassword = async (req, res) => {
  try {
    await resetPasswordSchema.validate(req.body, { abortEarly: false });
    const { token, newPassword } = req.body;
    await userService.resetPassword(token, newPassword);
    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (err) {
    res.status(400).json({ error: err.errors || err.message });
  }
};

// Obtenir le profil de l'utilisateur
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await userService.getProfile(userId);
    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour le profil de l'utilisateur
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;
    const updatedUser = await userService.updateProfile(userId, updates);
    res.status(200).json({ message: "Profil mis à jour avec succès", user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Déconnexion de l'utilisateur
exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;
    await userService.logout(userId);
    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Rafraîchir l'access token
exports.refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await userService.refreshAccessToken(refreshToken);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};