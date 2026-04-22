import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import FormPage from './pages/FormPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

/**
 * App Component
 * Main entry point with React Router and Protected Routes
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-700 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/add" 
              element={
                <ProtectedRoute>
                  <FormPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit/:id" 
              element={
                <ProtectedRoute>
                  <FormPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        
        <footer className="py-10 text-center text-gray-400 text-sm border-t border-gray-50 mt-auto">
          &copy; {new Date().getFullYear()} Student Management System. Built with React & Tailwind.
        </footer>
      </div>
    </Router>
  );
}

export default App;
