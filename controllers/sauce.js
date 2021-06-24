// Import du modèle dans le contrôleur
const Sauce = require("../models/Sauce");

// Import du package dans le contrôleur
const fs = require("fs"); // Accède aux fonctions qui permettent de modifier le système de fichiers

// Import de la logique métier de la route POST pour les sauces
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

// Import de la logique métier de la route DELETE
exports.deleteSauce = (req, res, next) => {
    // Utiliser l'ID reçu comme paramètre pour accéder à la Sauce correspondant dans la base de données
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // Utiliser le segment "/images/" de notre URL d'image pour extraire le nom du fichier à supprimer
            const filename = sauce.imageUrl.split("/images/")[1];
            // Passer comme paramètres le fichier à supprimer et le callback à exécuter une fois ce fichier supprimé
            fs.unlink(`images/${filename}`, () => {
                // Implémenter la logique d'origine en supprimant la Sauce de la base de données
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "La sauce a été supprimée avec succès !" }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
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

// Import de la logique métier de la route POST pour les likes/dislikes
exports.likeDislikeSauce = (req, res, next) => {
    // Identifiant de la sauce
    let sauceId = req.params.id;
    // Like envoyé dans corps de la reqûete
    let like = req.body.like;
    // UserId de l'utilisateur qui a créé la sauce
    let userId = req.body.userId;
    // Futures nouvelles valeurs de la sauce
    let sauceUpdates = {};
    // Futur message de réponse
    let message = "";
    // Récupérer la sauce spécifique gràce à son id
    Sauce.findById(sauceId)
        .then((sauce) => {
            if (like === 1){ // Si la sauce est liké
                if(sauce.usersLiked.includes(userId)){ // Et que l'utilisateur est déjà dans le tableau usersLiked
                    throw "L'utilisateur a déjà liké cette sauce !";
                }
                // Et que l'utilisateur n'est pas dans tableau
                sauceUpdates = {
                    $push: { usersLiked: userId }, // L'ajouter dans le tableau
                    $inc: { likes: 1 } // Ajouter 1 au likes
                }
                message = "Like ajouté pour la sauce " + sauce.name + " !";
            } else if (like === -1){ //Si la sauce est disliké
                if (sauce.usersDisliked.includes(userId)){ // Et que l'utilisateur est déjà dans le tableau usersDisliked
                    throw "L'utilisateur a déjà disliké cette sauce !";
                }
                // Et qu'il n'est pas dans tableau
                sauceUpdates = {
                    $push: { usersDisliked: userId }, // L'ajouter dans le tableau
                    $inc: { dislikes: 1 } // Ajouter 1 au dislikes
                }
                message = "Dislike ajouté pour la sauce " + sauce.name + " !";
            } else if ( like === 0){ // S'il annule like et dislike cette sauce
                if(sauce.usersLiked.includes(userId)){ // Et que l'utilisateur est déjà dans le tableau usersLiked
                    sauceUpdates = {
                        $pull: { usersLiked: userId }, // Le retirer du le tableau
                        $inc: { likes: -1 } // Soustraire 1 au likes
                    };
                    message = "Like annulé pour la sauce " + sauce.name + " !";
                } else if (sauce.usersDisliked.includes(userId)){ // Et que l'utilisateur est déjà dans le tableau usersDisliked
                    sauceUpdates = {
                        $pull: { usersDisliked: userId }, // Le retirer du le tableau
                        $inc: { dislikes: -1 } // Soustraire 1 au dislikes
                    };
                    message = "Dislike annulé pour la sauce " + sauce.name + " !";
                }
            }
            // Enregistrer les mises à jour de la sauce dans la base de données
            Sauce.updateOne({ _id: req.params.id }, sauceUpdates)
            .then(() => {
                res.status(201).json(message);
                console.log(message);
            })
            .catch((error) => {
                res.status(400).json({ error: error });
            });
        })
        .catch((error) => {
            res.status(404).json({ error: error });
        });
}