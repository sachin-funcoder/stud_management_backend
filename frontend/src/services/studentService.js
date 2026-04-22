/**
 * Student Service (Production)
 * Uses Fetch API with JWT Authorization
 */
import { authService } from './authService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Helper to handle fetch responses
 */
const handleResponse = async (response) => {
    // If unauthorized (401), auto-logout
    if (response.status === 401) {
        authService.logout();
        window.location.href = '/login';
    }

    const data = await response.json();
    if (!response.ok) {
        const error = (data.error && data.error.message) || response.statusText;
        throw new Error(error);
    }
    return data;
};

/**
 * Helper for authorized headers
 */
const getAuthHeaders = () => {
    const token = authService.getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const studentService = {
    getStudents: async (query = {}) => {
        const { search, page, limit } = query;
        let url = `${API_BASE_URL}?`;
        if (search) url += `search=${search}&`;
        if (page) url += `page=${page}&`;
        if (limit) url += `limit=${limit}&`;

        const response = await fetch(url, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    getStudentById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            headers: getAuthHeaders()
        });
        return handleResponse(response);
    },

    addStudent: async (studentData) => {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(studentData),
        });
        return handleResponse(response);
    },

    updateStudent: async (id, updateData) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(updateData),
        });
        return handleResponse(response);
    },

    deleteStudent: async (id) => {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authService.getToken()}`
            }
        });
        return handleResponse(response);
    }
};
