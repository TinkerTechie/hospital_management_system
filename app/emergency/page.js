"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone,
    MapPin,
    Ambulance,
    HeartPulse,
    Brain,
    Baby,
    Flame,
    Skull,
    Wind,
    Siren,
    ChevronDown,
    ChevronUp,
    Clock,
    ShieldCheck,
    Stethoscope,
    Activity,
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import Link from 'next/link';

// Icon mapping for dynamic rendering
const iconMap = {
    Ambulance, HeartPulse, Brain, Baby, Flame, Skull, Wind, Siren
};

export default function EmergencyPage() {
    const [services, setServices] = useState([]);
    const [team, setTeam] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [activeAccordion, setActiveAccordion] = useState(null);

    useEffect(() => {
        // Fetch all data in parallel
        const fetchData = async () => {
            try {
                const [servicesRes, teamRes, testimonialsRes, faqsRes] = await Promise.all([
                    fetch('/api/emergency/services'),
                    fetch('/api/emergency/team'),
                    fetch('/api/emergency/testimonials'),
                    fetch('/api/emergency/faqs')
                ]);

                setServices(await servicesRes.json());
                setTeam(await teamRes.json());
                setTestimonials(await testimonialsRes.json());
                setFaqs(await faqsRes.json());
            } catch (error) {
                console.error("Failed to fetch emergency data", error);
            }
        };

        fetchData();
    }, []);

    const toggleAccordion = (index) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1516574187841-69301976e499?q=80&w=2070&auto=format&fit=crop"
                        alt="Emergency Room Team"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-black/60"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 animate-pulse">
                            <Siren className="h-4 w-4" /> 24x7 EMERGENCY RESPONSE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Rapid Response. <br />
                            <span className="text-red-500">Expert Care.</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-2xl">
                            Critical help when you need it most. Our world-class emergency team is ready 24/7 with advanced life-saving protocols.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4">
                            <a href="tel:1066" className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 group" aria-label="Call Emergency Hotline 1066">
                                <Phone className="h-6 w-6 group-hover:animate-bounce" />
                                Call 1066 (Emergency)
                            </a>
                            <a href="https://www.google.com/maps/search/?api=1&query=Emergency+Room+Hospital" target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-3" aria-label="Get Directions to Emergency Room">
                                <MapPin className="h-6 w-6 text-red-600" />
                                Directions to ER
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Floating Stats */}
                <div className="absolute bottom-0 left-0 w-full bg-black/30 backdrop-blur-md border-t border-white/10 py-6 hidden md:block">
                    <div className="container mx-auto px-6 flex justify-around text-white">
                        <div className="flex items-center gap-3">
                            <Clock className="h-8 w-8 text-red-500" />
                            <div>
                                <p className="text-2xl font-bold">24/7</p>
                                <p className="text-xs text-gray-300">Always Open</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Ambulance className="h-8 w-8 text-red-500" />
                            <div>
                                <p className="text-2xl font-bold">15 Min</p>
                                <p className="text-xs text-gray-300">Avg. Ambulance Response</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-8 w-8 text-red-500" />
                            <div>
                                <p className="text-2xl font-bold">NABH</p>
                                <p className="text-xs text-gray-300">Accredited Care</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency Instructions */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What To Do In An Emergency</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Follow these steps immediately if you or someone else is facing a medical crisis.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Call for Help", desc: "Dial 1066 immediately. Provide clear location details and describe the emergency.", icon: Phone, color: "bg-red-100 text-red-600", link: "tel:1066" },
                            { step: "02", title: "First Aid", desc: "If trained, administer CPR or stop bleeding. Keep the patient calm and warm.", icon: HeartPulse, color: "bg-blue-100 text-blue-600", link: "/first-aid" },
                            { step: "03", title: "Visit ER", desc: "Wait for the ambulance or proceed to the nearest Emergency Room safely.", icon: Ambulance, color: "bg-green-100 text-green-600", link: "https://www.google.com/maps/search/?api=1&query=Emergency+Room+Hospital" }
                        ].map((item, i) => (
                            <motion.a
                                href={item.link}
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center hover:-translate-y-2 transition-transform block"
                            >
                                <div className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold`}>
                                    <item.icon className="h-10 w-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="text-red-600 font-bold tracking-wider uppercase text-sm">Our Capabilities</span>
                            <h2 className="text-4xl font-bold text-gray-900 mt-2">Specialized Emergency Care</h2>
                        </div>
                        <Link href="/services" className="text-red-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            View All Departments <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service, i) => {
                            const Icon = iconMap[service.icon] || Activity;

                            // Map service titles to specialty page URLs
                            const getServiceUrl = (title) => {
                                const urlMap = {
                                    "Trauma & Accident": "/services/trauma",
                                    "Cardiac Emergency": "/services/cardiac-emergency",
                                    "Stroke Unit": "/services/stroke",
                                    "Pediatric ER": "/services/pediatric-er",
                                    "Burn Care": "/services/burn-care",
                                    "Poisoning & Overdose": "/services/poisoning",
                                    "Respiratory Distress": "/services/respiratory",
                                    "Disaster Management": "/services/disaster"
                                };
                                return urlMap[title] || "/services";
                            };

                            return (
                                <Link
                                    href={getServiceUrl(service.title)}
                                    key={service.id}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all group cursor-pointer h-full"
                                    >
                                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-red-600 mb-4 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{service.title}</h3>
                                        <p className="text-sm text-gray-500">{service.description}</p>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Meet Our Heroes</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Led by India's top emergency medicine specialists, our team is trained to handle critical situations with precision and compassion.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-gray-800 rounded-2xl overflow-hidden group"
                            >
                                <div className="h-64 overflow-hidden">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                    <p className="text-red-400 text-sm font-medium mb-2">{member.role}</p>
                                    <p className="text-gray-500 text-xs">{member.qualification} • {member.specialty}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-red-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Stories of Survival</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="bg-white p-8 rounded-2xl shadow-md relative"
                            >
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-red-600 text-white flex items-center justify-center rounded-full text-2xl font-serif">"</div>
                                <p className="text-gray-600 italic mb-6 pt-4">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{t.name}</h4>
                                        <p className="text-xs text-gray-500">{t.location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                                >
                                    <span className="font-bold text-gray-900">{faq.question}</span>
                                    {activeAccordion === index ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                                </button>
                                <AnimatePresence>
                                    {activeAccordion === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="bg-gray-50 px-6 pb-6"
                                        >
                                            <p className="text-gray-600 pt-2 border-t border-gray-200">{faq.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-red-600 text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-6">Don't Wait. Every Second Counts.</h2>
                    <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">Our emergency team is standing by to provide life-saving care.</p>
                    <a href="tel:1066" className="bg-white text-red-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-xl inline-block">
                        Call 1066 Now
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
