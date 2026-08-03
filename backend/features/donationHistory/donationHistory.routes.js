const express = require('express');
const router = express.Router();
const donationHistoryController = require('./donationHistory.controller');
const auth = require('../../shared/middleware/auth.middleware');

router.get('/user', auth, donationHistoryController.getUserHistory);

module.exports = router;
