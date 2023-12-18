const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tenant = new Schema({

  full_name : {
    type : String,
    required : true

  },

  cin : {
    type : String,
    required : true
  },

  phone: {
    type : String,
    required : true,
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 

  },


});

module.exports = mongoose.model('Tenant', Tenant);
