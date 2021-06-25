// Import du modèle dans l'appli
const passwordSchema = require("../models/Password");

// Valider le mot de passe en le comparant à passwordSchema
module.exports = (req, res, next) => {
    // Si le mdp saisi ne correspond pas au passwordSchema
    if (!passwordSchema.validate(req.body.password)){
        res
        // Dans Headers de la requête
        .writeHead(
            400,
            // Message de statut
            "=> Le mot de passe requiert au minimum 8 caractères, une minuscule, une majuscule, 2 chiffres, un caractère spécial et ne doit pas contenir d'espace !",
            {"Content-Type": "application/json"})
            // Message de réponse
        .end("Mot de passe incorrect !")
    } else {
        next();
    }
}