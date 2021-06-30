// Import de packages dans l'appli
const mongoose = require("mongoose"); // Facilite les interactions avec la base de données
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: [true, "Veuillez remplir votre adresse email !"], 
        unique: true, 
        // Inutile => déjà configuré dans le frontend
        // match: [/^[a-zA-Z0-9&^_¨-]+(?:.[a-zA-Z0-9&^_¨-]+)@[a-zA-Z]+[.](?:[a-z]{2,3})$/, "Adresse email incorrecte !"]
    },
    password: { 
        type: String, 
        required: [true, "Veuillez remplir votre mot de passe !"] 
    }
});

// Utiliser le package de validation dans le schéma (s'assurer que 2 users ne puissent partager la même adresse email)
userSchema.plugin(uniqueValidator, {message: "Cette adresse email a déjà été utilisée !"});

// Permettre l'export du schéma dans d'autres fichiers
module.exports = mongoose.model("User", userSchema);