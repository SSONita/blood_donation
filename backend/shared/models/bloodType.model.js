module.exports = (sequelize, DataTypes) => {
  return sequelize.define('blood_type', {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    blood_type: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false,
    },
  }, {
    tableName: 'blood_type',
    timestamps: false,
  });
}; 