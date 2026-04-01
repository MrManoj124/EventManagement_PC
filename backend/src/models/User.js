const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  registration_number: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  profile_pic: { 
    type: DataTypes.STRING, 
    defaultValue: 'https://ui-avatars.com/api/?name=User&background=137fec&color=fff' 
  }
});

module.exports = User;
