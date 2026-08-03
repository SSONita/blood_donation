module.exports = (sequelize, DataTypes) => {
  return sequelize.define('history', {
    history_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    action_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { isIn: [['Donation', 'Request']] },
    },
    volume: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    status: {
      type: DataTypes.ENUM('Completed', 'Deffered'),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: 'user', key: 'user_id' },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    donation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    request_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'history',
    timestamps: false,
  });
};
