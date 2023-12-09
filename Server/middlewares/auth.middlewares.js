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
    //get data from cookie
    const token = req.cookies.access_token;
    console.log('hello');
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'vous etes pas connecter ' });
    }else{
      const checktoken =verifToken(token)

      if(checktoken){
         next();
      }else{
        return res.json({
          message : "token expired"
         })
      }


      

    }

  }
  const isAuth = async(req,res,next)=>{
    const token = req.cookies.access_token;

    if (!token) {
      next()  
      }else{
      const checktoken =verifToken(token)

      if(checktoken){
        return res.json({
          message: "vous aver deja fais login  "
        })
      }


      

    }


  }





module.exports = {
    validateRegistrationData,
    validateloginData,
    authMiddleware,
    isAuth

}