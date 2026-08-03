const express = require('express');
const router = express.Router();
const appointmentController = require('./appointment.controller');
const auth = require('../../shared/middleware/auth.middleware');

router.post('/', auth, appointmentController.bookDonation);
router.get('/user', auth, appointmentController.getUserAppointments);

module.exports = router;
