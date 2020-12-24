const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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

module.exports = mongoose.model('Category', categorySchema);
