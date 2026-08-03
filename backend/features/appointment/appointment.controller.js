const db = require('../../db');
const Donation = db.Donation;

exports.bookDonation = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Authenticated user:', req.user);

    const { dob, gender, past_donation, medical_condition, medications, date, time, type_id, center_id } = req.body;
    if (!dob || !gender || !date || !time || !type_id || !center_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const donation = await Donation.create({
      dob, gender, past_donation, medical_condition, medications, date, time, type_id, center_id, user_id: req.user.user_id
    });

    return res.status(201).json({ message: 'Donation appointment booked', donation });
  } catch (err) {
    console.error('Error booking donation:', err);
    return res.status(500).json({ message: err.message });
  }
};


exports.getUserAppointments = async (req, res) => {
  try {
    const donations = await Donation.findAll({ where: { user_id: req.user.user_id } });
    return res.json(donations);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
