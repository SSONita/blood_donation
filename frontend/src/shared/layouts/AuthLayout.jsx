import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import React from 'react';
import { Outlet } from 'react-router-dom'; // ✅ Import Outlet

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex justify-center p-6">
        <Link to="/" className="flex items-center">
          <Logo />
          <span className="ml-2 text-xl font-bold text-gray-800">LifeBlood</span>
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <Outlet /> {/* ✅ This renders the nested route content */}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
