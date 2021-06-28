# NaomiMango_6_22062021 - So Pekocko

### Projet 6 du parcours "Développeur web" d'OpenClassrooms - Construisez une API sécurisée pour une application d'avis gastronomiques

![Logo](https://user.oc-static.com/upload/2019/09/02/15674356878125_image2.png)

## Objectif

Créer un MVP appelé “Piquante”, permettant aux utilisateurs d’ajouter leurs sauces préférées et de liker ou disliker les sauces ajoutées par les autres utilisateurs. Développer la partie back-end de l'application.

## Installation

#### Prérequis

- Node
- `npm`

#### Projet So Pekocko

Créer un dossier racine dans lequel, il faudra ajouter le dossier du frontend et celui du backend :

- Pour le Frontend

  - Se rendre sur le lien de la partie frontend de l'application https://github.com/OpenClassrooms-Student-Center/dwj-projet6
  - Cloner le projet dans le dossier racine
  - Ouvrir le terminal et se déplacer dans le dossier créé
  - Exécuter `npm install`
  - Installer les packages prérequis tels que `npm install --save @angular/cli@7.0.2` pour rendre l'application fonctionnelle
  - Exécuter `npm start` pour accéder au serveur de développement

- Pour le Backend (ce repository)

  - Cloner le projet dans le dossier racine
  - Ouvrir le terminal et se déplacer dans le dossier créé
  - exécuter `npm install`
  - exécuter `npm start`
  - Créer un fichier `.env` dans lequel il faut ajouter `SESSION_SECRET` en suivant l'exemple comme dans le fichier `.env.example`

#### Connexion à MongoDB

Pour tester les 2 droits administrateur :

- Première façon en utilisant ma base de données :
  - Modifier la ligne 17 du fichier `app.js`, en choisissant entre `process.env.DB_USER` et `process.env.DB_ADMIN`
- Deuxième façon en utilisant votre propre base de données :
  - Créer un fichier `.env` dans il faudra ajouter `DB_URI` en suivant l'exemple comme dans le fichier `.env.example`
  - Modifier la ligne 17 du fichier `app.js`, en passant de `process.env.DB_USER` à `process.env.DB_URI`
- Troisième façon en utilisant votre propre base de données :
  - Créer 2 droits administrateur sur MongoDB :
    - un rôle readWriteAnyDatabase
    - un rôle readWrite
  - Créer un fichier `.env` dans il faudra ajouter :
    - `DB_ADMIN` en suivant l'exemple comme dans le fichier `.env.example` et en utilisant le `<userName>`correspondant à l'utilisateur ayant le rôle readWriteAnyDatabase
    - `DB_USER` en suivant l'exemple comme dans le fichier `.env.example` et en utilisant le `<userName>`correspondant à l'utilisateur ayant le rôle readWrite
  - Modifier la ligne 17 du fichier `app.js`, en choisissant entre `process.env.DB_USER` et `process.env.DB_ADMIN`

#### Application Piquante

Se rendre sur http://localhost:4200 via le navigateur

## Fonctionnalités

#### Technologies à utiliser

|       Technologies       |
| :----------------------: |
|    Framework: Express    |
|     Serveur: NodeJS      |
| Base de données: MongoDB |

Toutes les opérations de la base de données :

- doivent utiliser le pack Mongoose
- avec des schémas de données stricts

#### Routes API

Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation : "Bearer <token>")

#### Erreurs API

Toute erreur doit être renvoyée telle quelle :

- sans aucune modification ni ajout
- si nécessaire, utiliser une nouvelle Erreur().

#### Modèle de données

- Utilisateur :

  - userId: ​string​ — identifiant unique MongoDB pour l'utilisateur qui a créé la sauce
  - email: ​string​ — adresse électronique de l'utilisateur [unique]
  - password: ​string​ — hachage du mot de passe de l'utilisateur

- Sauce :

  - id: ​ObjectID​ — identifiant unique créé par MongoDB
  - userId: ​string​ — identifiant unique MongoDB pour l'utilisateur qui a créé la sauce
  - name: ​string​ — nom de la sauce
  - manufacturer: ​string​ — fabricant de la sauce
  - description: ​string​ — description de la sauce
  - mainPepper: ​string​ — principal ingrédient dans la sauce
  - imageUrl: ​string​ — string de l'image de la sauce téléchargée par l'utilisateur
  - heat: ​number​ — nombre entre 1 et 10 décrivant la sauce
  - likes: ​number​ — nombre d'utilisateurs qui aiment la sauce
  - dislikes: ​number​ — nombre d'utilisateurs qui n'aiment pas la sauce
  - usersLiked: ​[string]​ — tableau d'identifiants d'utilisateurs ayant aimé la sauce
  - usersDisliked: ​[string]​ — tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce

#### Likes et dislikes

Le nombre de likes/dislikes et les tableaux like/dislike doivent être mis à jour pour mettre en œuvre la fonctionnalité.

## Contraintes techniques

- l’API doit respecter le RGPD et les standards OWASP
- le mot de passe des utilisateurs doit être chiffré
- 2 types de droits administrateur à la base de données doivent être définis :
  - un accès pour supprimer ou modifier des tables
  - un accès pour éditer le contenu de la base de données
- la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine
- l’authentification doit être renforcée sur les routes requises
- les mots de passe doivent être stockés de manière sécurisée
- les adresses mails de la base de données :
  - sont uniques
  - un plugin Mongoose approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs

## Instructions

Pour plus de détails sur les instructions de ce projet :

- [Note de cadrage](https://github.com/NaoDevWeb31/NaomiMango_6_22062021/blob/main/rules/Note%20de%20cadrage%20So%20Pekocko%20V3.pdf)
- [Guidelines API](https://github.com/NaoDevWeb31/NaomiMango_6_22062021/blob/main/rules/Guidelines%20API.pdf)
