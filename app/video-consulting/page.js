"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import {
    Video,
    Calendar,
    Clock,
    Shield,
    CheckCircle,
    Star,
    MessageSquare,
    FileText,
    Smartphone,
    Laptop,
    Tablet,
} from "lucide-react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

// Import images
import service from "../../public/assets/services.png";
import doct1 from "../../public/assets/doct1.jpg";
import doct2 from "../../public/assets/doct2.jpg";
import doct3 from "../../public/assets/doct3.jpg";

export default function VideoConsultingPage() {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [bookingData, setBookingData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
    });

    const doctors = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "Cardiologist",
            experience: "15+ years",
            rating: 4.9,
            image: doct1,
            available: ["10:00 AM", "2:00 PM", "4:00 PM"],
        },
        {
            id: 2,
            name: "Dr. Mark Smith",
            specialty: "Neurologist",
            experience: "12+ years",
            rating: 4.8,
            image: doct2,
            available: ["9:00 AM", "11:00 AM", "3:00 PM"],
        },
        {
            id: 3,
            name: "Dr. Emily Davis",
            specialty: "Pediatrician",
            experience: "10+ years",
            rating: 4.9,
            image: doct3,
            available: ["10:30 AM", "1:00 PM", "5:00 PM"],
        },
    ];

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedDoctor) {
            Swal.fire({
                title: "Select a Doctor",
                text: "Please select a doctor before booking.",
                icon: "warning",
                confirmButtonColor: "#0D9488",
            });
            return;
        }

        try {
            // Here you would make an API call to book the appointment
            Swal.fire({
                title: "Booking Confirmed!",
                html: `Your video consultation with <strong>${selectedDoctor.name}</strong> is scheduled for <strong>${bookingData.date}</strong> at <strong>${bookingData.time}</strong>.<br/><br/>You will receive a confirmation email with the video link shortly.`,
                icon: "success",
                confirmButtonColor: "#0D9488",
            });
            setBookingData({ name: "", email: "", phone: "", date: "", time: "" });
            setSelectedDoctor(null);
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to book appointment. Please try again.",
                icon: "error",
                confirmButtonColor: "#DC2626",
            });
        }
    };

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
                        <span className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                            <Video className="inline mr-2" size={16} /> Telehealth Services
                        </span>
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                            Video Consultations
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Connect with our expert doctors from anywhere. Get quality healthcare without leaving your home.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Image
                                src={service}
                                alt="Video Consulting"
                                className="rounded-3xl shadow-2xl"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-6"
                        >
                            {[
                                {
                                    icon: <Video className="text-teal-600" size={24} />,
                                    title: "HD Video Quality",
                                    desc: "Crystal clear video and audio for effective consultations",
                                },
                                {
                                    icon: <Shield className="text-teal-600" size={24} />,
                                    title: "Secure & Private",
                                    desc: "End-to-end encrypted sessions for your privacy",
                                },
                                {
                                    icon: <FileText className="text-teal-600" size={24} />,
                                    title: "Digital Prescriptions",
                                    desc: "Receive prescriptions and reports instantly",
                                },
                                {
                                    icon: <Clock className="text-teal-600" size={24} />,
                                    title: "Flexible Scheduling",
                                    desc: "Book appointments at your convenience",
                                },
                            ].map((feature, i) => (
                                <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-teal-50 p-3 rounded-lg">{feature.icon}</div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                                        <p className="text-gray-600 text-sm">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        How It <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Works</span>
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Choose Doctor", desc: "Select from our expert specialists", icon: <Calendar /> },
                            { step: "2", title: "Book Slot", desc: "Pick a convenient time", icon: <Clock /> },
                            { step: "3", title: "Join Call", desc: "Connect via video link", icon: <Video /> },
                            { step: "4", title: "Get Care", desc: "Receive prescription & advice", icon: <FileText /> },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="bg-gradient-to-br from-teal-500 to-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                                <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Available Doctors */}
            <section ref={ref} className="py-20 bg-gradient-to-b from-white to-teal-50/30">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                        Available <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Specialists</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {doctors.map((doctor, i) => (
                            <motion.div
                                key={doctor.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer border-2 ${selectedDoctor?.id === doctor.id ? "border-teal-500" : "border-transparent"
                                    }`}
                                onClick={() => setSelectedDoctor(doctor)}
                            >
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.name}
                                        fill
                                        className="rounded-full object-cover border-4 border-teal-100"
                                    />
                                    {selectedDoctor?.id === doctor.id && (
                                        <div className="absolute -top-2 -right-2 bg-teal-500 text-white rounded-full p-1">
                                            <CheckCircle size={20} />
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-xl text-center mb-1">{doctor.name}</h3>
                                <p className="text-teal-600 text-center font-semibold mb-2">{doctor.specialty}</p>
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                                    <span className="font-bold">{doctor.rating}</span>
                                    <span className="text-gray-500 text-sm">• {doctor.experience}</span>
                                </div>
                                <div className="border-t pt-4">
                                    <p className="text-sm text-gray-600 mb-2 font-semibold">Available Today:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.available.map((time, idx) => (
                                            <span key={idx} className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-medium">
                                                {time}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section className="py-20 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl shadow-xl p-8 md:p-12">
                        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
                            Book Your Video Consultation
                        </h2>

                        {selectedDoctor && (
                            <div className="bg-white rounded-xl p-4 mb-6 flex items-center gap-4">
                                <Image
                                    src={selectedDoctor.image}
                                    alt={selectedDoctor.name}
                                    width={60}
                                    height={60}
                                    className="rounded-full"
                                />
                                <div>
                                    <p className="font-bold text-gray-900">{selectedDoctor.name}</p>
                                    <p className="text-sm text-teal-600">{selectedDoctor.specialty}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleBooking} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={bookingData.name}
                                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={bookingData.email}
                                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        required
                                        value={bookingData.phone}
                                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={bookingData.date}
                                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time</label>
                                    <select
                                        required
                                        value={bookingData.time}
                                        onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition"
                                        disabled={!selectedDoctor}
                                    >
                                        <option value="">{selectedDoctor ? "Select time" : "Select a doctor first"}</option>
                                        {selectedDoctor ? (
                                            selectedDoctor.available.map((time, idx) => (
                                                <option key={idx} value={time}>
                                                    {time}
                                                </option>
                                            ))
                                        ) : (
                                            <>
                                                <option value="9:00 AM">9:00 AM</option>
                                                <option value="10:00 AM">10:00 AM</option>
                                                <option value="11:00 AM">11:00 AM</option>
                                                <option value="2:00 PM">2:00 PM</option>
                                                <option value="3:00 PM">3:00 PM</option>
                                                <option value="4:00 PM">4:00 PM</option>
                                            </>
                                        )}
                                    </select>
                                    {!selectedDoctor && (
                                        <p className="text-xs text-amber-600 mt-1">Please select a doctor above to see available times</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-teal-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Video size={20} />
                                Confirm Video Consultation
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-6 flex items-center justify-center gap-2">
                            <Shield size={16} className="text-teal-600" />
                            Your information is secure and confidential
                        </p>
                    </div>
                </div>
            </section>

            {/* Device Compatibility */}
            <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-8 text-gray-900">Works on All Your Devices</h3>
                    <div className="flex justify-center gap-12 flex-wrap">
                        {[
                            { icon: <Smartphone size={40} />, label: "Mobile" },
                            { icon: <Tablet size={40} />, label: "Tablet" },
                            { icon: <Laptop size={40} />, label: "Desktop" },
                        ].map((device, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <div className="bg-white p-6 rounded-2xl shadow-md text-teal-600">{device.icon}</div>
                                <p className="font-semibold text-gray-700">{device.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
