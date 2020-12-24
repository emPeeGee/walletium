const express = require('express');
const router = express.Router();

const categoryController = require('./category.controller');

const { verifyToken, isAdmin } = require('../middleware/auth.middleware').verifyToken;

router.post('/create', [verifyToken, isAdmin], categoryController.create);

router.get('/getAll', [verifyToken, isAdmin], categoryController.getAll);
router.get('/getOne/:categoryId', [verifyToken, isAdmin], categoryController.getOne);

router.delete('/deleteOne/:categoryId', [verifyToken, isAdmin], categoryController.deleteOne);

router.put('/update/:categoryId', [verifyToken, isAdmin], categoryController.update);

module.exports = router;
