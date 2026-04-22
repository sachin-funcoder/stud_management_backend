import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../services/studentService';
import StudentTable from '../components/StudentTable';
import Button from '../components/Button';

/**
 * Dashboard Page
 * Integrated with real Backend API
 */
const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Load students on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (query = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await studentService.getStudents(query);
      // The backend returns { success: true, data: [...], pagination: {...} }
      setStudents(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch students. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search (simple implementation)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents({ search: searchQuery });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      try {
        // Optimistic UI Update: Remove from local state immediately
        const previousStudents = [...students];
        setStudents(students.filter(s => s._id !== id)); // Backend uses _id

        await studentService.deleteStudent(id);
      } catch (err) {
        alert('Delete failed: ' + err.message);
        fetchStudents(); // Rollback/Refresh if failed
      }
    }
  };

  const handleEdit = (student) => {
    navigate(`/edit/${student._id}`, { state: { student } });
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Student Directory</h1>
          <p className="text-gray-500 mt-1">Manage and monitor all student registrations.</p>
        </div>
        <Button onClick={() => navigate('/add')} className="h-12 px-6">
          <Plus size={20} />
          Register Student
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <p className="font-medium">{error}</p>
          <button 
            onClick={() => fetchStudents()} 
            className="ml-auto underline text-sm font-bold"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats Overview (Static for now, could be dynamic) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-medium text-gray-500 uppercase">Total Students</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{loading && students.length === 0 ? '...' : students.length}</p>
        </div>
        {/* Other stats... */}
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
          />
        </div>
        <Button variant="secondary" onClick={() => fetchStudents()} className="px-4">
          <Filter size={20} />
        </Button>
      </div>

      {/* Data Table */}
      <StudentTable 
        students={students} 
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  );
};

export default Dashboard;
