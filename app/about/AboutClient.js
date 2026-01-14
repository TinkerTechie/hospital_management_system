/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../components/shared/Navbar";
import {
    FaHeart,
    FaUserMd,
    FaAward,
    FaHandHoldingHeart,
    FaLightbulb,
    FaShieldAlt,
    FaUsers,
    FaHospital,
    FaStethoscope,
    FaAmbulance,
} from "react-icons/fa";

export default function AboutClient() {
    const [isMounted, setIsMounted] = useState(false);

    // Initialize with safe defaults
    const [journeyInView, setJourneyInView] = useState(true);
    const [valuesInView, setValuesInView] = useState(true);
    const [teamInView, setTeamInView] = useState(true);

    // Refs for intersection observer
    const journeyRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);

    const logo = "/assets/logo.png";
    const doctorTeam = "/assets/doct2.jpg";
    const hospitalBuilding = "/assets/human1.jpg";

    // Prevent hydration errors and setup intersection observers
    useEffect(() => {
        setIsMounted(true);

        // Only use IntersectionObserver on client side
        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            const observerOptions = { threshold: 0.2, triggerOnce: true };

            const journeyObserver = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) setJourneyInView(true);
            }, observerOptions);

            const valuesObserver = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) setValuesInView(true);
            }, observerOptions);

            const teamObserver = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) setTeamInView(true);
            }, observerOptions);

            if (journeyRef.current) journeyObserver.observe(journeyRef.current);
            if (valuesRef.current) valuesObserver.observe(valuesRef.current);
            if (teamRef.current) teamObserver.observe(teamRef.current);

            return () => {
                journeyObserver.disconnect();
                valuesObserver.disconnect();
                teamObserver.disconnect();
            };
        }
    }, []);
    
    const stats = [
        { icon: FaUsers, value: "50,000+", label: "Patients Treated" },
        { icon: FaUserMd, value: "150+", label: "Expert Doctors" },
        { icon: FaAward, value: "25+", label: "Years of Excellence" },
        { icon: FaHospital, value: "15+", label: "Speciality Departments" },
    ];

    const values = [
        {
            icon: FaHeart,
            title: "Compassionate Care",
            description: "Every patient is treated with empathy, dignity, and respect.",
            gradient: "from-red-500 to-pink-600",
        },
        {
            icon: FaLightbulb,
            title: "Innovation",
            description: "Cutting-edge technology and modern medical practices.",
            gradient: "from-yellow-500 to-orange-600",
        },
        {
            icon: FaAward,
            title: "Excellence",
            description: "Committed to the highest standards of medical care.",
            gradient: "from-blue-500 to-cyan-600",
        },
        {
            icon: FaShieldAlt,
            title: "Trust & Safety",
            description: "Your health and safety are our top priorities.",
            gradient: "from-green-500 to-emerald-600",
        },
    ];

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
                        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
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
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mb-8"
                        >
                            <Image
                                src={logo}
                                alt="Medicare Hospital Logo"
                                width={120}
                                height={120}
                                className="mx-auto drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Main Heading */}
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                                About
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                Medicare Hospital
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Compassion. Excellence. Innovation. We are committed to providing{" "}
                            <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                world-class healthcare
                            </span>{" "}
                            with a personal touch.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <stat.icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </h3>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Journey Section */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            ref={journeyRef}
                            initial={{ opacity: 0, x: -40 }}
                            animate={journeyInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="mb-8">
                                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                                    Our Journey
                                </h2>
                                <div className="w-16 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                            </div>

                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                Founded with a mission to make quality healthcare accessible to all,
                                our hospital has grown into a trusted name in medical excellence.
                                From cutting-edge technology to a compassionate team, we ensure every
                                patient receives the best care possible.
                            </p>

                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                Our multi-speciality departments, expert doctors, and patient-first
                                philosophy have helped us earn trust and recognition across the
                                region.
                            </p>

                            <div className="flex gap-4">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl px-6 py-4 border border-green-100"
                                >
                                    <FaStethoscope className="text-green-600 text-2xl" />
                                    <div>
                                        <p className="font-bold text-gray-900">24/7 Care</p>
                                        <p className="text-sm text-gray-600">Always Available</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl px-6 py-4 border border-blue-100"
                                >
                                    <FaAmbulance className="text-blue-600 text-2xl" />
                                    <div>
                                        <p className="font-bold text-gray-900">Emergency</p>
                                        <p className="text-sm text-gray-600">Rapid Response</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={journeyInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-green-100/50">
                                <Image
                                    src={hospitalBuilding}
                                    alt="Hospital Building"
                                    width={600}
                                    height={400}
                                    className="w-full h-auto"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="relative py-20 bg-gradient-to-br from-green-50/50 via-white to-blue-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        ref={valuesRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                whileHover={{ y: -8 }}
                                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                    <value.icon className="text-white text-2xl" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="relative py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        ref={teamRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={teamInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                            Meet Our Dedicated Team
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our team of highly qualified doctors, nurses, and specialists work
                            tirelessly to provide the best medical care to every patient.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={teamInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative max-w-5xl mx-auto"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-4 ring-green-100/50">
                            <Image
                                src={doctorTeam}
                                alt="Our Medical Team"
                                width={1000}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>

                        {/* Floating Stats Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={teamInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.5 }}
                            className="absolute -left-4 top-1/4 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-100 hidden lg:block"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                                    <FaUserMd className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">150+</p>
                                    <p className="text-sm text-gray-600">Expert Doctors</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={teamInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.6 }}
                            className="absolute -right-4 bottom-1/4 bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-gray-100 hidden lg:block"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                                    <FaHandHoldingHeart className="text-white text-xl" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">24/7</p>
                                    <p className="text-sm text-gray-600">Care Available</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 rounded-3xl p-12 shadow-2xl text-center relative overflow-hidden"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Experience World-Class Care?
                            </h3>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                Book an appointment today and take the first step toward better health.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/contact"
                                    className="bg-white text-green-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
                                >
                                    Contact Us
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="/appointments"
                                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2"
                                >
                                    Book Appointment
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
