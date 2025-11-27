"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    HeartPulse,
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
    X
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
                        <HeartPulse className="h-6 w-6" />
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

export default function CardiologyPage() {
    const [conditions, setConditions] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch Conditions
        fetch('/api/cardiology/conditions')
            .then(res => res.json())
            .then(data => setConditions(data))
            .catch(err => console.error("Failed to fetch conditions", err));

        // Fetch Services
        fetch('/api/cardiology/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Failed to fetch services", err));

        // Fetch Real Reviews
        fetch('/api/reviews/department/Cardiology')
            .then(res => res.json())
            .then(data => {
                if (data.reviews && data.reviews.length > 0) {
                    setTestimonials(data.reviews.map(review => ({
                        name: review.reviewer?.name || 'Anonymous',
                        role: review.department || 'Cardiology Patient',
                        quote: review.comment || 'Excellent cardiac care!',
                        image: `https://ui-avatars.com/api/?name=${encodeURIComponent(review.reviewer?.name || 'User')}&background=0D9488&color=fff`,
                        rating: review.rating
                    })));
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch reviews", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-teal-900 text-white py-24 lg:py-32 overflow-hidden">
                {/* Heart Concept Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
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
                                    Department of Cardiology
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Expert Cardiology Care for <span className="text-teal-400">Heart Health</span>
                            </h1>
                            <p className="text-xl text-gray-200 mb-8 leading-relaxed font-light">
                                Combining world-class expertise with advanced technology to provide comprehensive care for your heart.
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
                    {/* Hero Image - Heart Concept */}
                    <div className="lg:w-1/2 hidden lg:block flex justify-center">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071&auto=format&fit=crop"
                            alt="Heart Health Concept"
                            className="rounded-3xl shadow-2xl border-4 border-white/10 max-h-[500px] object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Stats & Awards */}
            <section className="bg-white border-b border-gray-100 relative z-20 -mt-8 mx-4 lg:mx-auto max-w-6xl rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                    <div>
                        <h3 className="text-3xl font-bold text-teal-600 mb-1">5000+</h3>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Successful Surgeries</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-teal-600 mb-1">15+</h3>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Years of Excellence</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-teal-600 mb-1">24/7</h3>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Cardiac Emergency</p>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-teal-600 mb-1">Top 10</h3>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">National Ranking</p>
                    </div>
                </div>
            </section>

            {/* Conditions Treated - Accordion */}
            <section className="py-20 bg-teal-50">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Conditions We Treat</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Click on a condition to learn more about symptoms, risk factors, and treatment options.
                        </p>
                    </div>
                    <div className="space-y-4">
                        {conditions.map((condition) => (
                            <ConditionAccordion key={condition.id} condition={condition} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid - Modal Trigger */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Specialized Services</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore our advanced procedures. Click on any service for detailed information.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                onClick={() => setSelectedService(service)}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-gray-100 flex flex-col cursor-pointer"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-teal-900/0 transition-colors z-10"></div>
                                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                                        {service.shortDesc}
                                    </p>
                                    <span className="text-teal-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                                        View Details <ArrowRight className="h-4 w-4" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedService && (
                    <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
                )}
            </AnimatePresence>

            {/* Advanced Technology */}
            <section className="py-20 bg-gray-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6">Advanced Technology</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                We utilize the latest medical technology to ensure precise diagnosis and effective treatment. Our facilities are equipped with state-of-the-art machinery to handle complex cardiac cases.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-800 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Activity className="h-5 w-5 text-teal-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Hybrid Cath Lab</h4>
                                        <p className="text-gray-400 text-sm mt-1">Combines a traditional catheterization lab with a surgical suite for complex procedures.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-teal-800 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Activity className="h-5 w-5 text-teal-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">3D Echocardiography</h4>
                                        <p className="text-gray-400 text-sm mt-1">Provides real-time 3D images of the heart structure for accurate diagnosis.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="absolute -inset-4 bg-teal-500/20 rounded-full blur-3xl"></div>
                            <img
                                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop"
                                alt="Advanced Cath Lab"
                                className="rounded-2xl shadow-2xl relative z-10 border border-gray-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Patient Journey */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Journey to Heart Health</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We guide you through every step of your treatment with compassion and clarity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

                        {[
                            { step: "01", title: "Consultation", desc: "Meet with our experts for an initial assessment." },
                            { step: "02", title: "Diagnosis", desc: "Advanced tests to pinpoint the issue accurately." },
                            { step: "03", title: "Treatment", desc: "Personalized care plan tailored to your needs." },
                            { step: "04", title: "Recovery", desc: "Ongoing support and rehabilitation for long-term health." }
                        ].map((item, i) => (
                            <div key={i} className="text-center bg-white pt-4 group">
                                <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg border-4 border-white group-hover:scale-110 transition-transform duration-300">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet the Team */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Specialists</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Dr. Rajesh Kumar",
                                role: "Chief Cardiologist",
                                spec: "Interventional Cardiology",
                                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80"
                            },
                            {
                                name: "Dr. Priya Sharma",
                                role: "Senior Cardiologist",
                                spec: "Electrophysiology",
                                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                            },
                            {
                                name: "Dr. Amit Patel",
                                role: "Cardiac Surgeon",
                                spec: "Cardiac Surgery",
                                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
                            }
                        ].map((doc, i) => (
                            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                                <div className="h-80 bg-gray-200 relative overflow-hidden">
                                    <img
                                        src={doc.image}
                                        alt={doc.name}
                                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                        <span className="text-white font-medium text-sm">View Profile</span>
                                    </div>
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{doc.name}</h3>
                                    <p className="text-teal-600 font-medium text-sm mb-2">{doc.role}</p>
                                    <p className="text-gray-500 text-xs mb-6 uppercase tracking-wide">{doc.spec}</p>
                                    <Link href="/appointments" className="inline-block w-full py-3 rounded-lg border border-teal-600 text-teal-600 font-semibold hover:bg-teal-600 hover:text-white transition-colors">
                                        Book Appointment
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Patient Stories</h2>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin h-12 w-12 border-4 border-teal-600 border-t-transparent rounded-full mx-auto"></div>
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="bg-gray-50 p-12 rounded-2xl text-center max-w-2xl mx-auto">
                            <p className="text-gray-600">No reviews yet. Be the first to share your cardiology experience!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.slice(0, 3).map((t, i) => (
                                <div key={i} className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{t.name}</h4>
                                            <p className="text-xs text-teal-600 font-medium uppercase">{t.role}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-400 mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${star <= (t.rating || 5)
                                                        ? 'fill-current'
                                                        : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-gray-600 italic leading-relaxed">
                                        "{t.quote}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Emergency Section */}
            <section className="bg-red-600 text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                            <Phone className="h-10 w-10 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Cardiac Emergency?</h2>
                            <p className="text-red-100 text-lg">We are available 24/7 for immediate assistance.</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="tel:911" className="bg-white text-red-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors text-center shadow-lg">
                            Call Emergency: 911
                        </a>
                        <Link href="/contact" className="bg-red-700 text-white border-2 border-red-400 px-10 py-4 rounded-full font-bold hover:bg-red-800 transition-colors text-center">
                            Request Callback
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-2">
                        <FaqItem
                            question="What are the early signs of a heart attack?"
                            answer="Common signs include chest pain or discomfort, shortness of breath, pain in the arm or jaw, nausea, and cold sweats. If you experience these, seek emergency care immediately."
                        />
                        <FaqItem
                            question="How often should I get a heart checkup?"
                            answer="It is recommended to start regular screenings at age 20. If you have risk factors like high blood pressure, diabetes, or family history, you may need more frequent checkups."
                        />
                        <FaqItem
                            question="Do you offer cardiac rehabilitation?"
                            answer="Yes, we have a comprehensive cardiac rehabilitation program designed to help patients recover and improve their heart health after surgery or a heart attack."
                        />
                        <FaqItem
                            question="What insurance plans do you accept?"
                            answer="We accept most major insurance plans. Please contact our billing department or check our insurance page for a detailed list."
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
