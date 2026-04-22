import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { studentService } from '../services/studentService';
import StudentForm from '../components/StudentForm';

/**
 * FormPage Component
 * Integrated with real Backend API for POST and PUT
 */
const FormPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const studentToEdit = state?.student || null;

  const handleSubmit = async (formData) => {
    try {
      if (studentToEdit) {
        await studentService.updateStudent(id, formData);
        alert('Student record updated successfully!');
      } else {
        await studentService.addStudent(formData);
        alert('Student registered successfully!');
      }
      navigate('/dashboard');
    } catch (err) {
      alert('Operation failed: ' + err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <StudentForm 
        initialData={studentToEdit} 
        onSubmit={handleSubmit}
        onCancel={() => navigate('/dashboard')}
      />
    </div>
  );
};

export default FormPage;
