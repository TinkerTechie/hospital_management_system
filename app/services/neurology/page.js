"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Brain,
    Activity,
    Stethoscope,
    Phone,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    Clock,
    Award,
    User,
    ArrowRight,
    ArrowLeft,
    Star,
    X,
    Zap,
    Microscope,
    ShieldCheck
} from "lucide-react";

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">{question}</span>
                {isOpen ? <ChevronUp className="h-5 w-5 text-teal-600" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-gray-600 leading-relaxed text-sm">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ConditionAccordion = ({ condition }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-teal-100 overflow-hidden mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none hover:bg-teal-50/30 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isOpen ? 'bg-teal-500 text-white shadow-md' : 'bg-teal-50 text-teal-600'} transition-all duration-300`}>
                        <Brain className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-lg text-gray-800">{condition.name}</span>
                </div>
                {isOpen ? <ChevronUp className="h-5 w-5 text-teal-600" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 border-t border-teal-50 bg-teal-50/10">
                            <div className="flex flex-col md:flex-row gap-6 mt-4">
                                <div className="md:w-2/3 space-y-4">
                                    <p className="text-gray-600 leading-relaxed">{condition.description}</p>
                                    <div>
                                        <h4 className="font-semibold text-teal-800 mb-2 flex items-center gap-2">
                                            <Activity className="h-4 w-4" /> Symptoms:
                                        </h4>
                                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-1">
                                            {condition.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-teal-800 mb-2 flex items-center gap-2">
                                            <Stethoscope className="h-4 w-4" /> Treatment:
                                        </h4>
                                        <p className="text-gray-600 text-sm">{condition.treatment}</p>
                                    </div>
                                </div>
                                <div className="md:w-1/3">
                                    <img src={condition.image} alt={condition.name} className="rounded-lg shadow-md w-full h-40 object-cover border border-teal-100" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10">
                    <X className="h-5 w-5 text-gray-600" />
                </button>

                <div className="h-64 relative">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                        <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-teal-700 mb-3">Overview</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{service.fullDesc}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                            <h4 className="font-bold text-teal-800 mb-4 flex items-center gap-2">
                                <Activity className="h-5 w-5" /> Procedure Steps
                            </h4>
                            <ul className="space-y-3">
                                {service.procedureSteps.map((step, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                        <span className="w-6 h-6 rounded-full bg-teal-200 text-teal-800 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                                <User className="h-5 w-5" /> Eligibility
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {service.eligibility}
                            </p>
                            <div className="mt-6">
                                <Link href="/appointments" className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
                                    Book Consultation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function NeurologyPage() {
    const [conditions, setConditions] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        // Fetch Conditions
        fetch('/api/neurology/conditions')
            .then(res => res.json())
            .then(data => setConditions(data))
            .catch(err => console.error("Failed to fetch conditions", err));

        // Fetch Services
        fetch('/api/neurology/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Failed to fetch services", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-teal-900 text-white py-24 lg:py-32 overflow-hidden">
                {/* Neural Concept Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-950/95 to-teal-800/90"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link href="/services" className="inline-flex items-center gap-2 text-teal-200 hover:text-white mb-6 transition-colors group">
                                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium">Back to Services</span>
                            </Link>
                            <div className="block">
                                <span className="bg-teal-800/50 text-teal-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block border border-teal-700 backdrop-blur-sm">
                                    Department of Neurology
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Comprehensive Neurology Care for <span className="text-teal-400">Mind & Body</span>
                            </h1>
                            <p className="text-xl text-gray-200 mb-8 leading-relaxed font-light">
                                Expert team, cutting-edge technology, and compassionate service for all neurological needs.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/appointments" className="bg-teal-500 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-600 transition-colors shadow-lg hover:shadow-teal-500/30 flex items-center gap-2">
                                    <Calendar className="h-5 w-5" /> Book a Consultation
                                </Link>
                                <Link href="#services" className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors backdrop-blur-sm">
                                    Explore Services
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                    {/* Hero Image - Brain Concept */}
                    <div className="lg:w-1/2 hidden lg:block flex justify-center">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=2069&auto=format&fit=crop"
                            alt="Neurology Care"
                            className="rounded-3xl shadow-2xl border-4 border-white/10 max-h-[500px] object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Stats & Awards */}
            <section className="bg-white border-b border-gray-100 relative z-20 -mt-8 mx-4 lg:mx-auto max-w-6xl rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                    <div>
                        <h3 className="text-3xl font-bold text-teal-600 mb-1">2000+</h3>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Patients Treated</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-teal-600 mb-1">20+</h3>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Specialists</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-teal-600 mb-1">24/7</h3>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Stroke Care</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-teal-600 mb-1">Top 5</h3>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Regional Ranking</p>
                    </div>
                </div>
            </section>

            {/* Conditions Treated - Accordion */}
            <section className="py-20 bg-teal-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Conditions We Treat</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We provide expert care for a wide range of neurological conditions, from common headaches to complex degenerative diseases.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {conditions.map((condition) => (
                            <ConditionAccordion key={condition.id} condition={condition} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Specialized Services - Grid */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">Our Expertise</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Specialized Neurology Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Advanced diagnostic and treatment options tailored to your specific neurological needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group cursor-pointer"
                                onClick={() => setSelectedService(service)}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <span className="text-white font-medium flex items-center gap-2">View Details <ArrowRight className="h-4 w-4" /></span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.shortDesc}</p>
                                    <button className="text-teal-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                        Learn More <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advanced Diagnostics & Technology */}
            <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Advanced Diagnostics & Technology</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            We utilize state-of-the-art equipment to ensure precise diagnosis and effective treatment planning.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-teal-500 transition-colors">
                            <div className="w-14 h-14 bg-teal-900/50 rounded-xl flex items-center justify-center mb-6 text-teal-400">
                                <Brain className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">3T MRI & CT Scan</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                High-resolution imaging for detailed views of brain and spinal cord structures, aiding in the diagnosis of tumors, strokes, and MS.
                            </p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-teal-500 transition-colors">
                            <div className="w-14 h-14 bg-teal-900/50 rounded-xl flex items-center justify-center mb-6 text-teal-400">
                                <Activity className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">EEG & EMG</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Electroencephalogram (EEG) to monitor brain activity and Electromyography (EMG) to assess muscle and nerve health.
                            </p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-teal-500 transition-colors">
                            <div className="w-14 h-14 bg-teal-900/50 rounded-xl flex items-center justify-center mb-6 text-teal-400">
                                <Microscope className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Neurovascular Imaging</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Advanced angiography and ultrasound techniques to visualize blood flow and detect blockages or aneurysms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Patient Journey */}
            <section className="py-20 bg-teal-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Journey to Recovery</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We guide you through every step of your care, from diagnosis to rehabilitation.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-teal-200 -z-10 transform -translate-y-1/2"></div>

                        {[
                            { step: "1", title: "Appointment", desc: "Initial consultation with a specialist." },
                            { step: "2", title: "Diagnosis", desc: "Comprehensive testing and imaging." },
                            { step: "3", title: "Treatment", desc: "Personalized care plan execution." },
                            { step: "4", title: "Monitoring", desc: "Regular check-ups and adjustments." },
                            { step: "5", title: "Recovery", desc: "Rehabilitation and ongoing support." }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md w-full md:w-48 text-center border border-teal-100 relative">
                                <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 shadow-lg border-4 border-white">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Specialists</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our team of board-certified neurologists and neurosurgeons is dedicated to your care.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Dr. Anjali Desai", role: "Chief Neurologist", specialty: "Stroke & Cerebrovascular Disease", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80" },
                            { name: "Dr. Karthik Menon", role: "Epileptologist", specialty: "Epilepsy & Seizure Disorders", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80" },
                            { name: "Dr. Lakshmi Nair", role: "Neurosurgeon", specialty: "Spine & Peripheral Nerve Surgery", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80" }
                        ].map((doctor, i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group">
                                <div className="h-64 overflow-hidden">
                                    <img src={doctor.image} alt={`Indian neurologist ${doctor.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                                    <p className="text-teal-600 font-medium mb-2">{doctor.role}</p>
                                    <p className="text-gray-500 text-sm mb-6">{doctor.specialty}</p>
                                    <Link href="/appointments" className="inline-block w-full py-2 border-2 border-teal-600 text-teal-600 font-bold rounded-lg hover:bg-teal-600 hover:text-white transition-colors">
                                        Book Appointment
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Patient Stories Slider */}
            <section className="py-20 bg-teal-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Patient Stories</h2>
                        <p className="text-teal-200 max-w-2xl mx-auto">
                            Real stories of recovery and hope from our patients.
                        </p>
                    </div>

                    <div className="relative">
                        <motion.div
                            className="flex gap-6 cursor-grab active:cursor-grabbing overflow-x-auto pb-8 scrollbar-hide snap-x"
                            drag="x"
                            dragConstraints={{ right: 0, left: -1000 }}
                        >
                            {[
                                {
                                    name: "Michael T.",
                                    diagnosis: "Stroke Survivor",
                                    quote: "The rapid intervention saved my life. I'm back to hiking thanks to the rehab team.",
                                    fullStory: "I arrived at the ER with slurred speech and weakness. The stroke team acted immediately. The tPA treatment and subsequent rehabilitation were world-class. I felt supported every step of the way.",
                                    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                                },
                                {
                                    name: "Sarah L.",
                                    diagnosis: "Migraine Relief",
                                    quote: "After years of chronic pain, I finally found a treatment plan that works.",
                                    fullStory: "I suffered from debilitating migraines for over a decade. The Headache Center's comprehensive approach, including lifestyle changes and new medications, has given me my life back.",
                                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
                                },
                                {
                                    name: "David R.",
                                    diagnosis: "Epilepsy Management",
                                    quote: "I haven't had a seizure in 2 years. The freedom is indescribable.",
                                    fullStory: "Living with epilepsy was constant fear. Dr. Wilson found the right medication combination for me. I can drive again and live without constant worry.",
                                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                                },
                                {
                                    name: "Emily W.",
                                    diagnosis: "MS Warrior",
                                    quote: "The support system here is incredible. They treat the person, not just the disease.",
                                    fullStory: "Diagnosed with MS in my 20s, I was terrified. The team here helped me navigate treatment options and manage my symptoms so I can continue working and traveling.",
                                    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                                }
                            ].map((story, i) => (
                                <motion.div
                                    key={i}
                                    className="min-w-[300px] md:min-w-[400px] bg-teal-800/50 backdrop-blur-sm p-8 rounded-2xl border border-teal-700 snap-center flex-shrink-0 hover:bg-teal-800/70 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full object-cover border-2 border-teal-400" />
                                        <div>
                                            <h4 className="font-bold text-lg">{story.name}</h4>
                                            <p className="text-teal-300 text-sm">{story.diagnosis}</p>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="inline-block h-4 w-4 text-yellow-400 fill-current mr-1" />
                                        ))}
                                    </div>
                                    <p className="text-lg italic mb-4 leading-relaxed">"{story.quote}"</p>
                                    <details className="group">
                                        <summary className="text-teal-300 text-sm font-bold cursor-pointer hover:text-white transition-colors list-none flex items-center gap-2">
                                            Read Full Story <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                                        </summary>
                                        <p className="mt-4 text-gray-300 text-sm leading-relaxed animate-fadeIn">
                                            {story.fullStory}
                                        </p>
                                    </details>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Common questions about our neurology services.</p>
                    </div>
                    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                        <FaqItem
                            question="Do I need a referral to see a neurologist?"
                            answer="While some insurance plans require a referral, we also accept self-referrals for certain conditions. It is best to check with your insurance provider or call our office for guidance."
                        />
                        <FaqItem
                            question="What should I bring to my first appointment?"
                            answer="Please bring your photo ID, insurance card, a list of current medications, and any relevant medical records or imaging results (MRI/CT) from other providers."
                        />
                        <FaqItem
                            question="Do you offer telemedicine appointments?"
                            answer="Yes, we offer secure video consultations for follow-up visits and certain initial evaluations. Please ask our scheduling team about this option."
                        />
                        <FaqItem
                            question="What insurance plans do you accept?"
                            answer="We accept most major insurance plans, including Medicare and Medicaid. Please contact our billing department for a specific list of in-network providers."
                        />
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <div className="fixed bottom-6 right-6 z-40">
                <Link href="/emergency" className="flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-red-700 transition-all hover:scale-105 animate-pulse">
                    <Phone className="h-6 w-6" />
                    <div className="text-left">
                        <p className="text-xs font-bold uppercase opacity-90">Emergency</p>
                        <p className="font-bold text-lg leading-none">911 or Call Us</p>
                    </div>
                </Link>
            </div>

            <AnimatePresence>
                {selectedService && (
                    <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
