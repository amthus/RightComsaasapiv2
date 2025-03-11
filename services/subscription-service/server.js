require("dotenv").config();

const express = require("express");
const subscriptionRouter = require("./src/routes/subscriptionRoute");
const productRouter = require("./src/routes/productRoute");
const planRouter = require("./src/routes/planRoute");
const errorHandlerMiddleware = require("./src/middlewares/errorHandlerMiddleware");
const connectDB = require("./src/config/db");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/Subscription-service.collection.json');
const path = require('path');


// Initialisation de l'application Express
const app = express();
connectDB();
// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Définir une route pour l'URL racine
app.use(errorHandlerMiddleware);
app.use("/subscription", subscriptionRouter);
app.use("/product", productRouter);
app.use("/plan", planRouter);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API  de sabi!");
});

app.use(express.static(path.join(__dirname, 'public')));


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
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}...`));
