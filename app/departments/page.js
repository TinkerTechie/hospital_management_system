"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import {
    Heart,
    Brain,
    Baby,
    Bone,
    Eye,
    Stethoscope,
    Activity,
    Pill,
    Users,
    Calendar,
    Award,
    ArrowRight,
} from "lucide-react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

// Import images
import doct1 from "../../public/assets/doct1.jpg";
import doct2 from "../../public/assets/doct2.jpg";
import doct3 from "../../public/assets/doct3.jpg";
import doct4 from "../../public/assets/doct4.jpg";
import doct5 from "../../public/assets/doct5.jpg";

export default function DepartmentsPage() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [selectedDept, setSelectedDept] = useState(null);

    const departments = [
        {
            id: 1,
            name: "Cardiology",
            icon: <Heart className="w-8 h-8" />,
            description: "Expert cardiac care with state-of-the-art technology for heart health.",
            services: ["ECG & Echo", "Angiography", "Cardiac Surgery", "Heart Failure Management"],
            specialists: 8,
            image: doct1,
            color: "from-red-500 to-pink-500",
            route: "/services/cardiology",
        },
        {
            id: 2,
            name: "Neurology",
            icon: <Brain className="w-8 h-8" />,
            description: "Advanced neurological care for brain and nervous system disorders.",
            services: ["Stroke Care", "Epilepsy Treatment", "Neurosurgery", "Pain Management"],
            specialists: 6,
            image: doct2,
            color: "from-purple-500 to-indigo-500",
            route: "/services/neurology",
        },
        {
            id: 3,
            name: "Pediatrics",
            icon: <Baby className="w-8 h-8" />,
            description: "Compassionate care for infants, children, and adolescents.",
            services: ["Well-Child Visits", "Vaccinations", "Pediatric Surgery", "Neonatal Care"],
            specialists: 10,
            image: doct3,
            color: "from-blue-500 to-cyan-500",
            route: "/services/pediatrics",
        },
        {
            id: 4,
            name: "Orthopedics",
            icon: <Bone className="w-8 h-8" />,
            description: "Comprehensive bone, joint, and muscle care with advanced treatments.",
            services: ["Joint Replacement", "Sports Medicine", "Fracture Care", "Spine Surgery"],
            specialists: 7,
            image: doct4,
            color: "from-orange-500 to-amber-500",
            route: "/services/orthopedics",
        },
        {
            id: 5,
            name: "Ophthalmology",
            icon: <Eye className="w-8 h-8" />,
            description: "Complete eye care services from routine exams to advanced surgeries.",
            services: ["Cataract Surgery", "LASIK", "Retina Care", "Glaucoma Treatment"],
            specialists: 5,
            image: doct5,
            color: "from-teal-500 to-green-500",
            route: "/services/ophthalmology",
        },
        {
            id: 6,
            name: "General Medicine",
            icon: <Stethoscope className="w-8 h-8" />,
            description: "Primary care and treatment for a wide range of medical conditions.",
            services: ["Health Checkups", "Chronic Disease Management", "Preventive Care", "Diagnostics"],
            specialists: 12,
            image: doct1,
            color: "from-blue-600 to-teal-600",
            route: "/services/general-medicine",
        },
        {
            id: 7,
            name: "Emergency Medicine",
            icon: <Activity className="w-8 h-8" />,
            description: "24/7 emergency care with rapid response and critical care facilities.",
            services: ["Trauma Care", "Critical Care", "Ambulance Services", "Emergency Surgery"],
            specialists: 15,
            image: doct2,
            color: "from-red-600 to-rose-600",
            route: "/emergency",
        },
        {
            id: 8,
            name: "Pharmacy",
            icon: <Pill className="w-8 h-8" />,
            description: "Full-service pharmacy with prescription medications and health products.",
            services: ["Prescription Filling", "Medication Counseling", "Home Delivery", "Health Supplements"],
            specialists: 4,
            image: doct3,
            color: "from-green-600 to-emerald-600",
            route: "/services/pharmacy",
        },
    ];

    return (
        <main className="bg-gradient-to-br from-gray-50 via-white to-teal-50/30 min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                            🏥 Our Departments
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                            <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                                Comprehensive
                            </span>
                            <br />
                            Healthcare Services
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Explore our specialized departments offering world-class medical care with experienced specialists and advanced technology.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {[
                            { icon: <Users />, number: "8+", label: "Departments" },
                            { icon: <Award />, number: "67+", label: "Specialists" },
                            { icon: <Activity />, number: "24/7", label: "Emergency Care" },
                            { icon: <Heart />, number: "99%", label: "Patient Satisfaction" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                            >
                                <div className="text-teal-600 mb-3 flex justify-center">{stat.icon}</div>
                                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Departments Grid */}
            <section ref={ref} className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {departments.map((dept, i) => (
                            <motion.div
                                key={dept.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer"
                                onClick={() => setSelectedDept(dept.id === selectedDept ? null : dept.id)}
                            >
                                {/* Department Header */}
                                <div className={`bg-gradient-to-r ${dept.color} p-6 text-white`}>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                                            {dept.icon}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">{dept.specialists}</div>
                                            <div className="text-xs opacity-90">Specialists</div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{dept.name}</h3>
                                    <p className="text-sm opacity-90">{dept.description}</p>
                                </div>

                                {/* Services List */}
                                <div className="p-6">
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <Activity size={18} className="text-teal-600" />
                                        Key Services
                                    </h4>
                                    <ul className="space-y-2 mb-4">
                                        {dept.services.map((service, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                                <ArrowRight size={16} className="text-teal-500 mt-0.5 flex-shrink-0" />
                                                <span>{service}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={dept.route}
                                        className="block w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                                    >
                                        View Department
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-6">Need Help Choosing a Department?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Our team is here to guide you to the right specialist for your healthcare needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/appointments"
                            className="bg-white text-teal-600 px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                        >
                            <Calendar size={20} />
                            Book Appointment
                        </Link>
                        <Link
                            href="/contact"
                            className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-teal-600 transition-all duration-300"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
