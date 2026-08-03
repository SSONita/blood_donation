module.exports = (sequelize, DataTypes) => {
  return sequelize.define('donation', {
    donation_id: {
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
    past_donation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    medical_condition: {
      type: DataTypes.TEXT,
    },
    medications: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      defaultValue: 'Pending',
    },
    type_id: {
      type: DataTypes.INTEGER,
      references: { model: 'blood_type', key: 'type_id' },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: 'user', key: 'user_id' },
    },
    center_id: {
      type: DataTypes.INTEGER,
      references: { model: 'donation_center', key: 'center_id' },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'donation',
    timestamps: false,
  });
};
