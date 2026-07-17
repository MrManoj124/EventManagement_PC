const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Venue = sequelize.define('Venue', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  venueName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Venue; 
