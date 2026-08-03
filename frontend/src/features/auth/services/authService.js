import apiClient from '../../../lib/apiClient';

export const authService = {
  register: (userData) => apiClient.post('/auth/register', userData),
  login: (credentials) => apiClient.post('/auth/login', credentials),
};

export default authService;
