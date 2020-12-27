const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 200
    },
    phoneNumber: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }
  },
  {
    timestamps: true
  }
);

userSchema.methods.hashPassword = async password => {
  return await bcrypt.hashSync(password, 10);
};

userSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
  return await bcrypt.compare(inputtedPassword, hashedPassword);
};

userSchema.methods.generateJwtToken = async (payload, secret, expires) => {
  return jwt.sign(payload, secret, expires);
};

module.exports = mongoose.model('User', userSchema);

userSchema.plugin(uniqueValidator, {
  message: '{PATH} Already in use'
});
