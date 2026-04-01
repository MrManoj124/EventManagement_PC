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
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
