const http = require("http");

// Créer le serveur
const server = http.createServer((req, res) => {
    res.end("Voici la réponse du serveur !")
});

// Configuer le serveur pour qu'il écoute le port approprié
server.listen(process.env.PORT || 3000);
