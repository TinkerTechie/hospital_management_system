"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Microscope,
    Activity,
    Calendar,
    CheckCircle,
    ChevronRight,
    Star,
    Award,
    Clock,
    Shield,
    FileText,
    ArrowRight,
    X,
    ChevronLeft,
    ChevronDown,
    ChevronUp,
    MapPin,
    Phone,
    User,
    Search
} from "lucide-react";

// Service Modal Component
const ServiceModal = ({ service, onClose }) => {
    const [step, setStep] = useState('details'); // details, booking, payment, success
    const [bookingType, setBookingType] = useState('lab'); // lab, home
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        address: '',
        city: '',
        pincode: ''
    });

    if (!service) return null;

    const handleBookClick = () => setStep('booking');

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        setStep('payment');
    };

    const handlePaymentSubmit = () => {
        setStep('success');
    };

    const totalAmount = bookingType === 'home' ? service.price + 150 : service.price;

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
                    <X className="h-6 w-6 text-gray-600" />
                </button>

                {step === 'details' && (
                    <div className="p-0">
                        <div className="relative h-64">
                            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                                <div>
                                    <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">{service.category}</span>
                                    <h2 className="text-3xl font-bold text-white">{service.name}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <p className="text-gray-600 leading-relaxed text-lg mb-8">{service.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                                            <Activity className="h-5 w-5" />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-600">Price</p>
                                    </div>
                                    <p className="text-3xl font-bold text-teal-700">₹{service.price}</p>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-600">Turnaround Time</p>
                                    </div>
                                    <p className="text-3xl font-bold text-blue-700">{service.duration}</p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-teal-600" /> Preparation Required
                                </h3>
                                <ul className="space-y-3 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    {service.preparation.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button
                                onClick={handleBookClick}
                                className="block w-full py-4 bg-teal-600 text-white text-center rounded-xl font-bold text-lg hover:bg-teal-700 transition-colors shadow-lg hover:shadow-teal-500/30"
                            >
                                Book Appointment Now
                            </button>
                        </div>
                    </div>
                )}

                {step === 'booking' && (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Book {service.name}</h2>

                        <form onSubmit={handleBookingSubmit} className="space-y-6">
                            {/* Booking Type Selection */}
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    onClick={() => setBookingType('lab')}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${bookingType === 'lab' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-200'}`}
                                >
                                    <div className={`p-3 rounded-full ${bookingType === 'lab' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${bookingType === 'lab' ? 'text-teal-900' : 'text-gray-700'}`}>Lab Visit</h3>
                                        <p className="text-xs text-gray-500">Visit our center</p>
                                    </div>
                                </div>

                                <div
                                    onClick={() => setBookingType('home')}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-2 ${bookingType === 'home' ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-200'}`}
                                >
                                    <div className={`p-3 rounded-full ${bookingType === 'home' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${bookingType === 'home' ? 'text-teal-900' : 'text-gray-700'}`}>Home Collection</h3>
                                        <p className="text-xs text-gray-500">+ ₹150 charge</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                            placeholder="Mobile Number"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                                        <select
                                            required
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        >
                                            <option value="">Select Time</option>
                                            <option value="08:00">08:00 AM</option>
                                            <option value="09:00">09:00 AM</option>
                                            <option value="10:00">10:00 AM</option>
                                            <option value="11:00">11:00 AM</option>
                                            <option value="12:00">12:00 PM</option>
                                            <option value="16:00">04:00 PM</option>
                                            <option value="17:00">05:00 PM</option>
                                            <option value="18:00">06:00 PM</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Address Fields - Only for Home Collection */}
                                {bookingType === 'home' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-4 pt-2 border-t border-gray-100"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
                                            <textarea
                                                required
                                                rows="2"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                                placeholder="House No, Street, Area"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                                    placeholder="City"
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                                    placeholder="Pincode"
                                                    value={formData.pincode}
                                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-600">Total Amount</span>
                                    <span className="text-2xl font-bold text-teal-700">
                                        ₹{totalAmount}
                                    </span>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep('details')}
                                        className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg"
                                    >
                                        Proceed to Pay
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {step === 'payment' && (
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>

                        <div className="bg-gray-50 rounded-xl p-6 mb-8">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Order Summary</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Service</span>
                                    <span className="font-medium text-gray-900">{service.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date & Time</span>
                                    <span className="font-medium text-gray-900">{formData.date} at {formData.time}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Test Price</span>
                                    <span className="font-medium text-gray-900">₹{service.price}</span>
                                </div>
                                {bookingType === 'home' && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Home Collection Charge</span>
                                        <span className="font-medium text-gray-900">₹150</span>
                                    </div>
                                )}
                                <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-lg font-bold">
                                    <span className="text-teal-700">Total Payable</span>
                                    <span className="text-teal-700">₹{totalAmount}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Select Payment Method</h3>

                            {['card', 'upi', 'netbanking', 'cash'].map((method) => (
                                <div
                                    key={method}
                                    onClick={() => setPaymentMethod(method)}
                                    className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all ${paymentMethod === method ? 'border-teal-600 bg-teal-50' : 'border-gray-200 hover:border-teal-200'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method ? 'border-teal-600' : 'border-gray-300'}`}>
                                            {paymentMethod === method && <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />}
                                        </div>
                                        <span className="font-medium text-gray-700 capitalize">
                                            {method === 'card' ? 'Credit / Debit Card' :
                                                method === 'upi' ? 'UPI (GPay, PhonePe)' :
                                                    method === 'netbanking' ? 'Net Banking' : 'Cash on Collection'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('booking')}
                                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handlePaymentSubmit}
                                className="flex-[2] py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors shadow-lg"
                            >
                                Pay & Confirm
                            </button>
                        </div>
                    </div>
                )}

                {step === 'success' && (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Your appointment for <span className="font-bold text-gray-900">{service.name}</span> has been scheduled successfully.
                        </p>
                        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left max-w-sm mx-auto">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Booking ID</span>
                                <span className="font-mono font-bold">#DIA-{Math.floor(Math.random() * 10000)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Date</span>
                                <span className="font-medium">{formData.date}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Time</span>
                                <span className="font-medium">{formData.time}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-500">Mode</span>
                                <span className="font-medium text-teal-600">{bookingType === 'lab' ? 'Lab Visit' : 'Home Collection'}</span>
                            </div>
                            {bookingType === 'home' && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 mb-1">Collection Address</p>
                                    <p className="text-sm font-medium">{formData.address}, {formData.city} - {formData.pincode}</p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition-colors"
                        >
                            Done
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

// FAQ Item Component
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-teal-200 transition-colors">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors"
            >
                <span className="font-bold text-gray-800 text-lg">{question}</span>
                {isOpen ? <ChevronUp className="h-5 w-5 text-teal-600" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50"
                    >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function DiagnosticsPage() {
    const [services, setServices] = useState([]);
    const [packages, setPackages] = useState([]);
    const [experts, setExperts] = useState([]);
    const [facilities, setFacilities] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [currentFacility, setCurrentFacility] = useState(0);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        // Fetch Services
        fetch('/api/diagnostics/services')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setServices(data);
                else setServices([]);
            })
            .catch(err => console.error("Failed to fetch services", err));

        // Fetch Packages
        fetch('/api/diagnostics/packages')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setPackages(data);
                else setPackages([]);
            })
            .catch(err => console.error("Failed to fetch packages", err));

        // Fetch Experts
        fetch('/api/diagnostics/experts')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setExperts(data);
                else setExperts([]);
            })
            .catch(err => console.error("Failed to fetch experts", err));

        // Fetch Facilities
        fetch('/api/diagnostics/facilities')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setFacilities(data);
                else setFacilities([]);
            })
            .catch(err => console.error("Failed to fetch facilities", err));
    }, []);

    const nextFacility = () => {
        setCurrentFacility((prev) => (prev + 1) % facilities.length);
    };

    const prevFacility = () => {
        setCurrentFacility((prev) => (prev - 1 + facilities.length) % facilities.length);
    };

    const testimonials = [
        {
            name: "Priya Sharma",
            role: "Patient",
            test: "Executive Health Checkup",
            quote: "The entire process was seamless. From booking online to the home sample collection, everything was professional. I got my reports the same evening via email.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Rajesh Kumar",
            role: "Patient",
            test: "Diabetes Screening",
            quote: "I was worried about my tests, but the staff at Medicare made me feel very comfortable. The phlebotomist was skilled and painless. Highly recommended!",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
        },
        {
            name: "Anita Desai",
            role: "Patient",
            test: "MRI Scan",
            quote: "State-of-the-art facility indeed. The MRI suite was clean and modern. The radiologist took the time to explain the procedure, which really helped my anxiety.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80"
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-teal-900 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-950 via-teal-900/90 to-transparent"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <span className="bg-teal-500/20 text-teal-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-teal-500/30 backdrop-blur-sm">
                                    Advanced Diagnostics
                                </span>
                                <span className="h-px w-12 bg-teal-500/50"></span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
                                Precision in <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-200">Every Result.</span>
                            </h1>

                            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-xl font-light">
                                Experience world-class diagnostic services with state-of-the-art technology and expert care. Fast, accurate, and reliable results you can trust.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="#services" className="bg-teal-500 text-white px-8 py-4 rounded-full font-bold hover:bg-teal-400 transition-all shadow-lg hover:shadow-teal-500/40 flex items-center justify-center gap-2 group">
                                    Book a Test <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="#services" className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center">
                                    View Services
                                </Link>
                            </div>

                            <div className="mt-12 flex items-center gap-8 text-sm font-medium text-gray-400">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-teal-400" /> NABL Accredited
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-teal-400" /> 24/7 Labs
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-teal-400" /> Home Collection
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Booking Workflow - Visual Guide */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

                        {[
                            { step: "01", title: "Select Test", desc: "Choose from our wide range of tests", icon: Search, action: () => document.getElementById('services').scrollIntoView({ behavior: 'smooth' }) },
                            { step: "02", title: "Book Slot", desc: "Pick a time or request home collection", icon: Calendar, action: () => document.getElementById('services').scrollIntoView({ behavior: 'smooth' }) },
                            { step: "03", title: "Sample Collection", desc: "Track status online", icon: Activity, action: () => window.location.href = '/diagnostics/track' },
                            { step: "04", title: "Get Report", desc: "Download report instantly", icon: FileText, action: () => window.location.href = '/diagnostics/track' }
                        ].map((item, i) => (
                            <div
                                key={i}
                                onClick={item.action}
                                className={`text-center group transition-all ${item.action ? 'cursor-pointer hover:-translate-y-2' : ''}`}
                            >
                                <div className={`w-16 h-16 bg-white border-2 border-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-4 shadow-sm group-hover:border-teal-500 group-hover:shadow-md transition-all relative z-10 ${item.action ? 'group-hover:bg-teal-50' : ''}`}>
                                    <item.icon className="h-7 w-7" />
                                </div>
                                <h3 className={`text-lg font-bold text-gray-900 mb-1 ${item.action ? 'group-hover:text-teal-600' : ''}`}>{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">Our Services</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Comprehensive Diagnostics</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            From routine blood tests to advanced imaging, we offer a complete range of diagnostic services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedService(service)}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer group flex flex-col h-full"
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img src={service.image} alt={service.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-teal-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                            {service.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{service.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{service.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium uppercase">Price</p>
                                            <p className="text-lg font-bold text-teal-700">₹{service.price}</p>
                                        </div>
                                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                            <ArrowRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedService && (
                    <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
                )}
            </AnimatePresence>

            {/* Popular Packages */}
            <section id="packages" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="text-purple-600 font-bold tracking-wider uppercase text-sm">Health Packages</span>
                            <h2 className="text-4xl font-bold text-gray-900 mt-2">Preventive Health Checkups</h2>
                        </div>
                        <Link href="#packages" className="text-purple-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            View All Packages <ArrowRight className="h-5 w-5" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packages.map((pkg) => (
                            <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100 group relative flex flex-col h-full">
                                {pkg.popular && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-600 to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl z-10 shadow-lg">
                                        MOST POPULAR
                                    </div>
                                )}
                                <div className="h-56 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                                    <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute bottom-6 left-6 z-20">
                                        <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
                                        <p className="text-purple-100 text-sm">{pkg.tests.length} Tests Included</p>
                                    </div>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">{pkg.description}</p>

                                    <div className="space-y-3 mb-8 flex-grow">
                                        {pkg.tests.slice(0, 5).map((test, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                                <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle className="h-3 w-3 text-purple-600" />
                                                </div>
                                                {test}
                                            </div>
                                        ))}
                                        {pkg.tests.length > 5 && (
                                            <p className="text-sm text-purple-600 font-semibold pl-8">+{pkg.tests.length - 5} more tests</p>
                                        )}
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <div className="flex items-end gap-3 mb-4">
                                            <span className="text-3xl font-bold text-gray-900">₹{pkg.discountPrice || pkg.price}</span>
                                            {pkg.discountPrice && (
                                                <span className="text-gray-400 line-through mb-1">₹{pkg.price}</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setSelectedService({
                                                name: pkg.name,
                                                description: pkg.description,
                                                price: pkg.discountPrice || pkg.price,
                                                image: pkg.image,
                                                category: "Health Package",
                                                duration: "24-48 Hours",
                                                preparation: ["Fasting required (10-12 hours)", "Drink water only", "Avoid alcohol 24h prior"]
                                            })}
                                            className="block w-full py-3 bg-gray-900 text-white text-center rounded-xl font-bold hover:bg-purple-600 transition-colors"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Facilities Gallery */}
            <section className="py-24 bg-gray-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/3">
                            <span className="text-teal-400 font-bold tracking-wider uppercase text-sm">Infrastructure</span>
                            <h2 className="text-4xl font-bold mt-2 mb-6">World-Class Facilities</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Our labs are equipped with the latest automated analyzers from Roche, Siemens, and Abbott to ensure 100% accuracy and rapid turnaround times.
                            </p>

                            <div className="flex gap-4">
                                <button onClick={prevFacility} className="p-4 rounded-full border border-gray-700 hover:bg-teal-500 hover:border-teal-500 hover:text-white transition-all">
                                    <ChevronLeft className="h-6 w-6" />
                                </button>
                                <button onClick={nextFacility} className="p-4 rounded-full border border-gray-700 hover:bg-teal-500 hover:border-teal-500 hover:text-white transition-all">
                                    <ChevronRight className="h-6 w-6" />
                                </button>
                            </div>
                        </div>

                        <div className="md:w-2/3 w-full">
                            {facilities.length > 0 && (
                                <motion.div
                                    key={currentFacility}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl"
                                >
                                    <img
                                        src={facilities[currentFacility].image}
                                        alt={facilities[currentFacility].name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8">
                                        <h3 className="text-2xl font-bold mb-2">{facilities[currentFacility].name}</h3>
                                        <p className="text-gray-300">{facilities[currentFacility].description}</p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Expert Team */}
            <section className="py-24 bg-teal-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-teal-600 font-bold tracking-wider uppercase text-sm">Our Team</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Meet Our Experts</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Led by experienced pathologists and radiologists dedicated to clinical excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {experts.map((expert) => (
                            <div key={expert.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                                <div className="h-72 overflow-hidden relative">
                                    <img
                                        src={expert.image}
                                        alt={expert.name}
                                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <p className="text-white text-sm font-medium">{expert.experience} Experience</p>
                                    </div>
                                </div>
                                <div className="p-6 text-center relative">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mt-4 mb-1">{expert.name}</h3>
                                    <p className="text-teal-600 font-medium text-sm mb-3">{expert.role}</p>
                                    <p className="text-gray-500 text-xs uppercase tracking-wide">{expert.specialization}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Slider */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Patient Stories</h2>
                    </div>

                    <div className="relative bg-teal-50 rounded-3xl p-8 md:p-12">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                <img
                                    src={testimonials[currentTestimonial].image}
                                    alt={testimonials[currentTestimonial].name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <div className="flex justify-center md:justify-start gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-xl md:text-2xl text-gray-800 italic mb-6 font-light leading-relaxed">
                                    "{testimonials[currentTestimonial].quote}"
                                </p>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</h4>
                                    <p className="text-teal-600 text-sm">{testimonials[currentTestimonial].test}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center gap-3 mt-8">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentTestimonial(i)}
                                    className={`w-3 h-3 rounded-full transition-all ${i === currentTestimonial ? 'bg-teal-600 w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section id="faqs" className="py-24 bg-gray-50">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600">Everything you need to know about our diagnostic services.</p>
                    </div>

                    <div className="space-y-4">
                        <FaqItem
                            question="How long does it take to get test results?"
                            answer="Most routine blood tests are available within 4-6 hours. Complex tests like MRI or specialized panels may take 24-48 hours. We'll inform you of the exact timeline when you book."
                        />
                        <FaqItem
                            question="Do you offer home sample collection?"
                            answer="Yes! We offer free home sample collection for most blood tests and urine analysis. Simply book online or call us to schedule a convenient time."
                        />
                        <FaqItem
                            question="Are your labs NABL accredited?"
                            answer="Yes, all our laboratories are NABL (National Accreditation Board for Testing and Calibration Laboratories) accredited, ensuring the highest quality standards."
                        />
                        <FaqItem
                            question="Can I get a discount on health packages?"
                            answer="Yes, our health packages are already discounted compared to individual test prices. We also offer seasonal promotions and corporate packages."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-teal-600 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Prioritize Your Health Today</h2>
                    <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
                        Don't wait for symptoms. Early detection is the key to a healthy life. Book your test now.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="#services" className="bg-white text-teal-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-teal-50 transition-colors shadow-xl">
                            Book Appointment
                        </Link>
                        <Link href="/contact" className="bg-teal-700 border border-teal-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-teal-800 transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
