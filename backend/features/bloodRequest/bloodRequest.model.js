module.exports = (sequelize, DataTypes) => {
  return sequelize.define('request', {
    request_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: false,
    },
    unit_needed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    urgency_level: {
      type: DataTypes.ENUM('Emergency', 'Within 24h', 'Within 3 days', 'Not Urgent'),
      allowNull: false,
    },
    hospital_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    date_needed: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type_id: {
      type: DataTypes.INTEGER,
      references: { model: 'blood_type', key: 'type_id' },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: 'user', key: 'user_id' },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'request',
    timestamps: false,
  });
};
