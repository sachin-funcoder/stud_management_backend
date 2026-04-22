/**
 * Student Routes
 * Defines API endpoints and maps them to controllers
 */
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { protect } = require('../middlewares/auth.middleware');

// Protect all routes after this middleware
router.use(protect);

/**
 * @route   POST /api/students
 * @desc    Create a new student
 */
router.post('/', studentController.createStudent);

/**
 * @route   GET /api/students
 * @desc    Get all students (with pagination, search, sort)
 */
router.get('/', studentController.getAllStudents);

/**
 * @route   GET /api/students/:id
 * @desc    Get student by ID
 */
router.get('/:id', studentController.getStudentById);

/**
 * @route   PUT /api/students/:id
 * @desc    Update student by ID
 */
router.put('/:id', studentController.updateStudent);

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete student by ID
 */
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
