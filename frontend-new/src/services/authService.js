import axios from 'axios';

// Base URL for the backend API
const API_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API Service functions
const authService = {
    // Login function
    login: async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            // Save token to localStorage if login successful
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Bağlantı hatası oluştu' };
        }
    },

    // Reset password function
    resetPassword: async (email, newPassword) => {
        try {
            const response = await api.post('/reset-password', { email, newPassword });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Bağlantı hatası oluştu' };
        }
    },

    // Logout function
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    },

    // Check if user is logged in
    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    }
};

export default authService;
