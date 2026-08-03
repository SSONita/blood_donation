import apiClient from '../../../lib/apiClient';

export const historyService = {
  getUserHistory: () => apiClient.get('/history/user'),
};

export default historyService;
