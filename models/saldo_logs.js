'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaldoLog = sequelize.define('SaldoLog', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tipe: {
      type: DataTypes.ENUM('tambah', 'kurang'),
      allowNull: false
    },
    jumlah: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    modelName: 'SaldoLog', // ✅ ini penting untuk models/index.js
    tableName: 'saldo_logs',
    timestamps: false
  });

  return SaldoLog;
};
