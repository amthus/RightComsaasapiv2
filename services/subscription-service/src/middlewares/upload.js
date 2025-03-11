const multer = require("multer");
const path = require("path");

// Configuration du stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Renomme le fichier avec un timestamp
  },
});

// Initialisation de multer avec la configuration de stockage
const upload = multer({ storage });

// Exporter uniquement l'objet upload
module.exports = upload;
