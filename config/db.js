/**
 * Database Connection Configuration
 * Handles MongoDB connection using Mongoose
 */
const mongoose = require('mongoose');
const config = require('./app.config');

/**
 * Connect to MongoDB Atlas
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.mongoUri);
        console.log(`\n✓ MongoDB Atlas Connection Successful`);
        console.log(`✓ Connected to Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`\n✗ MongoDB Connection Error: ${error.message}`);
        // Exit process with failure if connection fails
        process.exit(1);
    }
};

/**
 * Disconnect from MongoDB
 */
const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('✓ MongoDB Disconnected Successfully');
    } catch (error) {
        console.error('✗ MongoDB Disconnection Error:', error.message);
    }
};

module.exports = { connectDB, disconnectDB };
