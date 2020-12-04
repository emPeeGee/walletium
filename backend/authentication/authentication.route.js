const express = require('express');
const router = express.Router();
const authenticationController = require('./authentication.controller');

const verifyToken = require('../middleware/auth.middleware').verifyToken;
const isAdmin = require('../middleware/auth.middleware').isAdmin;

router.post('/signup', authenticationController.signUp);
router.post('/signin', authenticationController.signIn);
// router.get('/data', verifyToken, authenticationController.defineDummyData);
router.get('/data', [verifyToken, isAdmin], authenticationController.defineDummyData);

module.exports = router;