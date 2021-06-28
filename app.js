// Import de packages dans l'appli
const express = require("express");
const mongoose = require("mongoose"); // Facilite les interactions avec la base de données
const path = require("path"); // Accède au path de notre serveur
require("dotenv").config(); // Charge les variables d'environnement d'un fichier ".env" dans "process.env." (masque les infos de connexion à MongoDB Atlas)
const session = require("express-session"); // Empêche le piratage de session
const helmet = require("helmet"); // Protège contre les attaques XSS
const xss = require("xss-clean"); // Protège contre les attaques XSS
const cors = require("cors"); // Permettre le partage de ressources entre origines multiples
const rateLimit = require("express-rate-limit");// Protège contre les attaques DDos qui rendent inaccessible/indisponible un serveur ou un service

// Import des routeurs dans l'appli
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Connecter l'API au cluster MongoDB Atlas
mongoose.connect(process.env.DB_USER,
    {
        useCreateIndex: true,
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
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    // Envoyer des requêtes avec les méthodes mentionnées
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

// Middleware pour protéger la session et les cookies
// Créer 2h à partir de ms
const twoHours = 1000 * 60 * 120; // 1000ms * 60s * 120min
app.use(
    session({
      name: "sessionForApplication",
      secret: process.env.SESSION_SECRET,
      saveUninitialized: true,
      resave: false,
      cookie: {
        secure: true,
        maxAge: twoHours,
        domain: process.env.APP_DOMAIN,
        httpOnly: true,
      }
    })
);

// Extraire et analyser les objets JSON des requêtes POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Empêcher certaines failles XSS et la perte de contrôle du navigateur (données de l'appli)
app.use(helmet());

// Protéger les formulaires, URL et requêtes des attaques XSS
app.use(xss());

// Protéger les données en transit
app.use(cors());

// Limiter l’envoi de requêtes répétées pour éviter la saturation
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100, // Limiter chaque IP à 100 requêtes par windowMs
    message: "Vous avez dépassé le nombre de requêtes autorisées en 5 minutes !"
});
// Appliquer à toutes les requêtes de l'appli
app.use(limiter);

// Utiliser le gestionnaire de routage pour gérer le sous-dosser "images" de manière statique à chaque fois qu'elle reçoit une requête vers la route "/images"
app.use("/images", express.static(path.join(__dirname, "images")));

// Utiliser du routeur "user" pour toutes les requêtes vers "/api/auth" dans l'appli
app.use("/api/auth", userRoutes);
// Utiliser du routeur "sauce" pour toutes les requêtes vers "/api/sauces" dans l'appli
app.use("/api/sauces", sauceRoutes);

// Permettre l'export de l'appli sur d'autres fichiers
module.exports = app;