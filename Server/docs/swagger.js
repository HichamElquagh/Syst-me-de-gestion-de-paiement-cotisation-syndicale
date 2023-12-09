// for register   
/**
 * @swagger
 * paths:
 *   /api/register:
 *     post:
 *       summary: Register a new user
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                 last_name:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 password:
 *                   type: string
 *                   format: password
 *                 role:
 *                   type: string
 *               required:
 *                 - first_name
 *                 - last_name
 *                 - email
 *                 - password
 *                 - role
 *       responses:
 *         201:
 *           description: User registered successfully, activation email sent
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   user:
 *                     type: object
 *                     properties:
 *                       first_name:
 *                         type: string
 *                       last_name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                   token:
 *                     type: string
 *         400:
 *           description: Bad request, invalid input or user already exists
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
     // for loginn
/**
 * @swagger
 * paths:
 *   /api/login:
 *     post:
 *       summary: Authenticate user and generate access token
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User's email address
 *                   example: user@example.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   description: User's password
 *                   example: password123
 *               required:
 *                 - email
 *                 - password
 *       responses:
 *         200:
 *           description: User authenticated successfully, access token generated
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       first_name:
 *                         type: string
 *                         description: User's first name
 *                       last_name:
 *                         type: string
 *                         description: User's last name
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: User's email address
 *                       role:
 *                         type: string
 *                         description: User's role
 *                   token:
 *                     type: string
 *                     description: Access token for authentication
 *         400:
 *           description: Bad request, invalid input or incorrect password
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         404:
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 */
   // for verify email
/**
 * @swagger
 * paths:
 *   /api/verifemail:
 *     get:
 *       summary: Verify user account using verification token
 *       tags:
 *         - Authentication
 *       parameters:
 *         - in: query
 *           name: token
 *           schema:
 *             type: string
 *           required: true
 *           description: Verification token received in the email
 *       responses:
 *         200:
 *           description: User account verified successfully
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: Votre compte a été vérifié avec succès.
 *         404:
 *           description: Verification token expired or invalid
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: La vérification a échoué. Le jeton de vérification est expiré ou invalide.
 *         500:
 *           description: Internal server error
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: Une erreur interne du serveur s'est produite lors de la vérification du compte.
 */
 // for porgot password 

/**
 * @swagger
 * paths:
 *   /api/forgotpassword:
 *     post:
 *       summary: Send reset password email to the user
 *       tags:
 *         - Authentication
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: User's email address for password reset
 *                   example: user@example.com
 *               required:
 *                 - email
 *       responses:
 *         200:
 *           description: Reset password email sent successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Email sent successfully. Please check your inbox.
 *         404:
 *           description: User not found with the provided email address
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: No account found with this email address.
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Internal server error occurred while processing the request.
 */

// for reset password 
/**
 * @swagger
 * paths:
 *   /api/resetpassword:
 *     get:
 *       summary: Verify reset password token and allow password change
 *       tags:
 *         - Authentication
 *       parameters:
 *         - in: query
 *           name: token
 *           schema:
 *             type: string
 *           required: true
 *           description: Reset password token received in the email
 *       responses:
 *         200:
 *           description: User verified, allowed to change password
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: Vous pouvez maintenant changer votre mot de passe.
 *         404:
 *           description: Invalid or expired reset password token
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: Token de réinitialisation du mot de passe invalide ou expiré.
 *         500:
 *           description: Internal server error
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: Une erreur interne du serveur s'est produite lors de la vérification du token.
 */


   // for get user logout 

/**
 * @swagger
 * paths:
 *   /api/logout:
 *     post:
 *       summary: Logout user and clear access token cookie
 *       tags:
 *         - Authentication
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: User successfully logged out
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Vous avez été déconnecté avec succès.
 *         400:
 *           description: Logout failed, access token not cleared
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Échec de la déconnexion. Le jeton d'accès n'a pas été effacé correctement.
 *         401:
 *           description: Unauthorized, user not logged in
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Non autorisé. Utilisateur non connecté.
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Une erreur interne du serveur s'est produite lors de la déconnexion.
 */

// for get user info 

/**
 * @swagger
 * paths:
 *   /api/profile:
 *     get:
 *       summary: Get user profile information
 *       tags:
 *         - Authentication
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: User profile data retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Bonjour [User First Name]
 *                   role:
 *                     type: string
 *                     example: Votre rôle est [User Role]
 *         401:
 *           description: Unauthorized, user not logged in
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Non autorisé. Utilisateur non connecté.
 *         500:
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Une erreur interne du serveur s'est produite lors de la récupération des données du profil utilisateur.
 */
