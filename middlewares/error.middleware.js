/**
 * Global Error Handling Middleware
 * Catch-all for any errors thrown in the application
 */
const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    let error = err;

    // Convert non-ApiError instances to ApiError (e.g. Mongoose errors)
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
        const message = error.message || 'Internal Server Error';
        error = new ApiError(statusCode, message, false, err.stack);
    }

    const { statusCode, message } = error;

    // Standard JSON response for errors
    const response = {
        success: false,
        error: {
            status: statusCode,
            message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        }
    };

    // Log error for developers
    if (process.env.NODE_ENV === 'development') {
        console.error(`[ERROR] ${statusCode}: ${message}`);
    }

    res.status(statusCode).json(response);
};

module.exports = errorHandler;
