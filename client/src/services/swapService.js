// src/services/swapService.js
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5173/api',
  timeout: 10000,
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const swapService = {
  // Get all matches for the authenticated user
  getMatches: async (status = 'all') => {
    try {
      const response = await api.get('/matches', {
        params: { status }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  },

  // Get count of active matches
  getActiveMatchesCount: async () => {
    try {
      const response = await api.get('/matches/active/count');
      return response.data;
    } catch (error) {
      console.error('Error fetching active matches count:', error);
      throw error;
    }
  },

  // Get specific match by ID
  getMatch: async (matchId) => {
    try {
      const response = await api.get(`/matches/${matchId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching match:', error);
      throw error;
    }
  },

  // Mark match as completed
  markMatchComplete: async (matchId) => {
    try {
      const response = await api.put(`/matches/${matchId}/complete`);
      return response.data;
    } catch (error) {
      console.error('Error marking match as complete:', error);
      throw error;
    }
  },

  // Cancel a match
  cancelMatch: async (matchId) => {
    try {
      const response = await api.put(`/matches/${matchId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling match:', error);
      throw error;
    }
  },

  // Add a new session to a match
  addSession: async (matchId, sessionData) => {
    try {
      const response = await api.post(`/matches/${matchId}/sessions`, sessionData);
      return response.data;
    } catch (error) {
      console.error('Error adding session:', error);
      throw error;
    }
  },

  // Mark session as completed
  completeSession: async (matchId, sessionId) => {
    try {
      const response = await api.put(`/matches/${matchId}/sessions/${sessionId}/complete`);
      return response.data;
    } catch (error) {
      console.error('Error completing session:', error);
      throw error;
    }
  },

  // Add rating and feedback for a match
  rateMatch: async (matchId, rating, feedback) => {
    try {
      const response = await api.put(`/matches/${matchId}/rating`, {
        rating,
        feedback
      });
      return response.data;
    } catch (error) {
      console.error('Error rating match:', error);
      throw error;
    }
  },

  // Get other participant details
  getOtherParticipant: async (matchId) => {
    try {
      const response = await api.get(`/matches/${matchId}/other-participant`);
      return response.data;
    } catch (error) {
      console.error('Error fetching other participant:', error);
      throw error;
    }
  }
};

export default swapService;