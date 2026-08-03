import apiClient from '../../../lib/apiClient';

export const donationService = {
  scheduleDonation: (donationData) => apiClient.post('/appointments', donationData),
  getDonationAppointments: () => apiClient.get('/appointments/user'),
};

export default donationService;
