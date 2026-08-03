import React from 'react';
const Logo = ({ className = "h-8 w-8" }) => {
  return (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="50" rx="5" fill="#DC2626" />
      <path d="M25 15C21.134 15 18 18.134 18 22C18 29 25 35 25 35C25 35 32 29 32 22C32 18.134 28.866 15 25 15Z" fill="white" />
      <path d="M30 24L25 29L20 24L25 19L30 24Z" fill="#DC2626" />
    </svg>
  );
};

export default Logo;