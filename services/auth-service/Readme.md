# RightComSaaS - Authentification

Ce module gère l'authentification des utilisateurs pour la plateforme RightComSaaS. Il permet aux utilisateurs de s'inscrire, de se connecter, de gérer leur profil et de sécuriser leur accès à l'application.

---

## Fonctionnalités

- **Inscription** : Les utilisateurs peuvent créer un compte en fournissant des informations de base (nom, email, mot de passe).
- **Connexion** : Les utilisateurs peuvent se connecter à leur compte en utilisant leur email et leur mot de passe.
- **Gestion du profil** : Les utilisateurs peuvent mettre à jour leurs informations personnelles et changer leur mot de passe.
- **Mot de passe oublié** : Les utilisateurs peuvent réinitialiser leur mot de passe via un lien envoyé par email.
- **Sécurité** : Utilisation de JWT (JSON Web Tokens) pour sécuriser les sessions utilisateurs et de bcrypt pour le hachage des mots de passe.
- **Validation des emails** : Envoi d'un email de confirmation pour vérifier l'adresse email lors de l'inscription.

---

## Technologies utilisées

- **Backend** : Node.js avec Express.js
- **Base de données** : MongoDB (pour stocker les informations utilisateurs)
- **Authentification** : JWT (JSON Web Tokens)
- **Hachage des mots de passe** : bcrypt
- **Envoi d'emails** : Nodemailer (pour l'envoi d'emails de confirmation et de réinitialisation de mot de passe)

---

## Structure du projet
