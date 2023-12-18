const Appartement = require('../models/appartement.model');
const PaiementModel = require('../models/payment.model');

const createAppartement = async (req, res) => {
  const user = req.user._id

  try {
    const { floor_number, door_number, status, tenant } = req.body;
    const newAppartement = new Appartement({
      floor_number,
      door_number,
      status,
      tenant,
      user,
    });

    console.log(newAppartement);

    const savedAppartement = await newAppartement.save();

    if (savedAppartement.status !== 'Vacant' ) {
      await PaiementModel.create({
        appartement: savedAppartement._id,
      });

      return res.json({
        message: "Appartement created with success",
        data: savedAppartement,
      });
    } else {
      return res.json({ message: "Failed to save appartement" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getAllAppartements = async (req, res) => {
  const user_id = req.user._id
  try {
    const appartements = await Appartement.find({
      user : user_id
    }).populate('tenant', ['full_name' , 'phone']);
    console.log(appartements);
    return res.status(200).json(appartements);
  } catch (error) {
    console.error('Error getting all appartements:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAppartementById = async (req, res) => {
  const { appartementId } = req.params;
  try {
    const appartement = await Appartement.findById(appartementId);
    if (!appartement) {
      return res.status(404).json({ error: 'Appartement not found' });
    }
    return res.status(200).json(appartement);
  } catch (error) {
    console.error('Error getting appartement by ID:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateAppartement = async (req, res) => {
  const { appartementId } = req.params;
  const updates = req.body;

  try {
    const updatedAppartement = await Appartement.findOneAndUpdate(
      { _id: appartementId },
      updates,
      { new: true }
    );

    if (!updatedAppartement) {
      return res.json({ messageE: 'Appartement not found' });
    }
    if(updatedAppartement.status === "Occupied"){

      await PaiementModel.create({
        appartement: updatedAppartement._id,
      });
    }

    return res.json({
      messageS : "Appartement updated succussfuly" 
    });
  } catch (error) {
    console.error('Error updating appartement:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteAppartement = async (req, res) => {
  const { appartementId } = req.params;
  try {
    const deletedAppartement = await Appartement.findByIdAndDelete(appartementId);

    if (!deletedAppartement) {
      return res.json({ messageE: 'Appartement not found' });
    }

    return res.json({

      messageS:"Appartement deleted successfuly",
    })
  } catch (error) {
    console.error('Error deleting appartement:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createAppartement,
  getAllAppartements,
  getAppartementById,
  updateAppartement,
  deleteAppartement,
};
