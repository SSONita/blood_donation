const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? { require: true, rejectUnauthorized: false } : false
  },
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Shared/reference models (used across multiple features)
db.BloodType = require('../shared/models/bloodType.model')(sequelize, DataTypes);
db.DonationCenter = require('../shared/models/donationCenter.model')(sequelize, DataTypes);
db.User = require('../shared/models/user.model')(sequelize, DataTypes);

// Feature-owned models
db.Inventory = require('../features/bloodInventory/bloodInventory.model')(sequelize, DataTypes);
db.Donation = require('../features/appointment/appointment.model')(sequelize, DataTypes);
db.Request = require('../features/bloodRequest/bloodRequest.model')(sequelize, DataTypes);
db.History = require('../features/donationHistory/donationHistory.model')(sequelize, DataTypes);

// Associations
// User - BloodType
db.User.belongsTo(db.BloodType, { foreignKey: 'blood_type_id' });
db.BloodType.hasMany(db.User, { foreignKey: 'blood_type_id' });
// Inventory - BloodType, DonationCenter
db.Inventory.belongsTo(db.BloodType, { foreignKey: 'type_id' });
db.BloodType.hasMany(db.Inventory, { foreignKey: 'type_id' });
db.Inventory.belongsTo(db.DonationCenter, { foreignKey: 'center_id' });
db.DonationCenter.hasMany(db.Inventory, { foreignKey: 'center_id' });
// Donation - User, BloodType, DonationCenter
db.Donation.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasMany(db.Donation, { foreignKey: 'user_id' });
db.Donation.belongsTo(db.BloodType, { foreignKey: 'type_id' });
db.BloodType.hasMany(db.Donation, { foreignKey: 'type_id' });
db.Donation.belongsTo(db.DonationCenter, { foreignKey: 'center_id' });
db.DonationCenter.hasMany(db.Donation, { foreignKey: 'center_id' });
// Request - User, BloodType
db.Request.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasMany(db.Request, { foreignKey: 'user_id' });
db.Request.belongsTo(db.BloodType, { foreignKey: 'type_id' });
db.BloodType.hasMany(db.Request, { foreignKey: 'type_id' });
// History - User
db.History.belongsTo(db.User, { foreignKey: 'user_id' });
db.User.hasMany(db.History, { foreignKey: 'user_id' });

// History - Donation
db.History.belongsTo(db.Donation, { foreignKey: 'donation_id' });
db.Donation.hasMany(db.History, { foreignKey: 'donation_id' });

// History - Request
db.History.belongsTo(db.Request, { foreignKey: 'request_id' });
db.Request.hasMany(db.History, { foreignKey: 'request_id' });


module.exports = db;
