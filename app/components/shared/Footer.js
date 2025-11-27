"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 text-sm">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand & Desc */}
                <div className="col-span-1">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span>🏥</span> Medicare
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        Expert care. Compassionate service. Medical innovation at its best. Your health, our responsibility.
                    </p>
                    <div className="flex gap-4 text-xl">
                        <a href="#" className="hover:text-teal-400 transition transform hover:scale-110"><FaFacebook /></a>
                        <a href="#" className="hover:text-teal-400 transition transform hover:scale-110"><FaTwitter /></a>
                        <a href="#" className="hover:text-teal-400 transition transform hover:scale-110"><FaInstagram /></a>
                        <a href="#" className="hover:text-teal-400 transition transform hover:scale-110"><FaLinkedin /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-teal-400 transition hover:pl-1">Home</Link></li>
                        <li><Link href="/about" className="hover:text-teal-400 transition hover:pl-1">About Us</Link></li>
                        <li><Link href="/services" className="hover:text-teal-400 transition hover:pl-1">Services</Link></li>
                        <li><Link href="/contact" className="hover:text-teal-400 transition hover:pl-1">Contact</Link></li>
                        <li><Link href="/appointments" className="hover:text-teal-400 transition hover:pl-1">Appointments</Link></li>
                        <li><Link href="/auth" className="hover:text-teal-400 transition hover:pl-1">Login / Signup</Link></li>
                    </ul>
                </div>

                {/* Departments */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">Departments</h3>
                    <ul className="space-y-2">
                        <li><Link href="/services" className="hover:text-teal-400 transition hover:pl-1">Cardiology</Link></li>
                        <li><Link href="/services" className="hover:text-teal-400 transition hover:pl-1">Neurology</Link></li>
                        <li><Link href="/services" className="hover:text-teal-400 transition hover:pl-1">Pediatrics</Link></li>
                        <li><Link href="/services" className="hover:text-teal-400 transition hover:pl-1">Orthopedics</Link></li>
                        <li><Link href="/services" className="hover:text-teal-400 transition hover:pl-1">Emergency Care</Link></li>
                    </ul>
                </div>

                {/* Other Pages & Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2 inline-block">Visit our other pages</h3>
                    <ul className="space-y-2 mb-6">
                        {/* Placeholder for future pages */}
                        {/* 
                            Dashboard links hidden for public view but kept for admin reference.
                            <li><Link href="/dashboard/doctor" className="hover:text-teal-400 transition hover:pl-1">Doctor Dashboard</Link></li>
                            <li><Link href="/dashboard/admin" className="hover:text-teal-400 transition hover:pl-1">Admin Dashboard</Link></li>
                         */}
                    </ul>

                    <h3 className="text-lg font-semibold text-white mb-2">Contact Us</h3>
                    <p className="mb-1 text-gray-400">123 Health Street, Medical City</p>
                    <p className="text-gray-400">support@medicare.org</p>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-xs">
                <p>© {new Date().getFullYear()} Medicare. All rights reserved.</p>
            </div>
        </footer>
    );
}
