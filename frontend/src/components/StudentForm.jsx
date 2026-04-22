import React, { useState, useEffect } from 'react';
import { User, BookOpen, Hash, Save, X } from 'lucide-react';
import Button from './Button';

/**
 * StudentForm Component
 * Uses useState for form management and validation
 */
const StudentForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    course: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        age: initialData.age,
        course: initialData.course
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    else if (formData.name.length < 2) newErrors.name = "Name must be at least 2 chars";

    if (!formData.age) newErrors.age = "Age is required";
    else if (formData.age < 1 || formData.age > 100) newErrors.age = "Age must be between 1-100";

    if (!formData.course.trim()) newErrors.course = "Course is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? (value === '' ? '' : parseInt(value)) : value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {initialData ? 'Edit Student Details' : 'Register New Student'}
        </h2>
        <p className="text-gray-500 mt-1">Please provide accurate information for the records.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <User size={16} className="text-blue-500" />
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
              errors.name ? 'border-red-100 bg-red-50 focus:border-red-300' : 'border-gray-100 focus:border-blue-500 bg-gray-50/50'
            }`}
            placeholder="e.g. John Doe"
          />
          {errors.name && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Field */}
          <div>
            <label htmlFor="age" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Hash size={16} className="text-blue-500" />
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none ${
                errors.age ? 'border-red-100 bg-red-50 focus:border-red-300' : 'border-gray-100 focus:border-blue-500 bg-gray-50/50'
              }`}
              placeholder="20"
            />
            {errors.age && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.age}</p>}
          </div>

          {/* Course Field */}
          <div>
            <label htmlFor="course" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <BookOpen size={16} className="text-blue-500" />
              Course
            </label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none appearance-none ${
                errors.course ? 'border-red-100 bg-red-50 focus:border-red-300' : 'border-gray-100 focus:border-blue-500 bg-gray-50/50'
              }`}
            >
              <option value="">Select a course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Other">Other</option>
            </select>
            {errors.course && <p className="mt-1.5 text-sm text-red-500 font-medium">{errors.course}</p>}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="submit" 
            loading={isSubmitting} 
            className="flex-1"
          >
            <Save size={18} />
            {initialData ? 'Update Record' : 'Save Student'}
          </Button>
          <Button 
            variant="secondary" 
            onClick={onCancel}
            className="flex-1"
          >
            <X size={18} />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
