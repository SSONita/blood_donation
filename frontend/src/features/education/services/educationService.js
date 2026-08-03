import apiClient from '../../../lib/apiClient';

export const educationService = {
  getResources: () => apiClient.get('/education'),
};

export default educationService;
