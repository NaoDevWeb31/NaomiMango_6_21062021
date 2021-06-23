const express = require("express");
// Créer le routeur
const router = express.Router();

// Import du middleware d'authentification dans le routeur
const auth = require("../middleware/auth");
// Import du modèle dans le routeur
const sauceCtrl = require("../controllers/sauce");

// Import des contrôleurs
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);

// Permettre l'export du routeur sur d'autres fichiers
module.exports = router;