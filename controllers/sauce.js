// Import du modèle dans le contrôleur
const Sauce = require("../models/Sauce");

// Import de la logique métier de la route GET
exports.getAllSauces = (req, res, next) => {
    // Récupérer un tableau contenant toutes les instances du modèle dans la database
    Sauce.find()
        .then((sauces) => {
            // Renvoyer toutes les sauces
            res.status(200).json(sauces);
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
};

// Import de la logique métier de la route GET spécifique
exports.getOneSauce = (req, res, next) => {
    // Récupérer l'instance du modèle spécifiée
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            // Renvoyer la sauce
            res.status(200).json(sauce);
        })
        .catch((error) => {
            res.status(404).json({ error: error });
        });
};