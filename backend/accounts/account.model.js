const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  color: String,
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Account', accountSchema);
