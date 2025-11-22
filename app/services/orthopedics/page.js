"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Bone,
    Activity,
    Heart,
    ShieldCheck,
    Phone,
    Calendar,
    ChevronDown,
    ChevronUp,
    ArrowRight,
    ArrowLeft,
    Star,
    X,
    Users,
    Award,
    Zap,
    FileText,
    Video,
    CheckCircle,
    Stethoscope
} from "lucide-react";

const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border-4 border-orange-300"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors z-10">
                    <X className="h-6 w-6 text-orange-700" />
                </button>

                <div className="h-64 relative">
                    <img src={service.image} alt={`Orthopedic procedure - ${service.title}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 to-transparent flex items-end p-8">
                        <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                            <Activity className="h-6 w-6" /> Overview
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{service.fullDesc}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5" /> Procedure Steps
                            </h4>
                            <ul className="space-y-3">
                                {service.procedureSteps.map((step, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                        <span className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                            <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5" /> Eligibility
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                {service.eligibility}
                            </p>
                            <Link href="/appointments" className="block w-full py-3 bg-green-500 text-white text-center rounded-xl font-bold hover:bg-green-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1">
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ConditionCard = ({ condition }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-200 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isOpen ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'} transition-colors`}>
                        <Bone className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-lg text-gray-800">{condition.name}</span>
                </div>
                {isOpen ? <ChevronUp className="h-5 w-5 text-orange-500" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 border-t border-gray-100 bg-orange-50/30">
                            <div className="flex flex-col md:flex-row gap-6 mt-4">
                                <div className="md:w-2/3 space-y-4">
                                    <p className="text-gray-600">{condition.description}</p>
                                    <div>
                                        <h4 className="font-bold text-orange-700 text-sm mb-2">Symptoms:</h4>
                                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-1">
                                            {condition.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-orange-700 text-sm mb-2">Diagnosis:</h4>
                                        <p className="text-gray-600 text-sm">{condition.diagnosis}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-orange-700 text-sm mb-2">Treatment:</h4>
                                        <p className="text-gray-600 text-sm">{condition.treatment}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-orange-700 text-sm mb-2">Prevention:</h4>
                                        <p className="text-gray-600 text-sm">{condition.prevention}</p>
                                    </div>
                                </div>
                                <div className="md:w-1/3">
                                    <img src={condition.image} alt={`Orthopedic condition - ${condition.name}`} className="rounded-xl shadow-md w-full h-48 object-cover" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ResourceModal = ({ resource, onClose }) => {
    if (!resource) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border-4 border-orange-300"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors z-10">
                    <X className="h-6 w-6 text-orange-700" />
                </button>

                <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${resource.color}`}>
                            {resource.icon === 'FileText' && <FileText className="h-8 w-8" />}
                            {resource.icon === 'Video' && <Video className="h-8 w-8" />}
                            {resource.icon === 'Stethoscope' && <Stethoscope className="h-8 w-8" />}
                            {resource.icon === 'Calendar' && <Calendar className="h-8 w-8" />}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{resource.title}</h2>
                            <p className="text-gray-600">{resource.description}</p>
                        </div>
                    </div>

                    {/* Video Section */}
                    {resource.videoUrl && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                                <Video className="h-6 w-6" /> Instructional Video
                            </h3>
                            <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={resource.videoUrl}
                                    title={resource.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {/* Content Sections */}
                    <div className="space-y-6">
                        {resource.content && resource.content.map((section, idx) => (
                            <div key={idx} className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                                <h4 className="font-bold text-orange-800 mb-4 text-lg">{section.section}</h4>
                                <ul className="space-y-3">
                                    {section.points.map((point, i) => (
                                        <li key={i} className="flex items-start gap-3 text-gray-700">
                                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default function OrthopedicsPage() {
    const [services, setServices] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [resources, setResources] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedResource, setSelectedResource] = useState(null);

    useEffect(() => {
        fetch('/api/orthopedics/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Failed to fetch services", err));

        fetch('/api/orthopedics/conditions')
            .then(res => res.json())
            .then(data => setConditions(data))
            .catch(err => console.error("Failed to fetch conditions", err));

        fetch('/api/orthopedics/resources')
            .then(res => res.json())
            .then(data => setResources(data))
            .catch(err => console.error("Failed to fetch resources", err));
    }, []);

    return (
        <div className="min-h-screen bg-orange-50/20 font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-orange-600 to-red-600 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579684385180-1ea67fbc3faa?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-15 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/50 to-red-900/50"></div>

                {/* Decorative Shapes */}
                <div className="absolute top-20 left-10 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link href="/services" className="inline-flex items-center gap-2 text-orange-100 hover:text-white mb-6 transition-colors font-bold bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" /> Back to Services
                            </Link>
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                                Advanced Orthopedic Care for <span className="text-yellow-300">Every Joint and Bone.</span>
                            </h1>
                            <p className="text-xl text-orange-50 mb-8 leading-relaxed font-medium max-w-lg">
                                Trusted experts, modern technology, and patient-centered recovery for lifelong mobility.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/appointments" className="bg-yellow-400 text-orange-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/50 hover:scale-105 flex items-center gap-2 text-lg">
                                    <Calendar className="h-5 w-5" /> Book Consultation
                                </Link>
                                <Link href="#team" className="bg-white/20 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all backdrop-blur-sm text-lg">
                                    Meet Our Specialists
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1000&q=80"
                                alt="Indian orthopedic doctor consulting with patient about joint replacement"
                                className="rounded-[3rem] shadow-2xl border-8 border-white/20 -rotate-3 hover:rotate-0 transition-transform duration-500"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trust Builders */}
            <section className="bg-white py-12 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-orange-600">
                                <Award className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">15,000+</h3>
                            <p className="text-gray-500 text-sm">Surgeries Performed</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                <ShieldCheck className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">JCI Accredited</h3>
                            <p className="text-gray-500 text-sm">International Standards</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                                <Zap className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">Robotic Surgery</h3>
                            <p className="text-gray-500 text-sm">Latest Technology</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
                                <Heart className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">98% Success</h3>
                            <p className="text-gray-500 text-sm">Patient Satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="bg-orange-100 text-orange-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">Our Services</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-4">Comprehensive Orthopedic Solutions</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            From joint replacement to sports medicine, we offer complete care for all bone and joint conditions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-orange-300 transition-all cursor-pointer group"
                                onClick={() => setSelectedService(service)}
                            >
                                <div className="h-48 overflow-hidden relative">
                                    <img src={service.image} alt={`Orthopedic care - ${service.title}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                                        <ArrowRight className="h-4 w-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{service.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{service.shortDesc}</p>
                                    <span className="text-orange-600 font-bold text-xs uppercase tracking-wide group-hover:underline">Learn More</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet Our Team */}
            <section id="team" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Orthopedic Specialists</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Board-certified surgeons with decades of combined experience in orthopedic care.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Dr. Rajesh Verma", role: "Chief Orthopedic Surgeon", specialty: "Joint Replacement & Trauma", experience: "25+ years", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80" },
                            { name: "Dr. Priya Kapoor", role: "Sports Medicine Specialist", specialty: "Arthroscopy & Sports Injuries", experience: "18+ years", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80" },
                            { name: "Dr. Anil Sharma", role: "Spine Surgeon", specialty: "Minimally Invasive Spine Surgery", experience: "20+ years", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80" }
                        ].map((doctor, i) => (
                            <div key={i} className="bg-gray-50 rounded-3xl overflow-hidden hover:shadow-xl transition-all border border-gray-100 hover:border-orange-200">
                                <div className="h-72 overflow-hidden">
                                    <img src={doctor.image} alt={`Indian orthopedic surgeon ${doctor.name}`} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                                    <p className="text-orange-600 font-medium mb-2">{doctor.role}</p>
                                    <p className="text-gray-600 text-sm mb-1">{doctor.specialty}</p>
                                    <p className="text-gray-500 text-xs mb-6">{doctor.experience} Experience</p>
                                    <Link href="/appointments" className="inline-block bg-orange-100 text-orange-700 px-6 py-2 rounded-full font-bold hover:bg-orange-200 transition-colors text-sm">
                                        Book Appointment
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conditions Treated */}
            <section className="py-20 bg-orange-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Conditions We Treat</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Expert diagnosis and treatment for a wide range of bone and joint conditions.
                        </p>
                    </div>
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {conditions.map((condition) => (
                            <ConditionCard key={condition.id} condition={condition} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Recovery Stories Carousel */}
            <section className="py-20 bg-gradient-to-br from-orange-500 to-red-500 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Recovery Success Stories</h2>
                        <p className="text-orange-100 max-w-2xl mx-auto font-medium">
                            Real patients, real results. Hear from those who've regained their mobility and quality of life.
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
                                    name: "Ramesh Patel",
                                    condition: "Total Knee Replacement",
                                    year: "2023",
                                    quote: "After years of pain, I can now walk without difficulty. Dr. Verma's expertise changed my life!",
                                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    name: "Anjali Desai",
                                    condition: "ACL Reconstruction",
                                    year: "2024",
                                    quote: "Back to playing badminton just 6 months after surgery. The sports medicine team is incredible!",
                                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    name: "Vikram Singh",
                                    condition: "Spine Surgery",
                                    year: "2023",
                                    quote: "No more back pain! I can work and play with my grandchildren again. Forever grateful.",
                                    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    name: "Meera Reddy",
                                    condition: "Hip Replacement",
                                    year: "2024",
                                    quote: "The minimally invasive approach meant faster recovery. I was walking the next day!",
                                    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                                }
                            ].map((story, i) => (
                                <motion.div
                                    key={i}
                                    className="min-w-[300px] md:min-w-[400px] bg-white p-8 rounded-3xl shadow-lg snap-center flex-shrink-0 border-b-8 border-orange-400"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <img src={story.image} alt={`Indian patient ${story.name}`} className="w-16 h-16 rounded-full object-cover border-2 border-orange-400" />
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900">{story.name}</h4>
                                            <p className="text-gray-500 text-sm">{story.condition}</p>
                                            <p className="text-orange-600 text-xs font-bold">{story.year}</p>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} className="inline-block h-5 w-5 text-yellow-400 fill-current mr-1" />
                                        ))}
                                    </div>
                                    <p className="text-lg italic text-gray-700 leading-relaxed">"{story.quote}"</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Technology & Facilities */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Technology</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            State-of-the-art equipment and techniques for superior outcomes.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Robotic Joint Surgery", desc: "Precision-guided robotic assistance for perfect implant placement.", icon: Zap },
                            { title: "3D Imaging Suite", desc: "Advanced CT and MRI for accurate diagnosis and surgical planning.", icon: Activity },
                            { title: "Rehab Center", desc: "Fully equipped physiotherapy center with expert therapists.", icon: Heart }
                        ].map((tech, i) => (
                            <div key={i} className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6 text-white">
                                    <tech.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.title}</h3>
                                <p className="text-gray-600">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Rehabilitation Resources */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Recovery Resources</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Helpful guides and information to support your recovery journey.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {resources.map((resource, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedResource(resource)}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group cursor-pointer hover:border-orange-300"
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${resource.color} mb-4 group-hover:scale-110 transition-transform`}>
                                    {resource.icon === 'FileText' && <FileText className="h-6 w-6" />}
                                    {resource.icon === 'Video' && <Video className="h-6 w-6" />}
                                    {resource.icon === 'Stethoscope' && <Stethoscope className="h-6 w-6" />}
                                    {resource.icon === 'Calendar' && <Calendar className="h-6 w-6" />}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{resource.title}</h3>
                                <p className="text-gray-500 text-sm">{resource.description}</p>
                                <div className="mt-4 flex items-center gap-2 text-orange-600 font-semibold text-sm">
                                    <span>View Details</span>
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency Contact - Floating */}
            <div className="fixed bottom-6 right-6 z-40">
                <a href="tel:911" className="flex items-center gap-3 bg-red-500 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-red-600 transition-all hover:scale-105 animate-bounce-slow border-4 border-white">
                    <Phone className="h-6 w-6" />
                    <div className="text-left">
                        <p className="text-xs font-bold uppercase opacity-90">Trauma Emergency</p>
                        <p className="font-bold text-lg leading-none">Call 911</p>
                    </div>
                </a>
            </div>

            <AnimatePresence>
                {selectedService && (
                    <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
                )}
                {selectedResource && (
                    <ResourceModal resource={selectedResource} onClose={() => setSelectedResource(null)} />
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
