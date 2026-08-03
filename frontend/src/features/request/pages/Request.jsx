import { useState } from 'react';
import { Link } from 'react-router-dom';
import requestService from '../services/requestService';
import React from 'react';

const Request = () => {
  const [formData, setFormData] = useState({
    dob: '',
    gender: '',
    unit_needed: '',
    urgency_level: '',
    hospital_name: '',
    date_needed: '',
    type_id: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await requestService.createRequest(formData);
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit request. Please check your input and try again.');
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Submitted Successfully</h2>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your blood request. Our team will review your request and contact you shortly.
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
        <h1 className="text-3xl font-bold text-red-600 mb-2">Request For Blood</h1>
        <p className="text-gray-600">In the hardest moments, help is closer than you think. Ask, and we&apos;ll reach out.</p>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Units Needed</label>
          <input type="number" name="unit_needed" value={formData.unit_needed} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
          <select name="urgency_level" value={formData.urgency_level} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
            <option value="">Select</option>
            <option value="Emergency">Emergency</option>
            <option value="Within 24h">Within 24h</option>
            <option value="Within 3 days">Within 3 days</option>
            <option value="Not Urgent">Not Urgent</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
          <input type="text" name="hospital_name" value={formData.hospital_name} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Needed</label>
          <input type="date" name="date_needed" value={formData.date_needed} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type ID</label>
          <input type="number" name="type_id" value={formData.type_id} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <button type="submit" disabled={isSubmitting} className="w-full py-3 px-6 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700">
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default Request;