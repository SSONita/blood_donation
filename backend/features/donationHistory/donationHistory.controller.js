const db = require('../../db');
const History = db.History;

// Ensure user is authenticated before accessing this route
exports.getUserHistory = async (req, res) => {
  try {
    const history = await History.findAll({ where: { user_id: req.user.user_id } });
    return res.json(history);
  } catch (err) {
    console.error('Error fetching user history:', err);
    return res.status(500).json({ message: err.message });
  }
};

