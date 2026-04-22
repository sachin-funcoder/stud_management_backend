/**
 * Auth Service
 * Handles registration, login, and token generation
 */
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/app.config');
const ApiError = require('../utils/ApiError');

/**
 * Generate JWT Token
 */
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt.secret, {
        expiresIn: config.jwt.expire,
    });
};

/**
 * Register a new user
 */
const register = async (userData) => {
    const { name, email, password } = userData;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError(400, 'User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    const token = generateToken(user._id);
    return { user, token };
};

/**
 * Login user
 */
const login = async (email, password) => {
    if (!email || !password) {
        throw new ApiError(400, 'Please provide email and password');
    }

    // Check for user (include password for comparison)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const token = generateToken(user._id);
    return { user, token };
};

module.exports = {
    register,
    login,
    generateToken,
};
