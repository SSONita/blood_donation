import { useState, useEffect } from 'react';
import React from 'react';
import historyService from '../services/historyService';
import { getToken } from '../../../lib/auth';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!getToken()) {
      setError('You must be logged in to view your history.');
      setLoading(false);
      return;
    }
    historyService.getUserHistory()
      .then(res => {
        setHistory(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load history');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Your Donation & Request History</h1>
        <p className="text-gray-600">Track your life-saving contributions and requests.</p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {history.map(item => (
                <tr key={item.history_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.action_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.volume}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
