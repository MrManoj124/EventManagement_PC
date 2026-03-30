const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  venue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('Academic', 'Cultural', 'Sports', 'Workshop'),
    defaultValue: 'Academic'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Event;
