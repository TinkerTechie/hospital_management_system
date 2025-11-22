"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Stethoscope,
    Heart,
    Activity,
    Shield,
    Users,
    Calendar,
    Phone,
    ArrowRight,
    CheckCircle,
    Clock,
    Award
} from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import Link from 'next/link';

export default function GeneralMedicinePage() {
    const services = [
        "Preventive health screenings and annual checkups",
        "Diagnosis and treatment of common medical conditions (fever, infections, hypertension, diabetes, etc.)",
        "Personalized care plans for long-term wellness",
        "Management of chronic diseases",
        "Immunizations and vaccinations",
        "Referrals to specialists if needed",
        "Health education and lifestyle advice"
    ];

    const commonConditions = [
        {
            condition: "Fever & Common Cold",
            symptoms: "High temperature, runny nose, cough, body aches",
            treatment: "Rest, fluids, Paracetamol (500mg-1000mg), antihistamines",
            duration: "3-7 days"
        },
        {
            condition: "Headache & Migraine",
            symptoms: "Throbbing pain, sensitivity to light, nausea",
            treatment: "Pain relievers (Ibuprofen, Paracetamol), rest in dark room",
            duration: "Few hours to 2 days"
        },
        {
            condition: "Skin Rashes & Allergies",
            symptoms: "Itching, redness, swelling, hives",
            treatment: "Antihistamines, calamine lotion, hydrocortisone cream (1%)",
            duration: "1-2 weeks"
        },
        {
            condition: "Minor Cuts & Wounds",
            symptoms: "Bleeding, pain, risk of infection",
            treatment: "Clean with antiseptic, apply antibiotic ointment (Neosporin), bandage",
            duration: "5-10 days"
        },
        {
            condition: "Stomach Upset & Acidity",
            symptoms: "Heartburn, nausea, bloating, indigestion",
            treatment: "Antacids (Omeprazole, Ranitidine), avoid spicy foods",
            duration: "1-3 days"
        },
        {
            condition: "High Blood Pressure",
            symptoms: "Often no symptoms, headache, dizziness",
            treatment: "Lifestyle changes, BP medications (as prescribed), regular monitoring",
            duration: "Ongoing management"
        },
        {
            condition: "Diabetes (Type 2)",
            symptoms: "Increased thirst, frequent urination, fatigue",
            treatment: "Diet control, exercise, Metformin, insulin (if needed)",
            duration: "Lifelong management"
        },
        {
            condition: "Joint Pain & Arthritis",
            symptoms: "Stiffness, swelling, reduced mobility",
            treatment: "Pain relievers, anti-inflammatory gels (Diclofenac), physiotherapy",
            duration: "Chronic condition"
        }
    ];

    const medications = [
        {
            category: "Pain Relief",
            medicines: ["Paracetamol (500mg-1000mg)", "Ibuprofen (400mg)", "Aspirin (75mg-300mg)"],
            use: "Fever, headache, body pain"
        },
        {
            category: "Digestive Health",
            medicines: ["Omeprazole (20mg)", "Ranitidine (150mg)", "Antacids"],
            use: "Acidity, heartburn, indigestion"
        },
        {
            category: "Skin Care",
            medicines: ["Hydrocortisone cream (1%)", "Calamine lotion", "Antibiotic ointment"],
            use: "Rashes, itching, minor wounds"
        },
        {
            category: "Allergy Relief",
            medicines: ["Cetirizine (10mg)", "Loratadine (10mg)", "Chlorpheniramine"],
            use: "Allergic reactions, hay fever"
        }
    ];

    const whyChooseUs = [
        {
            icon: Users,
            title: "Experienced Doctors",
            description: "Dedicated physicians with years of experience in primary care"
        },
        {
            icon: Heart,
            title: "Personalized Care",
            description: "Friendly, compassionate care tailored to every stage of life"
        },
        {
            icon: Clock,
            title: "Same-Day Appointments",
            description: "Available for urgent medical concerns and immediate needs"
        },
        {
            icon: Activity,
            title: "Coordinated Care",
            description: "Seamless referrals and collaboration with specialists"
        },
        {
            icon: Award,
            title: "Modern Facilities",
            description: "State-of-the-art equipment and compassionate team"
        },
        {
            icon: Shield,
            title: "Comprehensive Wellness",
            description: "Focus on prevention, early detection, and long-term health"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 bg-gradient-to-br from-teal-50 to-blue-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                <Stethoscope className="h-4 w-4" />
                                Primary Care Excellence
                            </div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                Welcome to Our General Medicine Department
                            </h1>
                            <p className="text-xl text-gray-700 leading-relaxed mb-8">
                                Your health journey begins here. Our General Medicine team provides comprehensive primary care for patients of all ages, focusing on prevention, wellness, and the treatment of common medical concerns.
                            </p>
                            <p className="text-lg text-gray-600 mb-10">
                                Whether you need a routine checkup, help managing a chronic illness, or expert guidance for sudden symptoms, our experienced physicians are ready to support you.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/appointments"
                                    className="bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-700 transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    Book Appointment
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <Phone className="h-5 w-5" />
                                    Contact Us
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What We Offer Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
                            <p className="text-lg text-gray-600">Comprehensive primary care services for your entire family</p>
                        </motion.div>

                        <div className="space-y-4">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-teal-50 transition-colors"
                                >
                                    <CheckCircle className="h-6 w-6 text-teal-600 flex-shrink-0 mt-1" />
                                    <p className="text-lg text-gray-800 font-medium">{service}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Common Conditions Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Conditions We Treat</h2>
                        <p className="text-lg text-gray-600">Primary care guidance for everyday health concerns</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {commonConditions.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-l-4 border-teal-500"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.condition}</h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="font-semibold text-gray-700">Symptoms:</span>
                                        <p className="text-gray-600">{item.symptoms}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Treatment:</span>
                                        <p className="text-gray-600">{item.treatment}</p>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700">Duration:</span>
                                        <span className="text-teal-600 font-medium ml-2">{item.duration}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600 italic">
                            ⚠️ This information is for general guidance only. Always consult a doctor for proper diagnosis and treatment.
                        </p>
                    </div>
                </div>
            </section>

            {/* Primary Care Medications Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Primary Care Medications</h2>
                        <p className="text-lg text-gray-600">Common medicines for everyday health needs</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {medications.map((med, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
                            >
                                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
                                    <Activity className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{med.category}</h3>
                                <ul className="space-y-2 mb-4">
                                    {med.medicines.map((medicine, idx) => (
                                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                            <span>{medicine}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="pt-3 border-t border-teal-200">
                                    <p className="text-xs font-semibold text-gray-600">Used for:</p>
                                    <p className="text-sm text-gray-700">{med.use}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-10 max-w-3xl mx-auto bg-amber-50 border-l-4 border-amber-500 p-6 rounded-lg">
                        <div className="flex items-start gap-3">
                            <Shield className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Important Safety Information</h4>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• Always consult a doctor before starting any medication</li>
                                    <li>• Follow prescribed dosages - do not self-medicate</li>
                                    <li>• Inform your doctor about allergies and current medications</li>
                                    <li>• Store medicines properly and check expiry dates</li>
                                    <li>• Seek immediate medical help if you experience adverse reactions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Connect with Rehabilitation Section */}
            <section className="py-16 bg-gradient-to-r from-green-50 to-teal-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-green-500"
                        >
                            <div className="flex items-start gap-4">
                                <Activity className="h-8 w-8 text-green-600 flex-shrink-0" />
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help Recovering?</h3>
                                    <p className="text-lg text-gray-700 mb-4">
                                        Recovering from injury, surgery, or illness? Our <strong>Rehabilitation Services</strong> team works hand-in-hand with our primary care physicians to support your complete recovery journey.
                                    </p>
                                    <Link
                                        href="/services/rehabilitation"
                                        className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-all"
                                    >
                                        Explore Rehabilitation Services
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                        <p className="text-lg text-gray-600">Excellence in primary care with a patient-first approach</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {whyChooseUs.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
                                >
                                    <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="h-7 w-7 text-teal-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Your Primary Care Starts Here</h2>
                        <p className="text-xl text-teal-100 mb-10 max-w-3xl mx-auto">
                            Prioritize your health and wellness today. Book an appointment with one of our general physicians or contact us with any questions. We're here to guide you towards a healthier future!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/appointments"
                                className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                            >
                                <Calendar className="h-5 w-5" />
                                Book Appointment
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-teal-600 transition-all inline-flex items-center justify-center gap-2"
                            >
                                <Phone className="h-5 w-5" />
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
