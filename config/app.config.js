/**
 * Application Configuration
 * Centralized environment variable management
 */
require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwt: {
        secret: process.env.JWT_SECRET || 'secret',
        expire: process.env.JWT_EXPIRE || '7d',
    }
};

// Basic validation for required env variables
if (!config.mongoUri) {
    console.warn('WARNING: MONGO_URI is not defined in .env file');
}

module.exports = config;
