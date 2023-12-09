const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Roleschema = new Schema({
  role_name: {
    type: String,
    required: true,
    unique: true,
    
  }
});



module.exports = mongoose.model('Role', Roleschema);
