'use client';

import React from 'react';

/**
 * Reusable Input Component
 * (This is the same component from your original file)
 */
export function Input({
  icon: Icon,
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = true,
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          {Icon && <Icon className="h-5 w-5 text-gray-400" />}
        </div>
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-gray-900 shadow-sm transition-colors duration-200 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
