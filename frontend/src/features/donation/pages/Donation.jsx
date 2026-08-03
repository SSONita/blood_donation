import { useState } from 'react';
import { Link } from 'react-router-dom';
import donationService from '../services/donationService';
import React from 'react';

const Donation = () => {
  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    past_donation: false,
    medical_condition: '',
    medications: '',
    date: '',
    time: '',
    type_id: '',
    center_id: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await donationService.scheduleDonation(formData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to schedule donation. Please check your input and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-green-600 mb-6">
            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Appointment Scheduled Successfully</h2>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your willingness to donate blood. Your donation will help save lives.
          </p>
          <Link to="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Book a Blood Donation</h1>
        <p className="text-gray-600">Fill out the form below to schedule your donation appointment.</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Past Donation</label>
          <input type="checkbox" name="past_donation" checked={formData.past_donation} onChange={handleInputChange} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Medical Condition</label>
          <input type="text" name="medical_condition" value={formData.medical_condition} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Medications</label>
          <input type="text" name="medications" value={formData.medications} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Time</label>
          <input type="time" name="time" value={formData.time} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type ID</label>
          <input type="number" name="type_id" value={formData.type_id} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Donation Center ID</label>
          <input type="number" name="center_id" value={formData.center_id} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button type="submit" disabled={isSubmitting} className="w-full py-3 px-6 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700">
          {isSubmitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default Donation;