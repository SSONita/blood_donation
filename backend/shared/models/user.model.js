module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    phone_num: {
      type: DataTypes.STRING(20),
    },
    blood_type_id: {
      type: DataTypes.INTEGER,
      references: { model: 'blood_type', key: 'type_id' },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'user',
    timestamps: false,
  });
};
