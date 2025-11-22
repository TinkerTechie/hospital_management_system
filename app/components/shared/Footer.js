"use client";

import React from "react";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 text-sm">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand & Desc */}
                <div className="col-span-1 md:col-span-1">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                        <span>🏥</span> Medicare
                    </h2>
                    <p className="text-gray-400 leading-relaxed">
                        Providing world-class healthcare with compassion and excellence. Your health is our priority.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:text-teal-400 transition">Home</Link></li>
                        <li><Link href="/about" className="hover:text-teal-400 transition">About Us</Link></li>
                        <li><Link href="/services" className="hover:text-teal-400 transition">Services</Link></li>
                        <li><Link href="/contact" className="hover:text-teal-400 transition">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
                    <ul className="space-y-2">
                        <li><Link href="/services" className="hover:text-teal-400 transition">Cardiology</Link></li>
                        <li><Link href="/services" className="hover:text-teal-400 transition">Neurology</Link></li>
                        <li><Link href="/services" className="hover:text-teal-400 transition">Pediatrics</Link></li>
                        <li><Link href="/services" className="hover:text-teal-400 transition">Emergency Care</Link></li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
                    <p className="mb-2">123 Health Street, Medical City</p>
                    <p className="mb-4">support@medicare.org</p>
                    <div className="flex gap-4 text-xl">
                        <a href="#" className="hover:text-teal-400 transition"><FaFacebook /></a>
                        <a href="#" className="hover:text-teal-400 transition"><FaTwitter /></a>
                        <a href="#" className="hover:text-teal-400 transition"><FaInstagram /></a>
                        <a href="#" className="hover:text-teal-400 transition"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
                <p>© {new Date().getFullYear()} Medicare. All rights reserved.</p>
            </div>
        </footer>
    );
}
