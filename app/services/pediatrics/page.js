"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Baby,
    Stethoscope,
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
    Smile,
    Users,
    Clock,
    MapPin,
    FileText,
    Video,
    CheckCircle
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
                className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative border-4 border-yellow-300"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors z-10">
                    <X className="h-6 w-6 text-yellow-700" />
                </button>

                <div className="h-64 relative">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent flex items-end p-8">
                        <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                    </div>
                </div>

                <div className="p-8 space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-teal-600 mb-3 flex items-center gap-2">
                            <Smile className="h-6 w-6" /> Overview
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">{service.fullDesc}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                            <h4 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                                <Activity className="h-5 w-5" /> What to Expect
                            </h4>
                            <ul className="space-y-3">
                                {service.procedureSteps.map((step, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                        <span className="w-6 h-6 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                                <Users className="h-5 w-5" /> Who is this for?
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                {service.eligibility}
                            </p>
                            <Link href="/appointments" className="block w-full py-3 bg-blue-500 text-white text-center rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1">
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ResourceModal = ({ resource, onClose }) => {
    if (!resource) return null;

    const resourceContent = {
        "Newborn Care Guide": {
            content: [
                { title: "Feeding", desc: "Breastfeed every 2-3 hours or formula feed as directed. Watch for hunger cues." },
                { title: "Sleep", desc: "Newborns sleep 16-17 hours a day. Always place baby on back to sleep." },
                { title: "Diapering", desc: "Change diapers every 2-3 hours. Clean thoroughly and apply barrier cream." },
                { title: "Bathing", desc: "Sponge baths until umbilical cord falls off, then gentle tub baths 2-3 times weekly." },
                { title: "Safety", desc: "Never leave baby unattended. Keep small objects away. Use car seat properly." }
            ]
        },
        "Vaccine Schedule": {
            content: [
                { title: "Birth", desc: "Hepatitis B (1st dose)" },
                { title: "2 Months", desc: "DTaP, IPV, Hib, PCV13, Rotavirus, Hepatitis B (2nd dose)" },
                { title: "4 Months", desc: "DTaP, IPV, Hib, PCV13, Rotavirus" },
                { title: "6 Months", desc: "DTaP, IPV, Hib, PCV13, Rotavirus, Hepatitis B (3rd dose)" },
                { title: "12-15 Months", desc: "MMR, Varicella, Hib, PCV13" },
                { title: "4-6 Years", desc: "DTaP, IPV, MMR, Varicella" }
            ]
        },
        "Growth Charts": {
            content: [
                { title: "Weight", desc: "Track weight gain to ensure proper nutrition. Babies typically double birth weight by 5-6 months." },
                { title: "Height/Length", desc: "Measure length at each visit. Growth should follow a consistent curve." },
                { title: "Head Circumference", desc: "Monitors brain growth. Measured until age 2." },
                { title: "WHO Standards", desc: "We use WHO growth charts for children 0-2 years and CDC charts for 2+ years." },
                { title: "Percentiles", desc: "Your child's position relative to other children. Consistency is more important than specific percentile." }
            ]
        },
        "Nutrition Tips": {
            content: [
                { title: "0-6 Months", desc: "Exclusive breastfeeding or formula. No water, juice, or solid foods." },
                { title: "6-12 Months", desc: "Introduce iron-fortified cereals, pureed fruits/vegetables, then soft finger foods." },
                { title: "Toddlers", desc: "Offer variety of healthy foods. Limit juice and sugary drinks. Encourage self-feeding." },
                { title: "Healthy Habits", desc: "Family meals, no screen time during meals, respect hunger/fullness cues." },
                { title: "Allergies", desc: "Introduce common allergens early (peanuts, eggs, dairy) unless advised otherwise." }
            ]
        },
        "Educational Videos": {
            content: [
                { title: "Coming Soon!", desc: "We're creating helpful video content on:" },
                { title: "CPR & First Aid", desc: "Life-saving techniques every parent should know" },
                { title: "Developmental Milestones", desc: "What to expect at each age and stage" },
                { title: "Common Illnesses", desc: "Recognizing and managing fever, colds, and more" },
                { title: "Parenting Tips", desc: "Expert advice on sleep training, discipline, and bonding" }
            ]
        },
        "Symptom Checker": {
            content: [
                { title: "Fever (>100.4°F)", desc: "Call immediately if under 3 months. For older babies, monitor and call if lasts >3 days." },
                { title: "Cough/Cold", desc: "Normal for kids. Call if breathing difficulty, won't eat/drink, or lasts >10 days." },
                { title: "Rash", desc: "Most are harmless. Call if accompanied by fever, spreading rapidly, or painful." },
                { title: "Vomiting/Diarrhea", desc: "Watch for dehydration signs. Call if blood present or severe." },
                { title: "When to Call 911", desc: "Difficulty breathing, unresponsive, seizure, severe injury, or choking." }
            ]
        }
    };

    const content = resourceContent[resource.title] || { content: [] };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10">
                    <X className="h-6 w-6 text-gray-600" />
                </button>

                <div className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${resource.color}`}>
                            <resource.icon className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">{resource.title}</h2>
                    </div>

                    <div className="space-y-4 mb-8">
                        {content.content.map((item, i) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Link
                            href="/appointments"
                            className="flex-1 py-3 bg-teal-500 text-white text-center rounded-xl font-bold hover:bg-teal-600 transition-colors"
                        >
                            Book Consultation
                        </Link>
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 bg-gray-100 text-gray-700 text-center rounded-xl font-bold hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ConditionCard = ({ condition }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-teal-200 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isOpen ? 'bg-teal-500 text-white' : 'bg-teal-100 text-teal-600'} transition-colors`}>
                        <Activity className="h-6 w-6" />
                    </div>
                    <span className="font-bold text-lg text-gray-800">{condition.name}</span>
                </div>
                {isOpen ? <ChevronUp className="h-5 w-5 text-teal-500" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 border-t border-gray-100 bg-teal-50/30">
                            <div className="flex flex-col md:flex-row gap-6 mt-4">
                                <div className="md:w-2/3 space-y-4">
                                    <p className="text-gray-600">{condition.description}</p>
                                    <div>
                                        <h4 className="font-bold text-teal-700 text-sm mb-2">Symptoms to Watch:</h4>
                                        <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 ml-1">
                                            {condition.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-teal-700 text-sm mb-2">How We Help:</h4>
                                        <p className="text-gray-600 text-sm">{condition.treatment}</p>
                                    </div>
                                </div>
                                <div className="md:w-1/3">
                                    <img src={condition.image} alt={condition.name} className="rounded-xl shadow-md w-full h-40 object-cover" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function PediatricsPage() {
    const [services, setServices] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedResource, setSelectedResource] = useState(null);
    const [imageErrors, setImageErrors] = useState({});

    useEffect(() => {
        fetch('/api/pediatrics/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error("Failed to fetch services", err));

        fetch('/api/pediatrics/conditions')
            .then(res => res.json())
            .then(data => setConditions(data))
            .catch(err => console.error("Failed to fetch conditions", err));
    }, []);

    const handleImageError = (id) => {
        setImageErrors(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div className="min-h-screen bg-yellow-50/30 font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-teal-500 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-600/90 to-blue-600/80"></div>

                {/* Decorative Shapes */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-40 right-10 w-20 h-20 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link href="/services" className="inline-flex items-center gap-2 text-teal-100 hover:text-white mb-6 transition-colors font-bold bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                                <ArrowLeft className="h-4 w-4" /> Back to Services
                            </Link>
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                                Compassionate Pediatrics for <span className="text-yellow-300">Every Child.</span>
                            </h1>
                            <p className="text-xl text-teal-50 mb-8 leading-relaxed font-medium max-w-lg">
                                Trusted care for infants, children, and teens—where kindness meets expertise in a playful, safe environment.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/appointments" className="bg-yellow-400 text-teal-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all shadow-lg hover:shadow-yellow-400/50 hover:scale-105 flex items-center gap-2 text-lg">
                                    <Calendar className="h-5 w-5" /> Book Appointment
                                </Link>
                                <Link href="#team" className="bg-white/20 border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all backdrop-blur-sm text-lg">
                                    Meet Our Team
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1000&q=80"
                                alt="Happy Indian child with pediatrician"
                                className="rounded-[3rem] shadow-2xl border-8 border-white/20 rotate-3 hover:rotate-0 transition-transform duration-500"
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
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-teal-600">
                                <ShieldCheck className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">Board Certified</h3>
                            <p className="text-gray-500 text-sm">Expert Pediatricians</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                                <Star className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">Top Rated</h3>
                            <p className="text-gray-500 text-sm">By Local Families</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 text-pink-600">
                                <Heart className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">Child-Friendly</h3>
                            <p className="text-gray-500 text-sm">Comfortable Care</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                <Clock className="h-8 w-8" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">24/7 Support</h3>
                            <p className="text-gray-500 text-sm">Always Here for You</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Age-Based Services Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">Our Services</span>
                        <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-4">Care for Every Stage</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            From first steps to graduation, we provide specialized care tailored to your child's developmental needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <motion.div
                                key={service.id}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-3xl shadow-lg overflow-hidden border-2 border-transparent hover:border-teal-300 transition-all cursor-pointer group"
                                onClick={() => setSelectedService(service)}
                            >
                                <div className="h-56 overflow-hidden relative bg-gray-100">
                                    {imageErrors[service.id] ? (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-100 to-blue-100">
                                            <div className="text-center p-6">
                                                <Baby className="h-16 w-16 text-teal-500 mx-auto mb-2" />
                                                <p className="text-teal-700 font-medium">Pediatric Care</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <img
                                            src={service.image}
                                            alt={`Indian children - ${service.title}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={() => handleImageError(service.id)}
                                        />
                                    )}
                                    <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                                        <ArrowRight className="h-5 w-5 text-teal-500 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.shortDesc}</p>
                                    <span className="text-teal-600 font-bold text-sm uppercase tracking-wide group-hover:underline">Learn More</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet Our Pediatricians */}
            <section id="team" className="py-20 bg-white relative overflow-hidden">
                <div className="absolute -right-20 top-20 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                <div className="absolute -left-20 bottom-20 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Superheroes</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Our team of board-certified pediatricians and nurses are dedicated to making every visit a positive experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Dr. Priya Sharma", role: "Lead Pediatrician", specialty: "Newborn Care", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80" },
                            { name: "Dr. Arjun Patel", role: "Pediatric Specialist", specialty: "Adolescent Medicine", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80" },
                            { name: "Nurse Anjali Reddy", role: "Head Nurse", specialty: "Immunizations", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80" }
                        ].map((staff, i) => (
                            <div key={i} className="bg-gray-50 rounded-3xl p-6 text-center hover:bg-white hover:shadow-xl transition-all border border-gray-100 hover:border-yellow-200">
                                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img src={staff.image} alt={`Indian pediatric healthcare professional ${staff.name}`} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{staff.name}</h3>
                                <p className="text-teal-600 font-medium mb-2">{staff.role}</p>
                                <p className="text-gray-500 text-sm mb-6">{staff.specialty}</p>
                                <Link href="/appointments" className="inline-block bg-teal-100 text-teal-700 px-6 py-2 rounded-full font-bold hover:bg-teal-200 transition-colors text-sm">
                                    Book Visit
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Conditions & Resource Hub */}
            <section className="py-20 bg-teal-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Conditions We Treat</h2>
                            <p className="text-gray-600 mb-8">
                                Expert care for everything from sniffles to chronic conditions. Click to learn more.
                            </p>
                            <div className="space-y-4">
                                {conditions.map((condition) => (
                                    <ConditionCard key={condition.id} condition={condition} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Parent Resource Hub</h2>
                            <p className="text-gray-600 mb-8">
                                Helpful guides and tools to support you on your parenting journey.
                            </p>
                            <div className="grid gap-4">
                                {[
                                    { title: "Newborn Care Guide", icon: Baby, color: "bg-pink-100 text-pink-600" },
                                    { title: "Vaccine Schedule", icon: Calendar, color: "bg-blue-100 text-blue-600" },
                                    { title: "Growth Charts", icon: Activity, color: "bg-green-100 text-green-600" },
                                    { title: "Nutrition Tips", icon: Smile, color: "bg-yellow-100 text-yellow-600" },
                                    { title: "Educational Videos", icon: Video, color: "bg-purple-100 text-purple-600" },
                                    { title: "Symptom Checker", icon: Stethoscope, color: "bg-red-100 text-red-600" }
                                ].map((resource, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedResource(resource)}
                                        className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group w-full text-left"
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${resource.color} group-hover:scale-110 transition-transform`}>
                                            <resource.icon className="h-6 w-6" />
                                        </div>
                                        <span className="font-bold text-gray-800 group-hover:text-teal-600 transition-colors">{resource.title}</span>
                                        <ArrowRight className="h-4 w-4 text-gray-300 ml-auto group-hover:text-teal-500" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Child-Friendly Environment Gallery */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">A Place Just for Kids</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our facility is designed to be warm, welcoming, and fun, reducing anxiety for both children and parents.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96">
                        <div className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80" alt="Indian children in pediatric play area" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                            <span className="absolute bottom-6 left-6 bg-white/90 px-4 py-2 rounded-full font-bold text-gray-800 text-sm backdrop-blur-sm">Interactive Play Area</span>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80" alt="Indian child in colorful pediatric exam room" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <span className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full font-bold text-gray-800 text-xs backdrop-blur-sm">Colorful Rooms</span>
                        </div>
                        <div className="relative rounded-3xl overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80" alt="Indian doctor with child patient" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <span className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full font-bold text-gray-800 text-xs backdrop-blur-sm">Friendly Faces</span>
                        </div>
                        <div className="col-span-2 relative rounded-3xl overflow-hidden group">
                            <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80" alt="Indian family in pediatric waiting area" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <span className="absolute bottom-6 left-6 bg-white/90 px-4 py-2 rounded-full font-bold text-gray-800 text-sm backdrop-blur-sm">Cozy Waiting Areas</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Family Stories Carousel */}
            <section className="py-20 bg-yellow-400 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-teal-900 mb-4">Happy Families</h2>
                        <p className="text-teal-800 max-w-2xl mx-auto font-medium">
                            Real stories from parents who trust us with their most precious gifts.
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
                                    name: "The Sharma Family",
                                    child: "Aarav, age 5",
                                    quote: "Dr. Priya made Aarav feel so brave during his shots. We wouldn't go anywhere else!",
                                    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    name: "Priya & Rajesh",
                                    child: "Ananya, age 2",
                                    quote: "The asthma clinic helped us finally get Ananya's breathing under control. We are so grateful.",
                                    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    name: "Amit Patel",
                                    child: "Rohan, age 12",
                                    quote: "The sports physical was quick and thorough. Great team!",
                                    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80"
                                },
                                {
                                    name: "Kavita Reddy",
                                    child: "Diya, newborn",
                                    quote: "As first-time parents, we had so many questions. The nurses were incredibly patient and helpful.",
                                    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=400&q=80"
                                }
                            ].map((story, i) => (
                                <motion.div
                                    key={i}
                                    className="min-w-[300px] md:min-w-[400px] bg-white p-8 rounded-3xl shadow-lg snap-center flex-shrink-0 border-b-8 border-teal-400"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <img src={story.image} alt={`Indian family - ${story.name}`} className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400" />
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900">{story.name}</h4>
                                            <p className="text-gray-500 text-sm">{story.child}</p>
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

            {/* Emergency Contact - Floating */}
            <div className="fixed bottom-6 right-6 z-40">
                <Link href="/emergency" className="flex items-center gap-3 bg-red-500 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-red-600 transition-all hover:scale-105 animate-bounce-slow border-4 border-white">
                    <Phone className="h-6 w-6" />
                    <div className="text-left">
                        <p className="text-xs font-bold uppercase opacity-90">Pediatric ER</p>
                        <p className="font-bold text-lg leading-none">Call 911 or Us</p>
                    </div>
                </Link>
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
