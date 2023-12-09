const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    required: true,
  },
  last_name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true, // Ensures uniqueness of email addresses
    // validate: {
    //   validator: function (v) {
    //     // Regular expression for basic email validation
    //     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    //   },
    //   message: 'Invalid email address',
    // },
  },
  // role : {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Role', // Référence au modèle de rôle
  //   required: true,

  // },

  password: {
    type: String,
    required: true,
  },

  isverified : {
    type : Boolean,
    default : false,
    required: true,
  }
});

// hash user password before saving into database

// UserSchema.pre('save', async function(next) {
//   try {
//     const hashedPassword = await bcrypt.hash(this.password, saltRounds);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });
module.exports = mongoose.model('User', UserSchema);