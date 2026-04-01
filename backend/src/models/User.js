const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  full_name: { type: DataTypes.STRING,允许Null: false },
  email: { type: DataTypes.STRING,允许Null: false, unique: true },
  registration_number: { type: DataTypes.STRING,允许Null: false },
  password: { type: DataTypes.STRING,允许Null: false },
  profile_pic: { 
    type: DataTypes.STRING, 
    defaultValue: 'https://ui-avatars.com/api/?name=User&background=137fec&color=fff' 
  }
});

module.exports = User;
