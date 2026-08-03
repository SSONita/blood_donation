import apiClient from '../../../lib/apiClient';

export const requestService = {
  createRequest: (requestData) => apiClient.post('/requests', requestData),
  getUserRequests: () => apiClient.get('/requests/user'),
};

export default requestService;
