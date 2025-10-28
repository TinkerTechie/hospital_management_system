'use client';

import React from 'react';

/**
 * Reusable Button Component
 * (This is the same component from your original file)
 */
export function Button({ type = 'submit', fullWidth = true, onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-base font-medium text-white shadow-md transition-all duration-300 ease-in-out hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      {children}
    </button>
  );
}
