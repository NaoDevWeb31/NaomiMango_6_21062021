// Import de packages dans l'appli
const mongoose = require("mongoose"); // Facilite les interactions avec la base de données

// Import du middleware de validation dans le modèle
const sauceValidator = require("../middleware/sauce-validator");

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true, validate: sauceValidator.nameValidator },
    manufacturer: { type: String, required: true, validate: sauceValidator.manufacturerValidator },
    description: { type: String, required: true, validate: sauceValidator.descriptionValidator },
    mainPepper: { type: String, required: true, validate: sauceValidator.mainPepperValidator },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});

// Permettre l'export du schéma dans d'autres fichiers
module.exports = mongoose.model("Sauce", sauceSchema);