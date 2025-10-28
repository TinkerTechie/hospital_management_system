'use client';

import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import  LoginForm  from './LoginForm';
import { SignUpForm } from './SignUpForm';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
        .bg-hero {
          background: radial-gradient(
              circle at top left,
              rgba(13, 148, 136, 0.2),
              transparent 60%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(250, 204, 21, 0.15),
              transparent 60%
            ),
            linear-gradient(to bottom right, #f9fafb, #e0f2f1);
        }
      `}</style>

      <main className="flex min-h-screen w-full items-center justify-center bg-hero p-4 font-sans">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center">
            <div className="rounded-full bg-teal-100 p-4 shadow-md">
              <Stethoscope className="h-10 w-10 text-teal-700" />
            </div>
            <h1 className="mt-4 text-3xl font-extrabold text-gray-800 tracking-wide">
              HospitalNext
            </h1>
            <p className="mt-1 text-gray-600 text-center">
              {isLogin
                ? 'Welcome back! Please log in to continue.'
                : 'Join us and start your healthcare journey.'}
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 backdrop-blur-md p-8 shadow-2xl border border-gray-100 hover:shadow-teal-200/50 transition-shadow duration-500">
            <div key={isLogin ? 'login' : 'signup'} className="animate-fadeIn">
              {isLogin ? (
                <LoginForm onSwitch={() => setIsLogin(false)} />
              ) : (
                <SignUpForm onSwitch={() => setIsLogin(true)} />
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>© 2025 HospitalNext. All rights reserved.</p>
          </div>
        </div>
      </main>
    </>
  );
}
