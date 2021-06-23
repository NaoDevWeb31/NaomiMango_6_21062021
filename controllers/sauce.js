// Import du modèle dans le contrôleur
const Sauce = require("../models/Sauce");

// Import de la logique métier de la route POST
exports.createSauce = (req, res, next) => {
    // Envoyer les données de la requête en form-data (non en JSON)
    // Analyser l'objet Sauce converti en chaîne pour obtenir un objet utilisable
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    // Créer une instance du modèle
    const sauce = new Sauce({
        // Copier tous les éléments
        ...sauceObject,
        // Résoudre l'URL complète de l'image (ici, http://localhost:3000/images/...')
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    // Enregistrer l'instance du modèle (sauce) dans la base de données
    sauce.save()
        .then(() => {
            res.status(201).json({ message: "La nouvelle sauce a été enregistrée avec succès !" });
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

// Import de la logique métier de la route PUT
exports.modifySauce = (req, res, next) => {
    // Créer un objet "sauceObject" qui regarde si "req.file" existe ou non
    const sauceObject = req.file ?
        // S'il existe, traiter la nouvelle image
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            // Sinon, traiter simplement l'objet entrant
        } : { ...req.body };
    // Créer une instance Sauce à partir de sauceObject et la mettre à jour
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => {
            res.status(201).json({ message: "La sauce a été mise à jour avec succès !" });
        })
        .catch((error) => {
            res.status(400).json({ error: error });
        });
};

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