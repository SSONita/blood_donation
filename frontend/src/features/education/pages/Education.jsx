import { useState, useEffect } from 'react';
import educationService from '../services/educationService';
import React from 'react';

const Education = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    educationService.getResources()
      .then(res => {
        setResources(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load resources');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Educational Resources</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map(resource => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{resource.title}</h2>
              <p className="text-gray-600">{resource.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Education;
