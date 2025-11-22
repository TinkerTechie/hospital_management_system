"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSubmitted(true);
        setMessage("If this email is registered, you’ll receive a reset link.");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to send reset link. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-background transition-colors duration-300">
      <div
        className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-10 
        border border-gray-100 dark:border-gray-700 animate-fadeIn"
      >
        {/* Logo + Header */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/assets/logo.png"
            alt="HospitalNext Logo"
            width={60}
            height={60}
            className="mb-3"
          />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Forgot Your Password?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mt-1 text-sm">
            Please enter your registered email address. We’ll email you a link
            to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-3.5 h-5 w-5 ${
                  error ? "text-red-500" : "text-gray-400 dark:text-gray-500"
                }`}
              />
              <input
                id="email"
                type="email"
                value={email}
                aria-label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg 
                  focus:ring-2 focus:outline-none 
                  ${
                    error
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 dark:border-gray-700 focus:ring-green-500"
                  } 
                  dark:bg-gray-700 dark:text-gray-100 transition`}
                placeholder="you@example.com"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center py-2 px-4 
              bg-green-600 text-white font-semibold rounded-lg shadow-sm 
              hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:outline-none 
              transition-all duration-200 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <Lock className="mr-2 h-5 w-5" />
            )}
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Message */}
        {isSubmitted && message && (
          <p className="text-sm text-green-600 dark:text-green-400 mt-4 text-center">
            {message}
          </p>
        )}

        {/* Back to Login */}
        <div className="mt-6 text-center text-sm">
          <button
            type="button"
            onClick={() => router.push("/auth")}
            className="text-green-600 dark:text-green-400 hover:underline hover:translate-x-1 transition-transform focus:outline-none"
          >
            ← Back to Login
          </button>
        </div>

        {/* Inspirational Note */}
        <p className="text-xs text-center mt-6 text-gray-500 dark:text-gray-400 italic">
          “Your health comes first — we’ll help you get back on track.”
        </p>
      </div>
    </div>
  );
}
