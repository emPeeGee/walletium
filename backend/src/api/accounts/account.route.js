const express = require('express');
const router = express.Router();

const accountController = require('./account.controller');

const verifyToken = require('../../middleware/auth.middleware').verifyToken;

router.post('/create', verifyToken, accountController.create);

router.get('/getAllByUser/:userId', verifyToken, accountController.getAllByUser);
router.get('/getOne/:accountId', verifyToken, accountController.getOne);

router.delete('/deleteOne/:accountId', verifyToken, accountController.deleteOne);
router.delete('/deleteAllByUser/:userId', verifyToken, accountController.deleteAllByUser);

router.put('/update/:userId/:accountId', verifyToken, accountController.update);

module.exports = router;
