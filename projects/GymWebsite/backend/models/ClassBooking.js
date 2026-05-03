const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ClassBooking = sequelize.define('ClassBooking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  className: {
    type: DataTypes.STRING,
    allowNull: false
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Confirmed'
  },
  trainerId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  trainerName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  trainerSpecialty: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contactMessage: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'ClassBookings',
  timestamps: true
});

module.exports = ClassBooking;