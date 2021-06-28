// Import du package dans le middleware
const validate = require("mongoose-validator"); // Valide les données du schéma Mongoose Sauce

exports.nameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Le nom de la sauce doit comprendre entre 3 et 50 caractères !",
  }),
  validate({
    validator: "matches",
    arguments: /^[a-zA-Z\d\&\-\'\s]+$/i,
    message: "Seuls les lettres, les chiffres, les esperluettes, les tirets, les apostrophes et les espaces sont autorisés !",
  }),
]

exports.manufacturerValidator = [
    validate({
      validator: "isLength",
      arguments: [3, 50],
      message: "Le nom du fabricant doit comprendre entre 3 et 50 caractères !",
    }),
    validate({
      validator: "matches",
      arguments: /^[a-zA-Z\d\&\-\'\s\.]+$/i,
      message: "Seuls les lettres, les chiffres, les esperluettes, les tirets, les apostrophes, les espaces et les points sont autorisés !",
    }),
]

exports.descriptionValidator = [
    validate({
      validator: "isLength",
      arguments: [10,320],
      message: "La description doit comprendre entre 10 et 320 caractères !",
    }),
    validate({
        validator: "matches",
        arguments: /^[a-zA-Z\d\s\é\É\è\È\ê\Ê\à\À\â\Â\ô\Ô\ë\Ë\ç\Ç\ù\Ù\û\Û\î\Î\ï\Ï\-\_\'\,\!\?\:\"\"\«\»\&\.]+$/i,
        message: "Caractères autorisés : lettres (avec ou sans accent, minuscules ou majuscules), chiffres, tirets, tirets bas, apostrophes, virgules, points d'exclamation, points d'interrogation, deux points, guillemets, esperluettes et points !",
      }),
]

exports.mainPepperValidator = [
    validate({
      validator: "isLength",
      arguments: [3, 50],
      message: "Le nom du piment principal doit comprendre entre 3 et 50 caractères !",
    }),
    validate({
      validator: "matches",
      arguments: /^[a-zA-Z\d\-\'\s]+$/i,
      message: "Seuls les lettres, les chiffres, les tirets, les apostrophes et les espaces sont autorisés !",
    }),
]