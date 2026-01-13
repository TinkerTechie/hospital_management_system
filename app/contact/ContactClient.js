"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/shared/Navbar";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaWhatsapp,
    FaFacebook,
    FaInstagram,
    FaExclamationTriangle,
    FaBuilding,
    FaPaperPlane,
    FaClock,
    FaHeadset,
} from "react-icons/fa";

export default function ContactClient() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [isMounted, setIsMounted] = useState(false);
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

    // Prevent hydration errors by only running animations on client
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // ✅ Validation
    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S/.test(formData.email))
            newErrors.email = "Enter a valid email address";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Handle Input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    // ✅ Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: "Message Sent!",
                    text: "We'll get back to you shortly.",
                    icon: "success",
                    confirmButtonColor: "#16a34a",
                });
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: data.message || "Something went wrong. Please try again later.",
                    icon: "error",
                    confirmButtonColor: "#16a34a",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Network Error!",
                text: "Please check your connection and try again.",
                icon: "error",
                confirmButtonColor: "#16a34a",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30">
            <Navbar />

            {/* Animated Background Orbs - Only render on client */}
            {isMounted && (
                <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.2, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                        }}
                        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"
                    />
                </div>
            )}

            {/* Hero Section - Premium Design */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-full px-6 py-2.5 mb-8"
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-700 font-semibold text-sm">Available 24/7</span>
                        </motion.div>

                        {/* Main Heading */}
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                Get in
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                Touch
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Have questions? We're here to help. Reach out to{" "}
                            <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Medicare Hospital
                            </span>{" "}
                            and experience world-class care.
                        </p>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap justify-center gap-8 mb-12">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <FaHeadset className="text-white text-xl" />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-bold text-gray-900">24/7</p>
                                    <p className="text-sm text-gray-600">Support</p>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-gray-100"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                                    <FaClock className="text-white text-xl" />
                                </div>
                                <div className="text-left">
                                    <p className="text-2xl font-bold text-gray-900">&lt;2h</p>
                                    <p className="text-sm text-gray-600">Response Time</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left Column - Contact Info (2/5 width) */}
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, x: -40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-2 space-y-6"
                        >
                            {/* Contact Information Card */}
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500">
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                                        Contact Information
                                    </h2>
                                    <div className="w-16 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                                </div>

                                <div className="space-y-5">
                                    {/* Address */}
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group"
                                    >
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <FaMapMarkerAlt className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 mb-1.5 text-lg">Address</p>
                                            <p className="text-gray-600 leading-relaxed">
                                                Medicare Hospital, RandomAddress,<br />ExampleBlah, Trivandrum, Kerala
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Phone */}
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group"
                                    >
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <FaPhoneAlt className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 mb-1.5 text-lg">Phone</p>
                                            <a
                                                href="tel:+911234567890"
                                                className="text-green-600 hover:text-green-700 font-semibold text-lg transition-colors"
                                            >
                                                +91 123 456 7890
                                            </a>
                                        </div>
                                    </motion.div>

                                    {/* Email */}
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group"
                                    >
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <FaEnvelope className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 mb-1.5 text-lg">Email</p>
                                            <a
                                                href="mailto:feedback@medicare.org"
                                                className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                                            >
                                                feedback@medicare.org
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Divider */}
                                <div className="my-8 border-t-2 border-gray-100"></div>

                                {/* Emergency & Corporate */}
                                <div className="space-y-5">
                                    {/* Emergency */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-100 shadow-md"
                                    >
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                                            <FaExclamationTriangle className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-red-900 mb-1.5 text-lg">Emergency 24/7</p>
                                            <a
                                                href="tel:+919876543210"
                                                className="text-red-600 hover:text-red-700 font-bold text-xl transition-colors"
                                            >
                                                +91 987 654 3210
                                            </a>
                                        </div>
                                    </motion.div>

                                    {/* Corporate */}
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 group"
                                    >
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <FaBuilding className="text-white text-xl" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 mb-1.5 text-lg">Corporate</p>
                                            <a
                                                href="tel:+915553332222"
                                                className="text-green-600 hover:text-green-700 font-semibold text-lg transition-colors"
                                            >
                                                +91 555 333 2222
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Social Media */}
                                <div className="mt-10 pt-8 border-t-2 border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-5">
                                        Connect With Us
                                    </h3>
                                    <div className="flex gap-4">
                                        <motion.a
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            href="https://wa.me/911234567890"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="WhatsApp"
                                            className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300"
                                        >
                                            <FaWhatsapp className="text-white text-2xl" />
                                        </motion.a>
                                        <motion.a
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            href="https://facebook.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Facebook"
                                            className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300"
                                        >
                                            <FaFacebook className="text-white text-2xl" />
                                        </motion.a>
                                        <motion.a
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            href="https://instagram.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Instagram"
                                            className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300"
                                        >
                                            <FaInstagram className="text-white text-2xl" />
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Contact Form (3/5 width) */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="lg:col-span-3"
                        >
                            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500">
                                <div className="mb-10">
                                    <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                                        Send Us a Message
                                    </h2>
                                    <div className="w-16 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-3"></div>
                                    <p className="text-gray-600 text-lg">
                                        Fill out the form below and we'll get back to you within 24 hours.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-7">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-gray-900 mb-3 text-base font-bold">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50/50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-base focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:bg-white focus:outline-none transition-all duration-300 hover:border-green-300 hover:bg-white"
                                            placeholder="John Doe"
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-sm mt-2.5 flex items-center gap-2 font-medium">
                                                <span>⚠️</span> {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-gray-900 mb-3 text-base font-bold">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50/50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-base focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:bg-white focus:outline-none transition-all duration-300 hover:border-green-300 hover:bg-white"
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-2.5 flex items-center gap-2 font-medium">
                                                <span>⚠️</span> {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-gray-900 mb-3 text-base font-bold">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50/50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-base focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:bg-white focus:outline-none transition-all duration-300 hover:border-green-300 hover:bg-white"
                                            placeholder="+91 98765 43210"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-2.5 flex items-center gap-2 font-medium">
                                                <span>⚠️</span> {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-gray-900 mb-3 text-base font-bold">
                                            Your Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className="w-full bg-gray-50/50 border-2 border-gray-200 rounded-2xl px-5 py-4 text-base resize-none focus:ring-4 focus:ring-green-100 focus:border-green-500 focus:bg-white focus:outline-none transition-all duration-300 hover:border-green-300 hover:bg-white"
                                            placeholder="Tell us how we can help you..."
                                        ></textarea>
                                        {errors.message && (
                                            <p className="text-red-500 text-sm mt-2.5 flex items-center gap-2 font-medium">
                                                <span>⚠️</span> {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <FaPaperPlane className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                        <span className="relative z-10">Send Message</span>
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>

                    {/* Map Section - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mt-20"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                                Visit Our Hospital
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                                Find us easily on the map. We're located in the heart of Trivandrum, Kerala.
                            </p>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-green-100/50 hover:ring-green-200 transition-all duration-500">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.0920866495555!2d76.95320817450705!3d8.524139893845598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbf9b4f22b41%3A0xd6a63f5a6d401cb!2sTrivandrum!5e0!3m2!1sen!2sin!4v1679327596323!5m2!1sen!2sin"
                                width="100%"
                                height="500"
                                allowFullScreen=""
                                loading="lazy"
                                title="Medicare Hospital Location"
                                className="border-0 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
