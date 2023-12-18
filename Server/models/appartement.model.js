const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appartement = new Schema({

  floor_number: {
    type: Number,
    required: true,
    unique: true,
  },
  door_number: {
    type: Number,
    required: true,
    unique: true,
    
  },
  status: {
    type: String,
    enum: ['Occupied', 'Vacant'],
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant', 

  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 

  },

  
});



module.exports = mongoose.model('Appartement', Appartement);
