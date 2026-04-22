/**
 * Student Model
 * Defines the MongoDB schema for students using Mongoose
 */
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Student name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters long'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [1, 'Age must be at least 1'],
            max: [100, 'Age cannot exceed 100'],
        },
        course: {
            type: String,
            required: [true, 'Course is required'],
            trim: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        versionKey: false, // Hides the __v version field in JSON output
    }
);

// Add index for search performance on name
studentSchema.index({ name: 'text' });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
