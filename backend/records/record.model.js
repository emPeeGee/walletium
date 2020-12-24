const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  color: String,
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  labels: {
    type: [String],
    default: []
  },
  createdDate: {
    type: Date,
    required: true
  },
  updatedDate: {
    type: Date,
    required: true
  },
  payee: {
    type: String
  },
  note: {
    type: String
  },
  place: {
    type: String
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }
});

module.exports = mongoose.model('Record', recordSchema);
