/**
 * Main Server Entry Point
 * Initializes database and starts the server
 */
const app = require('./app');
const config = require('./config/app.config');
const { connectDB } = require('./config/db');

/**
 * Start the Student Management Backend
 */
const startServer = async () => {
    try {
        // 1. Connect to Database
        await connectDB();

        // 2. Start Listening
        const PORT = config.port;
        app.listen(PORT, () => {
            console.log(`✓ Server running in ${config.env} mode`);
            console.log(`✓ Access API at: http://localhost:${PORT}/api/students`);
            console.log(`✓ Press CTRL+C to stop\n`);
        });
    } catch (error) {
        console.error('✗ Server failed to start:', error.message);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`\n✗ Unhandled Rejection: ${err.message}`);
    // Close server & exit process
    process.exit(1);
});

startServer();
