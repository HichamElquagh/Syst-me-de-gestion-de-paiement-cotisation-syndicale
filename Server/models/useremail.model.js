const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usermail = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
  name: {
    type: String,
    required: true,
    unique: true,
    
  }
});



module.exports = mongoose.model('email', Usermail);
