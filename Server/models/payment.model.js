const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Payment = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending'],
    default: 'Pending',
  },

  appartement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appartement', 
  },

});

module.exports = mongoose.model('Payment', Payment);
