const PaiementModel = require('../models/payment.model');
const AppartementModel = require('../models/appartement.model');
const { body } = require('express-validator');

// Create: Ajouter un paiement
const addPaiement = async (req, res) => {

  try {
    console.log(req.body);
    const { amount, paiement_id, month, year } = req.body;
    const status = "Paid";

    // const newPayment = new PaiementModel({
    //   amount,
    //   appartement,
    //   month,
    //   year,
    // });
    const savedPayment = await PaiementModel.findOneAndUpdate(
      { _id: paiement_id }, 
      { amount, status, month, year },
      { new: true } 
    );
    
    if (savedPayment) {
      res.json({messageS : 'Paiement success'});
    }else{
      res.json({messageE : 'Faild Paiement'});

    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du paiement :', error);
    res.status(500).json({ error: error.message});
  }
};


// const getAllOccupiedAppartements = async (req, res) => {
//     try {
//       const appartements = await AppartementModel.find({
//         status : "Occupied",
//       });
//       return res.status(200).json(appartements);
//     } catch (error) {
//       console.error('Error getting all appartements:', error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   };

// Read: Récupérer tous les paiements
const getAllPayments = async (req, res) => {
  const userId = req.user._id;
  try {
    const payments = await PaiementModel.find({}).populate({
      path: 'appartement',
      match: { user: userId }, 
      select: ['floor_number', 'door_number', 'tenant'],
      populate: {
        path: 'tenant',
        select: ['full_name', 'phone'],
      },
    });
 
    // Separate payments based on their status
    const paidPayments = payments.filter(payment => payment.status === 'Paid');
    const pendingPayments = payments.filter(payment => payment.status === 'Pending');

    res.status(200).json({
      paidPayments,
      pendingPayments,
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des paiements :', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des paiements' });
  }
};


// Read: Récupérer un paiement par ID
const getPaymentById = async (req, res) => {
  try {
    const paiementId = req.params.id;
    const payment = await PaiementModel.findById(paiementId);
    if (!payment) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error('Erreur lors de la récupération du paiement par ID :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du paiement par ID' });
  }
};

// Update: Mettre à jour un paiement par ID
const updatePaymentById = async (req, res) => {
  try {
    const paiementId = req.params.id;
    const { amount, status, appartement, month, year } = req.body;
    const updatedPayment = await PaiementModel.findByIdAndUpdate(
      paiementId,
      { amount, status, appartement, month, year },
      { new: true } // Pour renvoyer le document mis à jour
    );
    if (!updatedPayment) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }
    res.status(200).json(updatedPayment);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du paiement par ID :', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du paiement par ID' });
  }
};

// Delete: Supprimer un paiement par ID
const deletePaymentById = async (req, res) => {
  try {
    const paiementId = req.params.id;
    const deletedPayment = await PaiementModel.findByIdAndDelete(paiementId);
    if (!deletedPayment) {
      return res.status(404).json({ error: 'Paiement non trouvé' });
    }
    res.status(204).end(); // Aucun contenu à renvoyer après la suppression
  } catch (error) {
    console.error('Erreur lors de la suppression du paiement par ID :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du paiement par ID' });
  }
};

module.exports = {
  addPaiement,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
