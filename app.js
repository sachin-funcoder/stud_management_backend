/**
 * Express Application Setup
 * Configures middlewares and routes
 */
const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger.middleware');
const errorHandler = require('./middlewares/error.middleware');
const notFound = require('./middlewares/notfound.middleware');
const studentRoutes = require('./routes/student.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// --- Middlewares ---
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(logger); // Log every request

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// --- Home Route ---
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the Student Management System API',
        endpoints: {
            students: '/api/students'
        }
    });
});

// --- Error Handling ---
app.use(notFound); // Handle 404
app.use(errorHandler); // Global error handler

module.exports = app;
