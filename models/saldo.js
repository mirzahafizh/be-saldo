'use strict';
module.exports = (sequelize, DataTypes) => {
  const Saldo = sequelize.define('Saldo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    modelName: 'Saldo',
    tableName: 'saldo',
    timestamps: false
  });

  return Saldo;
};
