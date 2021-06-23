// Import de packages dans l'appli
const mongoose = require("mongoose"); // Facilite les interactions avec la base de données
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Utiliser le package de validation dans le schéma (s'assurer que 2 users ne puissent partager la même adresse email)
userSchema.plugin(uniqueValidator);

// Permettre l'export du schéma dans d'autres fichiers
module.exports = mongoose.model("User", userSchema);