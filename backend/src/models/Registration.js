const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Registration = sequelize.define('Registration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  },
  batch: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventCategory: {
    type: DataTypes.STRING,
    defaultValue: 'Event'
  },
  eventDate: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  eventTime: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  eventVenue: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
});

module.exports = Registration; 
