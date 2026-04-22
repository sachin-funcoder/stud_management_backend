/**
 * Student Controller
 * Handles request/response and calls services
 */
const studentService = require('../services/student.service');

// Utility to catch async errors and pass them to the global error handler
const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Create a new student
 */
exports.createStudent = catchAsync(async (req, res) => {
    const student = await studentService.createStudent(req.body);
    res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: student,
    });
});

/**
 * Get all students
 */
exports.getAllStudents = catchAsync(async (req, res) => {
    const result = await studentService.getAllStudents(req.query);
    res.status(200).json({
        success: true,
        data: result.students,
        pagination: result.pagination,
    });
});

/**
 * Get student by ID
 */
exports.getStudentById = catchAsync(async (req, res) => {
    const student = await studentService.getStudentById(req.params.id);
    res.status(200).json({
        success: true,
        data: student,
    });
});

/**
 * Update student
 */
exports.updateStudent = catchAsync(async (req, res) => {
    const student = await studentService.updateStudent(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: 'Student updated successfully',
        data: student,
    });
});

/**
 * Delete student
 */
exports.deleteStudent = catchAsync(async (req, res) => {
    await studentService.deleteStudent(req.params.id);
    res.status(200).json({
        success: true,
        message: 'Student deleted successfully',
    });
});
