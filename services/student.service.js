/**
 * Student Service
 * Handles business logic and database interactions
 */
const Student = require('../models/student.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a new student
 */
const createStudent = async (studentData) => {
    return await Student.create(studentData);
};

/**
 * Get all students with pagination, search, and sorting
 */
const getAllStudents = async (query) => {
    const { page = 1, limit = 10, search, sortBy = 'createdAt', order = 'desc' } = query;

    // Build filter object for search
    const filter = {};
    if (search) {
        filter.name = { $regex: search, $options: 'i' }; // Case-insensitive partial match
    }

    const skip = (page - 1) * limit;

    // Execute query
    const students = await Student.find(filter)
        .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Student.countDocuments(filter);

    return {
        students,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit),
        }
    };
};

/**
 * Get student by ID
 */
const getStudentById = async (id) => {
    const student = await Student.findById(id);
    if (!student) {
        throw new ApiError(404, 'Student not found');
    }
    return student;
};

/**
 * Update student by ID
 */
const updateStudent = async (id, updateData) => {
    const student = await Student.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validations on update
    });
    
    if (!student) {
        throw new ApiError(404, 'Student not found');
    }
    return student;
};

/**
 * Delete student by ID
 */
const deleteStudent = async (id) => {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
        throw new ApiError(404, 'Student not found');
    }
    return student;
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};
