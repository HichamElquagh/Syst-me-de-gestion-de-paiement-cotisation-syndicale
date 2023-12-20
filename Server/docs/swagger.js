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
  // for add appart 
 /**
 * @swagger
 * paths:
 *   /addAppartement:
 *     post:
 *       summary: Créer un nouvel appartement
 *       tags:
 *         - Appartement
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 floor_number:
 *                   type: integer
 *                   description: Numéro de l'étage de l'appartement
 *                 door_number:
 *                   type: integer
 *                   description: Numéro de la porte de l'appartement
 *                 status:
 *                   type: string
 *                   description: Statut de l'appartement (Vacant ou autre)
 *                 tenant:
 *                   type: string
 *                   description: Locataire de l'appartement
 *               example:
 *                 floor_number: 2
 *                 door_number: 203
 *                 status: Occupied
 *                 tenant: John Doe
 *       responses:
 *         200:
 *           description: Succès - Appartement créé avec succès
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageS:
 *                     type: string
 *                     description: Message de succès
 *                   data:
 *                     type: object
 *                     description: Données de l'appartement créé
 *         400:
 *           description: Échec de l'enregistrement de l'appartement
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageE:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 */
// l'affichage du appartement 
/**
 * @swagger
 * paths:
 *   /appartements:
 *     get:
 *       summary: Obtenir tous les appartements de l'utilisateur connecté
 *       tags:
 *         - Appartement
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: Succès - Liste des appartements récupérée avec succès
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Appartement'
 *         401:
 *           description: Non autorisé, utilisateur non connecté
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Non autorisé. Utilisateur non connecté.
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 * 
 * components:
 *   schemas:
 *     Appartement:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de l'appartement
 *         floor_number:
 *           type: integer
 *           description: Numéro de l'étage de l'appartement
 *         door_number:
 *           type: integer
 *           description: Numéro de la porte de l'appartement
 *         status:
 *           type: string
 *           description: Statut de l'appartement (Vacant ou autre)
 *         tenant:
 *           type: object
 *           properties:
 *             full_name:
 *               type: string
 *               description: Nom complet du locataire
 *             phone:
 *               type: string
 *               description: Numéro de téléphone du locataire
 *           description: Locataire de l'appartement
 */
// l'affichage du appart par id 

/**
 * @swagger
 * paths:
 *   /getAppartement/{appartementId}:
 *     get:
 *       summary: Obtenir un appartement par son ID
 *       tags:
 *         - Appartement
 *       parameters:
 *         - in: path
 *           name: appartementId
 *           required: true
 *           description: ID de l'appartement à récupérer
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Succès - Appartement récupéré avec succès
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Appartement'
 *         404:
 *           description: Appartement non trouvé
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 */
// update appart 

/**
 * @swagger
 * paths:
 *   /updateAppartement/{appartementId}:
 *     put:
 *       summary: Mettre à jour un appartement par son ID
 *       tags:
 *         - Appartement
 *       parameters:
 *         - in: path
 *           name: appartementId
 *           required: true
 *           description: ID de l'appartement à mettre à jour
 *           schema:
 *             type: string
 *       requestBody:
 *         description: Données de mise à jour de l'appartement
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Nouveau statut de l'appartement
 *       responses:
 *         200:
 *           description: Succès - Appartement mis à jour avec succès
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageS:
 *                     type: string
 *                     description: Message de succès
 *         404:
 *           description: Appartement non trouvé
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageE:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 */

// delete appart 
/**
 * @swagger
 * paths:
 *   /removeAppartement/{appartementId}:
 *     delete:
 *       summary: Supprimer un appartement par son ID
 *       tags:
 *         - Appartement
 *       parameters:
 *         - in: path
 *           name: appartementId
 *           required: true
 *           description: ID de l'appartement à supprimer
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Succès - Appartement supprimé avec succès
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageS:
 *                     type: string
 *                     description: Message de succès
 *         404:
 *           description: Appartement non trouvé
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageE:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 */
// pour l'afichege du paiement 
/**
 * @swagger
 * paths:
 *   /AllPayments:
 *     get:
 *       summary: Obtenir tous les paiements
 *       tags:
 *         - Paiements
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Succès - Récupère tous les paiements
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   paidPayments:
 *                     type: array
 *                     description: Liste des paiements payés
 *                     items:
 *                       $ref: '#/components/schemas/Paiement'
 *                   pendingPayments:
 *                     type: array
 *                     description: Liste des paiements en attente
 *                     items:
 *                       $ref: '#/components/schemas/Paiement'
 *         401:
 *           description: Non autorisé - Authentification requise
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 * 
 * components:
 *   schemas:
 *     Paiement:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID du paiement
 *         status:
 *           type: string
 *           description: Statut du paiement (Paid ou Pending)
 *         appartement:
 *           $ref: '#/components/schemas/Appartement'
 *     Appartement:
 *       type: object
 *       properties:
 *         floor_number:
 *           type: number
 *           description: Numéro de l'étage de l'appartement
 *         door_number:
 *           type: number
 *           description: Numéro de la porte de l'appartement
 *         tenant:
 *           $ref: '#/components/schemas/Tenant'
 *     Tenant:
 *       type: object
 *       properties:
 *         full_name:
 *           type: string
 *           description: Nom complet du locataire
 *         phone:
 *           type: string
 *           description: Numéro de téléphone du locataire
 */

// pour la creation du paiement
/**
 * @swagger
 * paths:
 *   /AddPayment:
 *     put:
 *       summary: Ajouter un paiement
 *       tags:
 *         - Paiements
 *       requestBody:
 *         description: Informations sur le paiement à ajouter
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: number
 *                   description: Montant du paiement
 *                 paiement_id:
 *                   type: string
 *                   description: ID du paiement à mettre à jour
 *       responses:
 *         200:
 *           description: Succès - Paiement ajouté avec succès
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageS:
 *                     type: string
 *                     description: Message de succès
 *         404:
 *           description: Paiement non trouvé
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageE:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 */
// pour l'affichege du locataire 'tenant'
/**
 * @swagger
 * paths:
 *   /getAllTenants:
 *     get:
 *       summary: Obtenir tous les locataires
 *       tags:
 *         - Locataires
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Succès - Récupère tous les locataires
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Tenant'
 *         401:
 *           description: Non autorisé - Authentification requise
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 * 
 * components:
 *   schemas:
 *     Tenant:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID du locataire
 *         full_name:
 *           type: string
 *           description: Nom complet du locataire
 *         phone:
 *           type: string
 *           description: Numéro de téléphone du locataire
 */
// pour la creation du tenant
/**
 * @swagger
 * paths:
 *   /addTenant:
 *     post:
 *       summary: Ajouter un locataire
 *       tags:
 *         - Locataires
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         description: Informations sur le locataire à ajouter
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 full_name:
 *                   type: string
 *                   description: Nom complet du locataire
 *                 cin:
 *                   type: string
 *                   description: Numéro de carte d'identité nationale du locataire
 *                 phone:
 *                   type: string
 *                   description: Numéro de téléphone du locataire
 *       responses:
 *         200:
 *           description: Succès - Locataire ajouté avec succès
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageS:
 *                     type: string
 *                     description: Message de succès
 *         401:
 *           description: Non autorisé - Authentification requise
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 */
// pour l'affichege du tenant par id 
/**
 * @swagger
 * paths:
 *   /getTenantById/{tenantId}:
 *     get:
 *       summary: Obtenir un locataire par ID
 *       tags:
 *         - Locataires
 *       parameters:
 *         - in: path
 *           name: tenantId
 *           required: true
 *           description: ID du locataire à récupérer
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Succès - Récupère le locataire par ID
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Tenant'
 *         404:
 *           description: Non trouvé - Locataire non trouvé
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 */
// pour update tenant 
/**
 * @swagger
 * paths:
 *   /updateTenant/{tenantId}:
 *     put:
 *       summary: Mettre à jour un locataire
 *       tags:
 *         - Locataires
 *       parameters:
 *         - in: path
 *           name: tenantId
 *           required: true
 *           description: ID du locataire à mettre à jour
 *           schema:
 *             type: string
 *       requestBody:
 *         description: Informations de mise à jour du locataire
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 full_name:
 *                   type: string
 *                   description: Nouveau nom complet du locataire
 *                 cin:
 *                   type: string
 *                   description: Nouveau numéro de carte d'identité nationale du locataire
 *                 phone:
 *                   type: string
 *                   description: Nouveau numéro de téléphone du locataire
 *       responses:
 *         200:
 *           description: Succès - Locataire mis à jour avec succès
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageS:
 *                     type: string
 *                     description: Message de succès
 *         404:
 *           description: Non trouvé - Locataire non trouvé
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageE:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 */
// pour la supression du tenant
/**
 * @swagger
 * paths:
 *   /deleteTenant/{tenantId}:
 *     delete:
 *       summary: Supprimer un locataire
 *       tags:
 *         - Locataires
 *       parameters:
 *         - in: path
 *           name: tenantId
 *           required: true
 *           description: ID du locataire à supprimer
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Succès - Locataire supprimé avec succès
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageS:
 *                     type: string
 *                     description: Message de succès
 *         404:
 *           description: Non trouvé - Locataire non trouvé
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   messageE:
 *                     type: string
 *                     description: Message d'erreur
 *         500:
 *           description: Erreur interne du serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur du serveur
 */

