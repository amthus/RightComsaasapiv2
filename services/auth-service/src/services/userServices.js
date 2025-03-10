const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendEmail = require("../utils/emailConfig");
const getEmailTemplate = require("../utils/emailTemplate");
const { getAsync, setAsync, delAsync } = require('../utils/redisClient');

// Inscription d'un nouvel utilisateur
const register = async (nom, prenom, email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("Utilisateur déjà existant");

  const user = new User({ nom, prenom, email, password });
  await user.save();

  const loginLink = `${process.env.FRONTEND_URL}/login`;
  const subject = "Bienvenue sur notre application";
  const html = getEmailTemplate("welcomeEmail", { nom, prenom, loginLink });

  await sendEmail(email, subject, html);
  return user;
};

// Connexion de l'utilisateur
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Utilisateur non trouvé");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Mot de passe incorrect");

  const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

// Mot de passe oublié
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Utilisateur non trouvé");

  await user.generatePasswordReset();
  const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${user.resetPasswordToken}`;

  const subject = "Réinitialisation de votre mot de passe";
  const html = getEmailTemplate("resetPasswordEmail", {
    prenom: user.prenom,
    nom: user.nom,
    resetLink
  });  
  await sendEmail(email, subject, html);
  return user;
};

// Réinitialisation du mot de passe
const resetPassword = async (token, newPassword) => {
  const user = await User.findByResetToken(token);
  if (!user) throw new Error("Token invalide, expiré ou déjà utilisé");

  await User.updatePassword(user._id, newPassword);
  return user;
};

// Obtenir le profil de l'utilisateur
const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Utilisateur non trouvé");
  return user.getProfile();
};

// Mettre à jour le profil de l'utilisateur
const updateProfile = async (userId, updates) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Utilisateur non trouvé");
  return user.updateProfile(updates);
};

// Déconnecter l'utilisateur
const logout = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Utilisateur non trouvé");

  // Ajouter le refresh token à la liste noire dans Redis
  await setAsync(user.refreshToken, 'blacklisted', 'EX', 7 * 24 * 60 * 60); // Expire dans 7 jours

  // Supprimer le refresh token de l'utilisateur dans la base de données
  user.refreshToken = null;
  await user.save();

  return { message: "Déconnexion réussie" };
};

// Rafraîchir l'access token
const refreshAccessToken = async (refreshToken) => {
  // Vérifier si le refresh token est dans la liste noire
  const isBlacklisted = await getAsync(refreshToken);
  if (isBlacklisted) throw new Error("Refresh token invalide");

  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("Refresh token invalide");

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const accessToken = jwt.sign({ id: decoded.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });

  return { accessToken };
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  logout,
  refreshAccessToken,
};