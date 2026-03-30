const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Create a connection instance
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Username (usually 'root')
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',      // Change to 'postgres' if using PostgreSQL
    logging: false,        // Keeps the console clean
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQL Database Connected Successfully.');
    
    // Sync models to database (creates tables automatically)
    await sequelize.sync({ alter: true }); 
    console.log('✅ All SQL tables synchronized.');
  } catch (error) {
    console.error('❌ Unable to connect to the SQL database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
