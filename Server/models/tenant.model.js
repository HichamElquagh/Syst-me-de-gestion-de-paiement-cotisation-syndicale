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
  }
   


});

module.exports = mongoose.model('Tenant', Tenant);
