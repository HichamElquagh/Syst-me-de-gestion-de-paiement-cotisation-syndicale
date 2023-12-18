const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const verifToken = require('../services/verifToken')
// const verifToken = require('../services/')

const validateRegistrationData = [
    body('first_name').notEmpty().withMessage('Le prénom est requis'),
    body('last_name').notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().withMessage('Adresse e-mail invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),

    async (req, res, next) => {
        if (req.body.password !== req.body.confirm_password) {
            return res.json({
                'message' :  "c'est pas le meme password"
            });

        }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
      }
      next();
    }
  ];


  const validateloginData = [
    body('email').isEmail().withMessage('Adresse e-mail invalide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
    }
  ]

  const authMiddleware = async(req,res,next)=>{
    // console.log(req);
    //get data from cookie
    const access_token = req.cookies.access_token;
    // const { }
    console.log('hello');
    console.log(access_token);
    console.log('hello');


    if (!access_token) {
        return res.status(401).json({ message: 'vous etes pas connecter ' });
    }else{
      const checktoken =verifToken(access_token)
      if(checktoken){
        req.user = checktoken
      next();
      }else{
        return res.json({
          message : "token expired"
         })
      }


      

    }

  }
  // const isAuth = async(req,res,next)=>{
  //   const token = req.cookies.access_token;

  //   if (!token) {
  //     next()  
  //     }else{
  //     const checktoken =verifToken(token)
       
  //     if(checktoken){
  //       return res.json({
  //         message: "vous aver deja fais login  "
  //       })
  //     }


      

  //   }


  // }

  // middleware/validateToken.js

// const validateToken = (req, res, next) => {
//   // Récupérez le token à partir du cookie
//   const token = req.cookies.access_token;
// console.log(token);
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   try {
//     // Vérifiez et décryptez le token
//     const decoded = verifToken(token, 'votre_secret_key');  
//     console.log(decoded);  
//     next();
//   } catch (error) {
//     console.error('Erreur lors de la validation du token :', error);
//     return res.status(401).json({ message: error.message });
//   }
// };

// module.exports = validateToken;






module.exports = {
    validateRegistrationData,
    validateloginData,
    authMiddleware,

}