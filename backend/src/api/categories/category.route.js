const express = require('express');
const multer = require('multer');
const router = express.Router();

const categoryController = require('./category.controller');

const { verifyToken, isAdmin } = require('../../middleware/auth.middleware');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid MIME TYPE');
    console.log(file.mimetype);
    console.log(isValid);

    if (isValid) {
      callback(null, 'public/images');
    } else {
      callback(error, 'public/images');
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, `${name}-${Date.now()}.${ext}`);
  }
});

router.post(
  '/create',
  [multer({ storage: storage }).single('categoryImage'), verifyToken, isAdmin],
  categoryController.create
);

router.get('/getAll', [verifyToken, isAdmin], categoryController.getAll);
router.get('/getOne/:categoryId', [verifyToken, isAdmin], categoryController.getOne);

router.delete('/deleteOne/:categoryId', [verifyToken, isAdmin], categoryController.deleteOne);

router.put(
  '/update/:categoryId',
  [multer({ storage: storage }).single('categoryImage'), verifyToken, isAdmin],
  categoryController.update
);

module.exports = router;
