"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Star, Heart, Activity, ShieldCheck, User, Calendar, Award, CheckCircle, Shield } from "lucide-react";
import Navbar from "./components/shared/Navbar";
import HeroCarousel from "./components/shared/HeroCarousel";
import StatsCounter from "./components/shared/StatsCounter";

import banner from "../public/assets/hero.png";
import service from "../public/assets/services.png";
import human1 from "../public/assets/human1.jpg";
import doct1 from "../public/assets/doct1.jpg";
import doct2 from "../public/assets/doct2.jpg";
import doct3 from "../public/assets/doct3.jpg";
import doct4 from "../public/assets/doct4.jpg";
import doct5 from "../public/assets/doct5.jpg";
import feedback from "../public/assets/feedback.png";
import review from "../public/assets/review.jpg";
import Footer from "./components/shared/Footer";

export default function Home() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [email, setEmail] = useState("");
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [bookingPhone, setBookingPhone] = useState("");

  const handleInstantBooking = async (e) => {
    e.preventDefault();
    if (!bookingPhone) return;

    try {
      await axios.post("/api/callbacks", { phone: bookingPhone });
      Swal.fire({
        title: "Request Received!",
        text: "We will call you shortly at " + bookingPhone + " to confirm your appointment.",
        icon: "success",
        confirmButtonColor: "#0D9488",
      });
      setBookingPhone("");
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to submit request. Please try again.",
        icon: "error",
        confirmButtonColor: "#DC2626",
      });
    }
  };

  useEffect(() => {
    // Fetch hospital reviews
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews?targetType=HOSPITAL&limit=3");
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews);
          setAvgRating(parseFloat(data.avgRating));
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
    fetchReviews();
  }, []);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/newsletter", { email });
      Swal.fire({
        title: "Subscribed!",
        icon: "success",
        text: "Thanks for subscribing! We promise to keep your data safe.",
        confirmButtonColor: "#0D9488",
      });
      setEmail("");
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Failed to subscribe. Please try again later.",
        confirmButtonColor: "#DC2626",
      });
    }
  };

  return (
    <main className="bg-gradient-to-br from-gray-50 via-white to-teal-50/30 min-h-screen text-gray-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-teal-100/20 rounded-full blur-3xl -z-10"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl -z-10"></div>

      {/* 🌐 Navbar */}
      <Navbar />

      {/* 🩺 Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-center min-h-[95vh] max-w-7xl mx-auto px-6 py-20 gap-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col text-center lg:text-left max-w-2xl z-10"
        >
          <div className="mb-6">
            <span className="inline-block bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
              🏆 Award-Winning Healthcare
            </span>
          </div>
          <h1 className="text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#5062b1] via-teal-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
              Empowering You.
            </span>
            <br />
            <span className="text-gray-800">Enriching Lives.</span>
          </h1>
          <p className="text-2xl font-semibold text-teal-700 mb-4 tracking-tight">
            Trusted by thousands. Innovating for your health every day.
          </p>
          <p className="text-xl text-gray-600 leading-relaxed mb-10 font-light max-w-xl">
            Expert care, compassionate service, innovative medicine for all.
            <br />
            <span className="font-semibold text-[#5062b1] mt-2 inline-block">Your health, our focus—every day.</span>
          </p>

          {/* Hospital Rating Display */}
          {avgRating > 0 && (
            <div className="mb-10 flex items-center gap-3 justify-center lg:justify-start bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg inline-flex border border-teal-100">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${star <= Math.round(avgRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="text-gray-800 font-bold text-lg">
                {avgRating.toFixed(1)}
              </span>
              <span className="text-gray-600 text-base font-medium">
                ({reviews.length} verified reviews)
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
            <Link
              href="/appointments"
              className="group bg-gradient-to-r from-teal-600 to-teal-700 text-white px-10 py-5 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xl flex items-center justify-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-teal-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Calendar size={24} className="relative z-10" />
              <span className="relative z-10">Book Appointment</span>
            </Link>
            <Link
              href="/services"
              className="border-3 border-[#5062b1] text-[#5062b1] px-10 py-5 rounded-2xl hover:bg-blue-50 hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-xl backdrop-blur-sm bg-white/50"
            >
              Our Services
            </Link>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
            <div className="flex items-center gap-2 text-gray-600 font-semibold text-base bg-white/70 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
              <Award size={20} className="text-teal-600" /> JCI Accredited
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-semibold text-base bg-white/70 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
              <CheckCircle size={20} className="text-teal-600" /> ISO 9001
            </div>
            <div className="flex items-center gap-2 text-gray-600 font-semibold text-base bg-white/70 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
              <Heart size={20} className="text-teal-600" /> Top Rated 2024
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 80 }}
          transition={{ duration: 1.2 }}
          className="w-full lg:w-[55%] relative"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-blue-400 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative">
              <HeroCarousel />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ⚡ Instant Booking Section - Prominent Placement */}
      <section className="py-16 bg-gradient-to-br from-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              ⚡ Instant Booking
            </h2>
            <p className="text-xl text-white/90">
              Schedule your visit in seconds. We'll call you to confirm.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl mx-auto"
          >
            <form onSubmit={handleInstantBooking} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Your Phone Number
                </label>
                <div className="flex gap-3">
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-5 py-4 text-base outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl px-8 py-4 font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-teal-600" />
                  <span>Same-day available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-teal-600" />
                  <span>100% secure</span>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 💡 Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-white via-teal-50/30 to-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🌟 Why Choose Us
            </span>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
              Why Choose <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Medicare</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience healthcare excellence backed by cutting-edge technology and compassionate care
            </p>
          </div>

          {/* Animated Stats */}
          <div className="mb-16">
            <StatsCounter />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Best Doctors",
                desc: "Our doctors are professional, ethical, and highly skilled experts in their fields.",
                icon: <User className="w-12 h-12 text-teal-600" />,
                image: doct1
              },
              {
                title: "Advanced Research",
                desc: "We lead medical innovation through continuous, credible research and technology.",
                icon: <Activity className="w-12 h-12 text-teal-600" />,
                image: service
              },
              {
                title: "Patient-Centered Care",
                desc: "We treat every patient with compassion, respect, and dignity. You come first.",
                icon: <Heart className="w-12 h-12 text-teal-600" />,
                image: human1
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-teal-50 overflow-hidden group relative"
              >
                <div className="h-56 overflow-hidden relative">
                  <Image src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent group-hover:from-teal-900/20 transition-colors" />
                </div>
                <div className="p-8 flex flex-col items-center text-center relative">
                  <div className="absolute -top-8 bg-gradient-to-br from-teal-500 to-blue-500 p-4 rounded-2xl shadow-xl">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-6">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔥 Trending Updates */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">✨ New Service</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Available Now</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-3">
                Telehealth Consultations
              </h3>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Connect with our expert specialists from anywhere. Get quality healthcare without leaving your home.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-600" /> Instant video consultations</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-600" /> Secure & private sessions</li>
                <li className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-600" /> Digital prescriptions</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/video-consulting"
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg text-center flex items-center gap-2 justify-center group"
              >
                <Activity className="group-hover:animate-pulse" size={20} />
                Start Video Consult
              </Link>
              <Link
                href="/appointments"
                className="border-2 border-teal-600 text-teal-700 px-8 py-3 rounded-xl hover:bg-teal-50 transition-all duration-300 font-semibold text-center"
              >
                Book In-Person Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 👨‍⚕️ Meet Our Specialists */}
      <section className="py-20 bg-[#E0F2F1]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-teal-800">
            Meet Our Specialists
          </h2>
          <Link
            href="/best-doctors"
            className="text-teal-600 font-bold hover:text-teal-800 flex items-center gap-2 mt-4 md:mt-0 group"
          >
            View All Top Doctors
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {[
            { img: human1, name: "Dr. Sarah Johnson", role: "Cardiologist", bio: "Expert in heart health with 15+ years exp." },
            { img: doct1, name: "Dr. Mark Smith", role: "Neurologist", bio: "Specialist in brain and nervous system care." },
            { img: doct2, name: "Dr. Emily Davis", role: "Pediatrician", bio: "Compassionate care for your little ones." },
            { img: doct3, name: "Dr. James Wilson", role: "Orthopedic", bio: "Advanced treatments for bone and joint health." },
            { img: doct4, name: "Dr. Linda Brown", role: "Dermatologist", bio: "Skin care expert for all ages." },
            { img: doct5, name: "Dr. Robert Taylor", role: "Surgeon", bio: "Precision and care in every procedure." },
          ].map((doc, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center border border-teal-50 group"
            >
              <div className="relative">
                <Image
                  src={doc.img}
                  alt={doc.name}
                  className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-teal-50 group-hover:border-teal-100 transition-colors"
                />
                <div className="absolute bottom-4 right-0 bg-teal-500 text-white p-1 rounded-full border-2 border-white">
                  <ShieldCheck size={14} />
                </div>
              </div>
              <h4 className="font-bold text-lg text-teal-800 mb-2">
                {doc.name}
              </h4>
              <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                {doc.role}
              </span>
              <p className="text-xs text-gray-500 text-center mb-4 line-clamp-2">
                {doc.bio}
              </p>
              <Link
                href="/appointments"
                className="bg-teal-50 text-teal-700 px-4 py-2 rounded-full hover:bg-teal-600 hover:text-white text-sm font-medium transition-colors w-full text-center"
              >
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      </section >

      {/* 💬 Customer Reviews */}
      < section className="py-20 bg-white" >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12 text-teal-800">
            What Our Patients Say
          </h2>

          {reviews.length === 0 ? (
            <div className="bg-[#F0FDFA] p-8 rounded-xl shadow-md border border-teal-100 text-center">
              <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...reviews, {
                id: "mock-4",
                reviewer: { name: "David Kim" },
                rating: 5,
                comment: "The staff was incredibly attentive and kind. I felt safe and well-cared for throughout my stay.",
                createdAt: new Date().toISOString()
              }].slice(0, 4).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-6 rounded-2xl shadow-md border border-teal-50 hover:shadow-xl transition-all duration-300 relative flex flex-col"
                >
                  <div className="absolute top-6 right-6 text-teal-100">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                    </svg>
                  </div>
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                      {rev.reviewer?.name?.charAt(0) || "U"}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-800 text-lg">
                        {rev.reviewer?.name || "Anonymous"}
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= rev.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200"
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic relative z-10">
                    "{rev.comment || "Great experience at Medicare Hospital!"}"
                  </p>
                  <p className="text-xs text-gray-400 mt-4 font-medium">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ❓ Frequently Asked Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              ❓ FAQ
            </span>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our services
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What are your visiting hours?",
                answer: "Our visiting hours are from 10:00 AM to 8:00 PM daily. ICU visiting hours are from 11:00 AM to 12:00 PM and 5:00 PM to 6:00 PM. We recommend calling ahead for specific department hours."
              },
              {
                question: "Do you accept insurance?",
                answer: "Yes, we accept most major insurance plans. Please contact our billing department or check our insurance page for a complete list of accepted providers. We also offer flexible payment plans for uninsured patients."
              },
              {
                question: "How do I book an appointment?",
                answer: "You can book an appointment through our Instant Booking feature on this page, call our helpline, or visit our appointments page. For video consultations, visit our telehealth services page."
              },
              {
                question: "Do you offer emergency services?",
                answer: "Yes, our emergency department is open 24/7 with fully equipped facilities and experienced staff ready to handle all types of medical emergencies."
              },
              {
                question: "Can I get my medical records online?",
                answer: "Yes, registered patients can access their medical records, test results, and prescriptions through our patient portal. Simply log in with your credentials to view and download your records."
              },
              {
                question: "What COVID-19 safety measures are in place?",
                answer: "We follow strict COVID-19 protocols including mandatory masks, temperature screening, sanitization stations, social distancing, and separate areas for suspected cases. All staff are fully vaccinated."
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900 text-lg list-none">
                  <span className="flex-1">{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-teal-600 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-block bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* 📰 Newsletter */}
      < section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600 text-center text-white" >
        <h3 className="text-3xl font-bold mb-4">Stay Informed. Stay Healthy.</h3>
        <p className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto">
          Subscribe to receive expert healthcare tips, new services updates, and exclusive hospital news directly to your inbox.
        </p>
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleNewsletter}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-3 w-full rounded-lg border-2 border-transparent focus:border-yellow-400 text-black outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-300 font-bold hover:shadow-lg transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-teal-200 mt-3 opacity-80 flex items-center justify-center gap-1">
            <ShieldCheck size={14} /> 100% privacy, no spam ever.
          </p>
        </div>
      </section >

      {/* ⚡ Footer */}
      < Footer />
    </main >
  );
}
