// Import de packages dans l'appli
const express = require("express");

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

//TEST
app.use((req, res, next) => {
    res.json({ message: "Votre requête a bien été reçue !" });
    next();
});

// Permettre l'export de l'appli sur d'autres fichiers
module.exports = app;