// components/Navbar.jsx

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { isAuthenticated, logout } from '../../lib/auth';
import Logo from './Logo';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userSession = isAuthenticated();   
  const isLoggedIn = !!userSession;
  const currentUser = userSession?.user;
  const displayName = currentUser
    ? [currentUser.first_name, currentUser.last_name].filter(Boolean).join(' ') || currentUser.email
    : '';

  const toggleMobileMenu = () => setMobileMenuOpen(open => !open);
  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 ${
      isActive
        ? 'text-red-600 font-medium'
        : 'text-gray-800 hover:text-red-500'
    } transition-colors`;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Brand + Links */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Logo />
              <span className="ml-2 text-xl font-bold text-gray-800 hidden sm:block">
                LifeBlood
              </span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-2">
              <NavLink to="/" className={navLinkClass} end>
                Home
              </NavLink>
              <NavLink to="/donation" className={navLinkClass}>
                Donation
              </NavLink>
              <NavLink to="/request" className={navLinkClass}>
                Request
              </NavLink>
              <NavLink to="/inventory" className={navLinkClass}>
                Inventory
              </NavLink>
              <NavLink to="/history" className={navLinkClass}>
                History
              </NavLink>
            </div>
          </div>

          {/* Desktop Profile / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <img
                  src={currentUser.avatarUrl || '/images/default-avatar.png'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-gray-700 font-medium">
                  {displayName}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm text-gray-700 bg-white border rounded hover:bg-gray-50"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-3 border-t">
          <div className="px-2 space-y-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-800 hover:bg-gray-50 hover:text-red-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/donation"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-800 hover:bg-gray-50 hover:text-red-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Donation
            </NavLink>
            <NavLink
              to="/request"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-800 hover:bg-gray-50 hover:text-red-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Request
            </NavLink>
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-800 hover:bg-gray-50 hover:text-red-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Inventory
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-800 hover:bg-gray-50 hover:text-red-500'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              History
            </NavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-red-500"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-red-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-red-500"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;