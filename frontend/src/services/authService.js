/**
 * Auth Service
 * Communicates with the backend auth endpoints
 */

const API_BASE_URL = 'http://localhost:5000/api/auth';

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data.error && data.error.message) || response.statusText;
        throw new Error(error);
    }
    return data;
};

export const authService = {
    // Signup
    signup: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const result = await handleResponse(response);
        // Store token and user info
        if (result.data.token) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));
        }
        return result.data;
    },

    // Login
    login: async (credentials) => {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const result = await handleResponse(response);
        // Store token and user info
        if (result.data.token) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('user', JSON.stringify(result.data.user));
        }
        return result.data;
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user from storage
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Get token
    getToken: () => {
        return localStorage.getItem('token');
    }
};
