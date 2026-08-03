const db = require('../../db');
const Request = db.Request;

exports.createRequest = async (req, res) => {
  try {
    const { dob, gender, unit_needed, urgency_level, hospital_name, date_needed, type_id } = req.body;
    if (!dob || !gender || !unit_needed || !urgency_level || !hospital_name || !date_needed || !type_id) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const request = await Request.create({
      dob, gender, unit_needed, urgency_level, hospital_name, date_needed, type_id, user_id: req.user.user_id
    });

    return res.status(201).json({ message: 'Blood request submitted', request });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getUserRequests = async (req, res) => {
  try {
    const requests = await Request.findAll({ where: { user_id: req.user.user_id } });
    return res.json(requests);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
