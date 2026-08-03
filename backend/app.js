require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const app = express();

// CORS config
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Feature routes
app.use('/api/auth', require('./features/auth/auth.routes'));
app.use('/api/appointments', require('./features/appointment/appointment.routes'));
app.use('/api/requests', require('./features/bloodRequest/bloodRequest.routes'));
app.use('/api/inventory', require('./features/bloodInventory/bloodInventory.routes'));
app.use('/api/history', require('./features/donationHistory/donationHistory.routes'));
app.use('/api/education', require('./features/education/educationResource.routes'));

// 404 handler for unmatched API routes
app.use('/api', (req, res) => res.status(404).json({ message: 'Not found' }));

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

// Sync database with error handling
(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  }
})();

module.exports = app;
