/**
 * Auth Controller
 * Handles auth requests
 */
const authService = require('../services/auth.service');

// Utility to catch async errors
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Register user
 */
exports.register = catchAsync(async (req, res) => {
    const { user, token } = await authService.register(req.body);
    
    // Remove password from response
    const userData = user.toObject();
    delete userData.password;

    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            user: userData,
            token,
        },
    });
});

/**
 * Login user
 */
exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    const userData = user.toObject();
    delete userData.password;

    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
            user: userData,
            token,
        },
    });
});

/**
 * Get current user profile
 */
exports.getMe = catchAsync(async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
});
