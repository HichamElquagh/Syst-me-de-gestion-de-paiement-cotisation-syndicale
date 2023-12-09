 const jwt = require('jsonwebtoken');
 const userModel = require('../models/users')
 const dotenv = require('dotenv').config();

function verifToken(token){
     
    // Vérifiez la validité du token ici
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const email = decoded.user;
        return email;

    } catch (error) {
        // Si le token est invalide ou expiré, redirigez l'utilisateur vers une page d'erreur ou affichez un message d'erreur.
      console.log(error.message);

    }

};
module.exports = verifToken;