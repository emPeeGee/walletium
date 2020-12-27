const express = require('express');
const router = express.Router();

const subCategoryController = require('./subcategory.controller');

const { verifyToken, isAdmin } = require('../../middleware/auth.middleware').verifyToken;

router.post('/create', [verifyToken, isAdmin], subCategoryController.create);

router.get('/getOne/:subCategoryId', [verifyToken, isAdmin], subCategoryController.getOne);

router.delete('/deleteOne/:subCategoryId', [verifyToken, isAdmin], subCategoryController.deleteOne);

router.put('/update/:subCategoryId', [verifyToken, isAdmin], subCategoryController.update);

module.exports = router;
