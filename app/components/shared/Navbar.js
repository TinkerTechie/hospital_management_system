"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Info, Stethoscope, Phone, Calendar, ChevronDown, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-teal-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="text-2xl font-bold tracking-wide flex items-center gap-2">
          <span>🏥</span> Medicare
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-teal-200 transition flex items-center gap-1">
            <Home size={16} /> Home
          </Link>
          <Link href="/about" className="hover:text-teal-200 transition flex items-center gap-1">
            <Info size={16} /> About Us
          </Link>
          <Link href="/services" className="hover:text-teal-200 transition flex items-center gap-1">
            <Stethoscope size={16} /> Services
          </Link>
          <Link href="/departments" className="hover:text-teal-200 transition flex items-center gap-1">
            <ChevronDown size={16} /> Departments
          </Link>
          <Link href="/appointments" className="hover:text-teal-200 transition flex items-center gap-1">
            <Calendar size={16} /> Appointments
          </Link>
          <Link href="/contact" className="hover:text-teal-200 transition flex items-center gap-1">
            <Phone size={16} /> Contact
          </Link>

          <div className="flex items-center gap-3 ml-4">
            <Link
              href="/auth"
              className="bg-white text-teal-700 px-4 py-2 rounded-md hover:bg-teal-50 transition shadow-sm font-semibold flex items-center gap-1"
            >
              <LogIn size={16} /> Login
            </Link>
            <Link
              href="/auth?mode=signup"
              className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300 transition shadow-sm font-semibold flex items-center gap-1"
            >
              <UserPlus size={16} /> Sign Up
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-teal-700 border-t border-teal-500">
          <nav className="flex flex-col p-4 space-y-3 text-sm font-medium">
            <Link href="/" className="hover:text-teal-200 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <Home size={18} /> Home
            </Link>
            <Link href="/about" className="hover:text-teal-200 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <Info size={18} /> About Us
            </Link>
            <Link href="/services" className="hover:text-teal-200 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <Stethoscope size={18} /> Services
            </Link>
            <Link href="/departments" className="hover:text-teal-200 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <ChevronDown size={18} /> Departments
            </Link>
            <Link href="/appointments" className="hover:text-teal-200 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <Calendar size={18} /> Appointments
            </Link>
            <Link href="/contact" className="hover:text-teal-200 flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <Phone size={18} /> Contact
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/auth"
                className="bg-white text-teal-700 px-3 py-2 rounded-md text-center flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                href="/auth?mode=signup"
                className="bg-yellow-400 text-black px-3 py-2 rounded-md text-center flex items-center justify-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus size={18} /> Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
