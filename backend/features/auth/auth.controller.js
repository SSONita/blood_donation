const db = require('../../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.User;

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_num, blood_type_id, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ first_name, last_name, email, phone_num, blood_type_id, password: hashed });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    return res.status(500).json({ message: err.message });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({
      token,
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        blood_type_id: user.blood_type_id
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
