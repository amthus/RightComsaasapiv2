const mongoose = require("mongoose");


const connectDB = async () =>{
    mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((err) => console.error("Erreur de connexion à MongoDB :", err));
  


}


  module.exports = connectDB