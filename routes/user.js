const express = require("express");
// Créer le routeur
const router = express.Router();

// Import du modèle dans le routeur
const userCtrl = require("../controllers/user");

// Import de nos contrôleurs
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// Permettre l'export du routeur sur d'autres fichiers
module.exports = router;