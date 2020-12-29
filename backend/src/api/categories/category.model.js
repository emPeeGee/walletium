const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  imagePath: {
    type: String,
    required: true
  }
  //   subCategories: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Subcategory'
  //   }
});

categorySchema.plugin(uniqueValidator, {
  message: '{PATH} Already in use'
});

module.exports = mongoose.model('Category', categorySchema);
