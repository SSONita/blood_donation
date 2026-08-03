const express = require('express');
const router = express.Router();
const bloodRequestController = require('./bloodRequest.controller');
const auth = require('../../shared/middleware/auth.middleware');

router.post('/', auth, bloodRequestController.createRequest);
router.get('/user', auth, bloodRequestController.getUserRequests);

module.exports = router;
