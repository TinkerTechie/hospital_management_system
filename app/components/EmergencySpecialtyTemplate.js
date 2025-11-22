"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, CheckCircle, ArrowRight, Star } from 'lucide-react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import Link from 'next/link';

export default function EmergencySpecialtyTemplate({
    specialty,
    hero,
    overview,
    team,
    protocols,
    stories,
    faqs
}) {
    const [expandedFaq, setExpandedFaq] = React.useState(null);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-red-700 to-red-900 text-white py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            {hero.badge}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                            {hero.title}
                        </h1>
                        <p className="text-xl text-red-100 max-w-3xl mb-10 leading-relaxed">
                            {hero.description}
                        </p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <a href="tel:1066" className="bg-white text-red-700 px-8 py-4 rounded-full font-bold hover:bg-red-50 transition-all shadow-lg flex items-center justify-center gap-3 group">
                                <Phone className="h-5 w-5 group-hover:animate-bounce" />
                                Call Emergency: 1066
                            </a>
                            <a href="https://www.google.com/maps/search/?api=1&query=Emergency+Room+Hospital" target="_blank" rel="noopener noreferrer" className="bg-red-800 text-white px-8 py-4 rounded-full font-bold hover:bg-red-900 transition-all shadow-lg flex items-center justify-center gap-3">
                                <MapPin className="h-5 w-5" />
                                Get Directions
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-12 bg-white shadow-sm relative z-20 -mt-8 mx-6 max-w-6xl lg:mx-auto rounded-2xl border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100 px-6">
                    {hero.stats.map((stat, i) => (
                        <div key={i}>
                            <h3 className="text-4xl font-bold text-red-600 mb-2">{stat.value}</h3>
                            <p className="text-gray-600 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Overview */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                {overview.title}
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {overview.description}
                            </p>
                            <div className="space-y-4">
                                {overview.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{feature.title}</h4>
                                            <p className="text-gray-600 text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-3xl border border-red-200">
                            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="h-6 w-6 text-red-600" />
                                    <h3 className="font-bold text-gray-900">Operating Hours</h3>
                                </div>
                                <p className="text-2xl font-bold text-red-600">24/7 Emergency Care</p>
                                <p className="text-gray-600 text-sm mt-2">Available every day, all year round</p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-3">What to Bring</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                        Government-issued ID
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                        Insurance card (if applicable)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                        List of current medications
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                        Medical history records
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Expert Team</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Meet the dedicated professionals who provide world-class {specialty} care
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-800 p-6 rounded-2xl hover:bg-gray-750 transition-colors"
                            >
                                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-red-400 text-sm font-semibold mb-2">{member.role}</p>
                                <p className="text-gray-400 text-sm mb-3">{member.qualification}</p>
                                <p className="text-gray-300 text-sm">{member.specialty}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Treatment Protocols */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Treatment Protocols
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our evidence-based approach to {specialty}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {protocols.map((protocol, i) => (
                            <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{protocol.title}</h3>
                                        <p className="text-gray-600 mb-4">{protocol.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {protocol.steps.map((step, j) => (
                                                <span key={j} className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                                                    {step}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Patient Stories */}
            <section className="py-20 bg-red-50 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Patient Success Stories
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Real experiences from patients who received care in our {specialty} unit
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stories.map((story, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex gap-1 text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
                                </div>
                                <p className="text-gray-700 italic mb-6 leading-relaxed">
                                    "{story.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {story.name[0]}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{story.name}</h4>
                                        <p className="text-sm text-gray-500">{story.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600">
                            Common questions about our {specialty} services
                        </p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                                >
                                    <h3 className="font-bold text-gray-900 pr-4">{faq.question}</h3>
                                    <ArrowRight className={`h-5 w-5 text-red-600 flex-shrink-0 transition-transform ${expandedFaq === i ? 'rotate-90' : ''}`} />
                                </button>
                                {expandedFaq === i && (
                                    <div className="px-6 pb-6">
                                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-red-600 text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Need Immediate {specialty} Care?
                    </h2>
                    <p className="text-xl text-red-100 mb-10">
                        Our team is available 24/7 to provide life-saving emergency care
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a href="tel:1066" className="bg-white text-red-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-red-50 transition-all shadow-xl inline-flex items-center justify-center gap-3">
                            <Phone className="h-5 w-5" />
                            Call 1066 Now
                        </a>
                        <Link href="/emergency" className="bg-red-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-800 transition-all shadow-xl inline-flex items-center justify-center gap-3">
                            View All Emergency Services
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
