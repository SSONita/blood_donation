module.exports = (sequelize, DataTypes) => {
  return sequelize.define('inventory', {
    inventory_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 },
    },
    status: {
      type: DataTypes.ENUM('Safe', 'Low', 'Critical Need'),
      allowNull: false,
      defaultValue: 'Critical Need',
    },
    type_id: {
      type: DataTypes.INTEGER,
      references: { model: 'blood_type', key: 'type_id' },
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    center_id: {
      type: DataTypes.INTEGER,
      references: { model: 'donation_center', key: 'center_id' },
    },
  }, {
    tableName: 'inventory',
    timestamps: false,
  });
};
