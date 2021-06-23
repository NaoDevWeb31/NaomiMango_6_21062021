// Import de packages dans l'appli
const express = require("express");
const mongoose = require("mongoose"); // Facilite les interactions avec la base de données

// Connecter l'API au cluster MongoDB Atlas
mongoose.connect("mongodb+srv://new-user-OC:H5Ja4yCCmNhAyB5@clusteroc.rz1xn.mongodb.net/So_Pekocko?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connexion à MongoDB Atlas réussie !"))
    .catch(() => console.log("Connexion à MongoDB Atlas échouée !"));

// Créer l'appli
const app = express();

// Middleware des Headers
app.use((req, res, next) => {
    // Accèder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter les headers mentionnés aux reqûetes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Extraire et analyser les objets JSON des requêtes POST
app.use(express.json());

//TEST
app.use((req, res, next) => {
    res.json({ message: "Votre requête a bien été reçue !" });
    next();
});

// Permettre l'export de l'appli sur d'autres fichiers
module.exports = app;