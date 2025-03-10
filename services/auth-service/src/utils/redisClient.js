const { createClient } = require("redis");

// Créez une instance du client Redis
const client = createClient({
  url: `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || 6379}`,
});

// Gestion des erreurs de connexion Redis
client.on("error", (err) => {
  console.error("Redis error:", err);
});

// Connectez-vous à Redis
client.connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Failed to connect to Redis:", err);
  });

// Exportez les méthodes Redis directement (elles retournent déjà des promesses)
module.exports = {
  client,
  getAsync: client.get.bind(client), 
  setAsync: client.set.bind(client), 
  delAsync: client.del.bind(client),
};