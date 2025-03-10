const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["client", "admin"], default: "client" },
    refreshToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

// Hacher le mot de passe avant de sauvegarder
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Méthode pour générer un token de réinitialisation de mot de passe
userSchema.methods.generatePasswordReset = function () {
  // Si un token existe déjà et n'a pas expiré, on le réutilise
  if (this.resetPasswordToken && this.resetPasswordExpires > Date.now()) {
    return this;
  }

  // Sinon, on génère un nouveau token
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; // 1 heure
  return this.save();
};

// Méthode pour trouver un utilisateur par email
userSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email });
};

// Méthode pour créer un utilisateur
userSchema.statics.createUser = async function (nom, prenom, email, password) {
  const user = new this({ nom, prenom, email, password });
  return user.save();
};

// Méthode pour trouver un utilisateur par token de réinitialisation
userSchema.statics.findByResetToken = function (token) {
  return this.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }, 
  });
};

// Méthode pour mettre à jour le mot de passe
userSchema.statics.updatePassword = async function (userId, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  return this.findByIdAndUpdate(
    userId,
    { password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null }, 
    { new: true }
  );
};

// Méthode pour obtenir le profil de l'utilisateur
userSchema.methods.getProfile = function () {
  return {
    nom: this.nom,
    prenom: this.prenom,
    email: this.email,
    role: this.role,
  };
};

// Méthode pour mettre à jour le profil de l'utilisateur
userSchema.methods.updateProfile = function (updates) {
  Object.assign(this, updates);
  return this.save();
};

// Méthode pour déconnecter l'utilisateur (supprimer le refreshToken)
userSchema.methods.logout = function () {
  this.refreshToken = null;
  return this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;