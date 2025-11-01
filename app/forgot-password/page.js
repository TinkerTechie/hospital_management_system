'use client';
import React, { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Example logic (call your API later)
    setMessage(`If ${email} exists, a password reset link will be sent.`);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-sm text-green-600 mt-4 text-center">{message}</p>}
    </div>
  );
}
