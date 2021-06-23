// Import des packages dans le contrôleur
const bcrypt = require("bcrypt"); // Chiffre et crée un hash des mdp
const jwt = require('jsonwebtoken'); // Créer des tokens et les vérifie
// Import du modèle dans l'appli
const User = require("../models/User");

exports.signup = (req, res, next) => {
    // Chiffrer le mdp
    bcrypt
        // Saler le mdp 10 fois
        .hash(req.body.password, 10)
        // Recevoir le hash généré
        .then(hash => {
            // Créer un utilisateur
            const user = new User({
                email: req.body.email,
                password: hash
            });
            // L'enregistrer dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    // Récuperer l'email saisie
    User.findOne({ email: req.body.email })
        .then(user => {
            // Si l'utilisateur ne correspond pas à un utilisateur existant de la base de données
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            // Si l'utilisateur correspond
            bcrypt
                // Comparer le mdp saisi avec le hash enregistré dans la base de données
                .compare(req.body.password, user.password)
                .then(valid => {
                    // Si le mdp saisi ne correspond pas
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    // Si le mdp saisi correspond, renvoyer l'identifiant userID et un token (jeton Web JSON) au front-end
                    res.status(200).json({
                        userId: user._id,
                        // Encoder un nouveau token
                        token: jwt.sign(
                            // Contenant l'identifiant userID en tant que payload (les données encodées dans le token)
                            { userId: user._id },
                            // En utilisant une chaîne secrète de développement temporaire (à remplacer par une chaîne aléatoire beaucoup plus longue)
                            "RANDOM_TOKEN_SECRET",
                            // En définissant la durée de validité du token (se reconnecter au bout de 24 heures)
                            { expiresIn: "2h" }
                        )
                    });
                    console.log("L'utilisateur " + user._id + " est désormais connecté !");
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
