/**
 * Not Found Middleware
 * Handles requests to undefined routes (404)
 */
const ApiError = require('../utils/ApiError');

const notFound = (req, res, next) => {
    next(new ApiError(404, `Route not found - ${req.originalUrl}`));
};

module.exports = notFound;
