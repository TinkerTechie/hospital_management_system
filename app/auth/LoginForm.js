'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import Image from 'next/image';

export default function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Incorrect email or password.");
        setLoading(false);
        return;
      }

      alert(`Welcome ${data.user.name}! Role: ${data.user.role}`);
    } catch (err) {
      console.error(err);
      setErrorMsg('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100 mt-10 sm:mt-20">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <Image src="/assets/logo.png" alt="Hospital Logo" width={70} height={70} />
        <h2 className="text-2xl font-semibold text-gray-800 mt-3">Welcome Back</h2>
        <p className="text-gray-500 text-sm">Login to continue to HospitalNext</p>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <p className="text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-md text-sm text-center">
          {errorMsg}
        </p>
      )}

      <form onSubmit={handleLogin} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email Address"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4 text-green-600 border-gray-300 rounded" />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="text-green-600 hover:underline focus:outline-none"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center py-2 px-4 bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <LogIn className="mr-2 h-5 w-5" />}
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Social Login */}
        <div className="flex items-center justify-center space-x-2 my-4">
          <span className="h-px w-1/3 bg-gray-300"></span>
          <span className="text-gray-500 text-sm">or</span>
          <span className="h-px w-1/3 bg-gray-300"></span>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          Continue with Google
        </button>

        {/* Sign up prompt */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={onSwitch}
            className="font-medium text-green-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
