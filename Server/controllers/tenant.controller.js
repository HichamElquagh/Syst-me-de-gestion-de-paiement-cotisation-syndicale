const Tenant = require('../models/tenant.model');


const addTenant = async (req, res) => {
  const user = req.user._id
  try {
    const { full_name, cin, phone } = req.body;
    const newTenant = new Tenant({
      full_name,
      cin,
      phone,
      user,
    });
    console.log(newTenant);

    const savedTenant = await newTenant.save();

    if (savedTenant) {
      return res.json({
        messageS: "Tenant created successfully",
      });
    } else {
      return res.json({ messageE: "Failed tenant registration" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getAllTenants = async (req, res) => {
  const user_id = req.user._id
  try {
    const tenants = await Tenant.find({
      user : user_id
    });
    return res.status(200).json(tenants);
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les locataires :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

const getTenantById = async (req, res) => {
  const { tenantId } = req.params;
  try {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Locataire non trouvé' });
    }
    return res.status(200).json(tenant);
  } catch (error) {
    console.error('Erreur lors de la récupération du locataire par ID :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

const updateTenant = async (req, res) => {
  const { tenantId } = req.params;
  const updates = req.body;

  try {
    const updatedTenant = await Tenant.findOneAndUpdate(
      { _id: tenantId },
      updates,
      { new: true }
    );

    if (!updatedTenant) {
      return res.json({ messageE: 'Teant not Found' });
    }

    return res.json({
      messageS: "Tenant Updated succussfully",
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du locataire :', error);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

const deleteTenant = async (req, res) => {
  const { tenantId } = req.params;
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(tenantId);

    if (!deletedTenant) {
      return res.json({ messageE: 'Teant not Found' });
    }

    return res.json({
      messageS: "Tenant Deleted succussfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
    addTenant,
  getAllTenants,
  getTenantById,
  updateTenant,
  deleteTenant,
};
