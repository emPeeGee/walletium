const fs = require('fs');
const { promisify } = require('util');
const Category = require('./category.model');

const unlinkAsync = promisify(fs.unlink);

exports.create = async (req, res) => {
  try {
    const url = `${req.protocol}://${req.get('host')}`;
    let category = new Category({
      name: req.body.name,
      imagePath: `${url}/images/categories/${req.file.filename}`
    });

    try {
      let createdCategory = await category.save();
      res.status(200).json({
        message: 'New category created',
        data: createdCategory
      });
    } catch (errors) {
      console.log(errors);
      res.status(400).json({
        type: 'Bad Request',
        message: 'Some error | Maybe such category already exists'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: 'Not Found',
      message: 'Internal server error'
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    let { categoryId } = req.params;
    let category = await Category.findOne({
      _id: categoryId
    });

    if (!category) {
      res.status(500).json({
        type: 'Not Found',
        message: 'Such category does not exist'
      });
    }

    res.status(200).json({
      message: 'Category is successfully fetched',
      data: category
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: 'Internal error',
      message: 'Internal server error'
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    let categories = await Category.find();
    res.status(200).json({
      message: 'Categories are successfully fetched',
      data: categories
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: 'Internal error',
      message: 'Internal server error'
    });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    let { categoryId } = req.params;
    console.log(categoryId);
    let category = await Category.findOne({
      _id: categoryId
    });

    if (!category) {
      res.status(500).json({
        type: 'Not Found',
        message: 'Such category does not exist'
      });
    }
    const imageName = category.imagePath.split('/').pop();

    let deletedCategory = await Category.deleteOne({
      _id: categoryId
    });

    await unlinkAsync(`public/images/categories/${imageName}`);

    res.status(200).json({
      message: 'Requested category was deleted',
      data: deletedCategory
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: 'Internal error',
      message: 'Internal server error'
    });
  }
};

exports.update = async (req, res) => {
  try {
    let oldImagePath = '';
    let imagePath = req.body.imagePath;
    if (req.file) {
      oldImagePath = imagePath.split('/').pop();

      const url = `${req.protocol}://${req.get('host')}`;
      imagePath = `${url}/images/categories/${req.file.filename}`;
    }

    const { categoryId } = req.params;
    const category = {
      _id: categoryId,
      name: req.body.name,
      imagePath: imagePath
    };

    const updatedCategory = await Category.findOneAndUpdate({ _id: categoryId }, category, { runValidators: true });

    if (oldImagePath) {
      await unlinkAsync(`public/images/categories/${oldImagePath}`);
    }

    res.status(200).json({
      message: 'Account was updated with success',
      data: updatedCategory
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: 'Internal error',
      message: 'Internal server error'
    });
  }
};
