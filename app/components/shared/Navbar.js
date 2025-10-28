"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-[#00796B]">HMS</h1>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
          <Link href="/" className="text-gray-700 hover:text-[#00796B] transition">
            Home
          </Link>
          <Link href="/appointments" className="text-gray-700 hover:text-[#00796B] transition">
            Appointment
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-[#00796B] transition">
            About Us
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-[#00796B] transition">
            Contact Us
          </Link>
        </div>

        {/* Login Button */}
        <Link
          href="/login"
          className="bg-[#00796B] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#00695C] transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
