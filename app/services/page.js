"use client";

import React, { useState } from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    HeartPulse,
    Brain,
    Baby,
    Bone,
    Stethoscope,
    Activity,
    Microscope,
    Ambulance,
    ArrowRight,
    Search,
    Star
} from "lucide-react";

export default function ServicesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const services = [
        {
            icon: HeartPulse,
            title: "Cardiology",
            desc: "Comprehensive heart care including diagnostics, surgery, and rehabilitation.",
            color: "text-red-500 bg-red-50",
            category: "Specialized",
            featured: true
        },
        {
            icon: Brain,
            title: "Neurology",
            desc: "Advanced treatment for disorders of the brain, spine, and nervous system.",
            color: "text-indigo-500 bg-indigo-50",
            category: "Specialized",
            featured: false
        },
        {
            icon: Baby,
            title: "Pediatrics",
            desc: "Compassionate care for infants, children, and adolescents.",
            color: "text-pink-500 bg-pink-50",
            category: "Primary Care",
            featured: false
        },
        {
            icon: Bone,
            title: "Orthopedics",
            desc: "Expert care for bones, joints, ligaments, tendons, and muscles.",
            color: "text-orange-500 bg-orange-50",
            category: "Specialized",
            featured: false
        },
        {
            icon: Microscope,
            title: "Diagnostics",
            desc: "State-of-the-art imaging and laboratory services for accurate diagnosis.",
            color: "text-blue-500 bg-blue-50",
            category: "Diagnostics",
            featured: true
        },
        {
            icon: Ambulance,
            title: "Emergency Care",
            desc: "24/7 emergency services with rapid response teams.",
            color: "text-red-600 bg-red-100",
            category: "Emergency",
            featured: true
        },
        {
            icon: Stethoscope,
            title: "General Medicine",
            desc: "Primary care for all ages, focusing on prevention and wellness.",
            color: "text-teal-500 bg-teal-50",
            category: "Primary Care",
            featured: false
        },
        {
            icon: Activity,
            title: "Rehabilitation",
            desc: "Physical therapy and rehab services to help you recover faster.",
            color: "text-green-500 bg-green-50",
            category: "Therapy",
            featured: false
        }
    ];

    const categories = ["All", "Specialized", "Primary Care", "Diagnostics", "Emergency", "Therapy"];

    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.desc.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-teal-700 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
                    >
                        World-Class Care, Right Here.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-teal-100 max-w-2xl mx-auto mb-10 font-light"
                    >
                        From routine checkups to complex surgeries, our comprehensive medical services are designed around your needs.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link href="/appointments" className="bg-white text-teal-700 px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block">
                            Book an Appointment
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Trust Markers */}
            <section className="py-12 bg-white shadow-sm relative z-20 -mt-8 mx-6 max-w-6xl lg:mx-auto rounded-2xl border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
                    <div>
                        <h3 className="text-4xl font-bold text-teal-600 mb-2">100K+</h3>
                        <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">Satisfied Patients</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-teal-600 mb-2">50+</h3>
                        <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">Specialized Departments</p>
                    </div>
                    <div>
                        <h3 className="text-4xl font-bold text-teal-600 mb-2">24/7</h3>
                        <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">Emergency Support</p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Medical Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Explore our wide range of specialties. Use the search or filters below to find exactly what you need.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap justify-center gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === cat
                                        ? "bg-teal-600 text-white shadow-md"
                                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {filteredServices.map((service, index) => (
                                <motion.div
                                    key={service.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden"
                                >
                                    {/* Featured Badge */}
                                    {service.featured && (
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 shadow-sm">
                                                Featured
                                            </span>
                                        </div>
                                    )}

                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className="h-7 w-7" />
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                        {service.desc}
                                    </p>

                                    <Link href={service.title === "Cardiology" ? "/services/cardiology" : service.title === "Neurology" ? "/services/neurology" : "#"} className="text-teal-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Learn More <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                                className="mt-4 text-teal-600 font-medium hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-teal-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Patient Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Jenkins",
                                role: "Cardiology Patient",
                                quote: "The cardiology team saved my life. From the emergency room to my recovery, the care was world-class.",
                                initial: "S",
                                color: "bg-blue-100 text-blue-700"
                            },
                            {
                                name: "Michael Torres",
                                role: "Orthopedics Patient",
                                quote: "I can finally walk pain-free again thanks to Dr. Smith and the rehab team. Highly recommended!",
                                initial: "M",
                                color: "bg-green-100 text-green-700"
                            },
                            {
                                name: "Emily Chen",
                                role: "Pediatrics Parent",
                                quote: "The pediatric ward made my son feel so comfortable. They truly care about the little ones.",
                                initial: "E",
                                color: "bg-purple-100 text-purple-700"
                            }
                        ].map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-teal-100/50">
                                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                                </div>
                                <p className="text-gray-600 italic mb-6 leading-relaxed">
                                    "{t.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${t.color}`}>
                                        {t.initial}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                                        <p className="text-xs text-gray-500 font-medium uppercase">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-white text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-teal-50 opacity-50 pointer-events-none"></div>
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to prioritize your health?</h2>
                    <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                        Schedule an appointment with one of our specialists today and take the first step towards better health.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/appointments" className="bg-teal-600 text-white px-8 py-4 rounded-full font-bold hover:bg-teal-700 transition-colors shadow-lg hover:shadow-teal-500/30">
                            Book Appointment
                        </Link>
                        <Link href="/contact" className="bg-white text-teal-700 border-2 border-teal-100 px-8 py-4 rounded-full font-bold hover:border-teal-600 hover:text-teal-600 transition-all">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
