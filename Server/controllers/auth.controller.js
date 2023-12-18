const express = require("express");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/users");
// const roleModel = require("../models/role.model");
const Usermail = require("../models/appartement.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const generateAccessToken = require("../services/jwtToken");
const verififemail = require("../services/verifEmail");
const verifToken = require("../services/verifToken");

const register = async (req, res) => {
  try {
    console.log('gghg');
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .json({
          messageE:
            "Cet e-mail est déjà utilisé. Veuillez choisir un autre e-mail.",
        });
    }

    // Hacher le mot de passe
    console.log("for password register", req.body.password.length);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Créer un nouvel utilisateur
    const newUser = new userModel({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      // role: role._id, // Attribuer l'ID du rôle
      password: hashedPassword,
    });

    // Enregistrer l'utilisateur dans la base de données
    await newUser.save();
    const accessToken = generateAccessToken({ user: req.body.email });
    console.log("pour register " + accessToken);
    // const refreshToken = generateRefreshToken ({user: req.body.email})

    // Répondre avec le nouvel utilisateur

    const link = `http://localhost:3000/verifemail?token=${accessToken}`;
    const email = req.body.email;
    const subject = "Account Verification";
    verififemail(email, subject, link);

    return res.status(201).json({
      messageS: "activer votre compte virefier votre mail",
      user: newUser,
      token: accessToken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }

  // refreshTokens
  // let refreshTokens = []
  // function generateRefreshToken(user) {
  //     const refreshToken =
  //     jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"})
  //     refreshTokens.push(refreshToken)
  //     return refreshToken
  // }
};

const login = async (req, res) => {
  try {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;
    const verifyexistEmail = await userModel
      .findOne({ email: loginEmail })
    console.log(verifyexistEmail);
    //  .select('-_id -password -isverified');
    if (!verifyexistEmail) {
      return res.json({ messageE: "Utilisateur introuvable" });
    } else if (verifyexistEmail.isverified === false) {
      return res.json({ messageE: "activer votre compte" });
    }

    const comparePassword = await bcrypt.compare(
      loginPassword,
      verifyexistEmail.password
    );
    console.log(comparePassword);
    if (comparePassword) {
      const accessToken = generateAccessToken({ user: verifyexistEmail });

      res.cookie("access_token", accessToken, {
        httpOnly: true, // The cookie cannot be accessed via client-side JavaScript
        secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production     
      });
      console.log("dddd");
      console.log(req.cookies.access_token);
      console.log("dddd");


      return res.status(200).json({
        messageS: "Vous avez crée un compte avec success",
        data: {
          first_name: verifyexistEmail.first_name,
          last_name: verifyexistEmail.last_name,
          email: verifyexistEmail.email,
        },
        token: accessToken,
      });
    } else {
      return res.json({ messageE: "Mot de passe incorrect" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const verifyAcountwithchecktoken = async (req, res) => {
  const token = req.body.token;
  console.log("hello");
  try {
    const ischecked = verifToken(token);

    if (ischecked) {
      const email = ischecked;

      const virefmail = await userModel.findOneAndUpdate(
        { email: email },
        { $set: { isverified: true } },
        { new: true }
      );
      console.log("virefied");
      res.json({ message: "votre compte a éte virefier" });
    } else {
      console.log("not virefied");

      res.json({ message: "virefication est expiré ." });
    }
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  console.log("ee forgotpassss ");
  const email = req.body.email;
  console.log(email);

  try {
    const verifyexistEmail = await userModel.findOne({
      email: email,
    });

    console.log(verifyexistEmail);
    if (verifyexistEmail) {
      console.log(email);
      const accessToken = generateAccessToken({ user: email });
      console.log(accessToken);

      const link = `http://localhost:3000/reset-password?token=${accessToken}`;
      const subject = "Reset Password";

      verififemail(email, subject, link);

      res.json({
        message: "check your mail",
      });
    } 
    else {
      res.json({
        message: "pas de compte avec ce email",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const resetPassword = async (req, res) => {
  const token = req.query.token;
  console.log("after check email " + token);
  try {
    console.log("after check email " + token);

    const ischecked = verifToken(token);

    console.log("after email for check tokeen " + ischecked);

    if (ischecked) {
      res.send("vous pouver changer votre password ");
    } else {
      res.send("email inconnu");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const resetPasswordAfterVerif = async (req, res) => {
  const token = req.body.token;
  console.log("this is token com from front restpassword ", token);
  const newpassword = req.body.password;

  try {
    const ischecked = verifToken(token);

    if (ischecked) {
      hashpassword = await bcrypt.hash(newpassword, 10);
      const email = ischecked;
      console.log(
        "ce email est envoiyer depuis verif token in reset password  ",
        email
      );

      const virefmail = await userModel.findOneAndUpdate(
        { email: email },
        { $set: { password: hashpassword } },
        { new: true }
      );
      res.send("votre password et changer ");
    } else {
      res.send("expirationd de password.");
    }
  } catch (error) {
    console.log(error.message);
  }
};
const logout = async (req, res) => {

  
  const islogout = res.clearCookie("access_token");
  if (islogout) {
    return res.status(200).json({
      message: "vous avez deconecter",
    });
  } else {
    return res.status(400).json({
      message: "echec ?????????",
    });
  }
};

const profile = async (req, res) => {
  console.log("eeeeeeeeeeeeeeeeeeee");
  try {
    const token = req.cookies.access_token;

    const email = verifToken(token);
    if (token) {
      const userdata = await userModel
        .findOne({ email: email })
        .populate("role", "role_name");
      console.log("for profile", userdata);
      if (userdata) {
        return res.status(201).json({
          message: "Bonjour " + userdata.first_name,
          role: "votre role est " + userdata.role.role_name,
        });
      }
    }
  } catch (error) {}
};


const storeemail = async (req, res)=>{

  try {
    const email = req.body.email;
    const userdata = await userModel
        .findOne({ email: email })
      if (userdata) {
        return res.status(200).json({
          message: "email added success",
        data : userdata.first_name });
      }else {
        return res.status(400).json({
          message: "not name with this email",
        });
      }


    
  } catch (error) {
    console.log(error.message);
    
  }
}

module.exports = {
  register,
  login,
  verifyAcountwithchecktoken,
  forgotPassword,
  resetPassword,
  resetPasswordAfterVerif,
  logout,
  profile,
  storeemail,
};
