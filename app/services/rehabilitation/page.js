"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Heart,
    Users,
    Target,
    Zap,
    Award,
    Calendar,
    Phone,
    ArrowRight,
    CheckCircle,
    Link as LinkIcon,
    Star
} from 'lucide-react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import Link from 'next/link';

export default function RehabilitationPage() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const res = await fetch('/api/reviews/department/Rehabilitation');
                if (res.ok) {
                    const data = await res.json();
                    setTestimonials(data.reviews.map(review => ({
                        name: review.reviewer?.name || 'Anonymous',
                        condition: review.department || 'Rehabilitation Patient',
                        quote: review.comment || 'Great rehabilitation experience!',
                        rating: review.rating
                    })));
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, []);

    const services = [
        {
            title: "Physiotherapy for Injury Recovery",
            description: "Restore mobility and strength after sports injuries, accidents, or trauma with targeted exercises"
        },
        {
            title: "Occupational Therapy for Daily Living Skills",
            description: "Regain independence in everyday activities like dressing, cooking, and self-care"
        },
        {
            title: "Post-Surgical Rehabilitation",
            description: "Accelerate healing and prevent complications after orthopedic, cardiac, or other surgeries"
        },
        {
            title: "Stroke and Neurological Rehabilitation",
            description: "Specialized therapy to improve movement, speech, and cognitive function after stroke or neurological conditions"
        },
        {
            title: "Pain Management Programs",
            description: "Non-invasive techniques to reduce chronic pain and improve quality of life"
        },
        {
            title: "Orthopedic Rehabilitation for Joint/Muscle Injuries",
            description: "Expert care for fractures, sprains, arthritis, and musculoskeletal disorders"
        },
        {
            title: "Customized Exercise and Wellness Plans",
            description: "Personalized fitness programs to maintain long-term health and prevent future injuries"
        }
    ];

    const stats = [
        { value: "95%", label: "Patient Satisfaction" },
        { value: "500+", label: "Successful Recoveries" },
        { value: "15+", label: "Expert Therapists" }
    ];

    const approach = [
        {
            icon: Users,
            title: "Skilled Therapists",
            description: "Team of certified rehabilitation specialists with years of experience"
        },
        {
            icon: Target,
            title: "Personalized Sessions",
            description: "One-on-one therapy tailored to your specific condition and goals"
        },
        {
            icon: Zap,
            title: "Evidence-Based Care",
            description: "Modern equipment and scientifically proven treatment methods"
        },
        {
            icon: Heart,
            title: "All Age Groups",
            description: "Specialized programs for pediatric, adult, and geriatric patients"
        },
        {
            icon: Activity,
            title: "Holistic Coordination",
            description: "Seamless collaboration with doctors for comprehensive care"
        },
        {
            icon: Award,
            title: "Proven Results",
            description: "95% patient satisfaction with measurable improvement outcomes"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-16 bg-gradient-to-br from-green-50 to-teal-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                <Activity className="h-4 w-4" />
                                Recovery & Wellness
                            </div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                Regain Strength. Restore Function. <br />
                                <span className="text-green-600">Reclaim Independence.</span>
                            </h1>
                            <p className="text-xl text-gray-700 leading-relaxed mb-10">
                                Our Rehabilitation Department is dedicated to helping patients recover from illness, injury, or surgery. We offer personalized therapy plans focused on improving mobility, reducing pain, and maximizing independence in daily life.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/appointments"
                                    className="bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    Book Rehabilitation Appointment
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all flex items-center justify-center gap-2"
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
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
                            <p className="text-lg text-gray-600">Comprehensive rehabilitation services for your recovery</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl hover:shadow-lg transition-all border-l-4 border-green-500"
                                >
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                                            <p className="text-sm text-gray-700">{service.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-green-600">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center text-white"
                            >
                                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                                <div className="text-lg text-green-100">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gradient-to-br from-teal-50 to-green-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
                        <p className="text-lg text-gray-600">Real recoveries from our patients</p>
                    </motion.div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full mx-auto"></div>
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl shadow-lg text-center max-w-2xl mx-auto">
                            <p className="text-gray-600">No reviews yet. Be the first to share your rehabilitation success story!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="bg-white p-8 rounded-2xl shadow-lg"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 font-bold text-xl">
                                                {testimonial.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-sm text-gray-600">{testimonial.condition}</p>
                                        </div>
                                    </div>
                                    {testimonial.rating && (
                                        <div className="flex items-center gap-1 mb-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-4 w-4 ${star <= testimonial.rating
                                                            ? 'text-yellow-400 fill-yellow-400'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>


            {/* Our Approach Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Approach</h2>
                        <p className="text-lg text-gray-600">Patient-centered rehabilitation with proven results</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {approach.map((item, index) => {
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
                                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <Icon className="h-7 w-7 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Connect with Primary Care Section */}
            <section className="py-20 bg-gradient-to-r from-teal-50 to-green-50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-xl border-l-4 border-teal-500"
                        >
                            <div className="flex items-start gap-4 mb-6">
                                <LinkIcon className="h-8 w-8 text-teal-600 flex-shrink-0" />
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect With Primary Care</h2>
                                    <p className="text-lg text-gray-700 mb-6">
                                        We work closely with our <strong>General Medicine (Primary Care)</strong> team to ensure your rehabilitation is well-integrated with your overall health plan. Our doctors and therapists collaborate to create seamless transitions from medical care to recovery.
                                    </p>
                                    <Link
                                        href="/services/general-medicine"
                                        className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-full font-bold hover:bg-teal-700 transition-all"
                                    >
                                        Visit General Medicine
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Recovery Journey?</h2>
                        <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto">
                            Contact us today to schedule your first consultation or learn more about our rehabilitation programs!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/appointments"
                                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                            >
                                <Calendar className="h-5 w-5" />
                                Book Appointment
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-all inline-flex items-center justify-center gap-2"
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
