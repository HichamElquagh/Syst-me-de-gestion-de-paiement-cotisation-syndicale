const { body, validationResult } = require('express-validator');


const validateAppartementData = [
    body('floor_number').notEmpty().withMessage('floor_number est requis'),
    body('door_number').notEmpty().withMessage('door_number est requis'),
    body('status').notEmpty().withMessage('ce champs est requis choisi vous entre occuped or Vacent'),
    body('tenant').notEmpty().withMessage('tenant est requis'),


    async (req, res, next) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.json({ messageE: errors.array()[0].msg });
      }
      next();
    }
  ];



  module.exports = {
    validateAppartementData,
}  