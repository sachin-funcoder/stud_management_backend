/**
 * Auth Middleware
 * Protects routes by verifying JWT
 */
const jwt = require('jsonwebtoken');
const config = require('../config/app.config');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

/**
 * Protect routes
 */
const protect = async (req, res, next) => {
    let token;

    // 1. Check for token in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    // 2. If no token, return error
    if (!token) {
        return next(new ApiError(401, 'Not authorized to access this route'));
    }

    try {
        // 3. Verify token
        const decoded = jwt.verify(token, config.jwt.secret);

        // 4. Find user and attach to request
        req.user = await User.findById(decoded.id);
        
        if (!req.user) {
            return next(new ApiError(404, 'User no longer exists'));
        }

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next(new ApiError(401, 'Session expired, please log in again'));
        }
        return next(new ApiError(401, 'Invalid token, authorization failed'));
    }
};

/**
 * Grant access to specific roles
 */
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ApiError(
                    403,
                    `User role ${req.user.role} is not authorized to access this route`
                )
            );
        }
        next();
    };
};

module.exports = { protect, authorize };
