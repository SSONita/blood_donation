import apiClient from '../../../lib/apiClient';

export const inventoryService = {
  getInventory: () => apiClient.get('/inventory'),
};

export default inventoryService;
