const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
// Create the Sequelize instance for XAMPP MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME || 'unievents_db', // Ensure this matches your XAMPP DB name
  process.env.DB_USER || 'root',          // XAMPP default is 'root'
  process.env.DB_PASSWORD || '',          // XAMPP default is empty ''
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Set to console.log if you want to see the SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }

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
    // Test the connection
    await sequelize.authenticate();
    console.log('✅ XAMPP MySQL Database Connected Successfully.');
    
    /**
     * sequelize.sync({ alter: true }) 
     * This automatically creates/updates your tables in XAMPP 
     * based on the models we will define in the 'models' folder.
     */
    await sequelize.sync({ alter: true }); 
    console.log('✅ SQL tables synchronized with XAMPP.');
  } catch (error) {
    console.error('❌ Unable to connect to the XAMPP MySQL database:', error);
    // Suggesting a common fix for XAMPP users
    console.log('💡 Tip: Ensure Apache and MySQL are started in your XAMPP Control Panel.');
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
