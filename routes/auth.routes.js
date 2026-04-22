/**
 * Auth Routes
 * Defines auth endpoints
 */
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

/**
 * @route   POST /api/auth/signup
 */
router.post('/signup', authController.register);

/**
 * @route   POST /api/auth/login
 */
router.post('/login', authController.login);

/**
 * @route   GET /api/auth/me
 */
router.get('/me', protect, authController.getMe);

module.exports = router;
