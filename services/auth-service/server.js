require("dotenv").config(); 
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');



// Importer les routes
const userRoutes = require("./routes/userRoutes");


// Initialisation de l'application Express
const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(cors());

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(err => console.error("Erreur de connexion à MongoDB :", err));

// Définir une route pour l'URL racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API !");
});

// Utilisation de routes
app.use("/users", userRoutes); 

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Une erreur interne est survenue" });
});

// Démarrage du serveur
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;
app.listen(PORT, HOST, () => console.log(`Serveur en écoute sur ${HOST}:${PORT}...`));