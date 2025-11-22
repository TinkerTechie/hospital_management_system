"use client";

import React, { useState } from "react";
import Navbar from "../components/shared/Navbar";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaExclamationTriangle,
  FaBuilding,
} from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Message Sent!",
          text: "We’ll get back to you shortly.",
          icon: "success",
          confirmButtonColor: "#0C7C59",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonColor: "#0C7C59",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Network Error!",
        text: "Please check your connection and try again.",
        icon: "error",
        confirmButtonColor: "#0C7C59",
      });
    }
  };

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <div className="bg-[#0C7C59] text-white text-center py-16 mt-12">
        <h1 className="text-4xl font-semibold mb-2">Contact Us</h1>
        <p className="text-gray-100 text-base">
          Get in touch with our departments for assistance or feedback.
        </p>
      </div>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Info */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-[#0C7C59] mb-6">
                Contact Information
              </h2>

              <div className="space-y-4 text-gray-700">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#0C7C59]" />
                  Medicare Hospital, RandomAddress, ExampleBlah, Trivandrum, Kerala
                </p>
                <p className="flex items-center gap-2">
                  <FaPhoneAlt className="text-[#0C7C59]" /> +91 123 456 7890
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope className="text-[#0C7C59]" /> feedback@medicare.org
                </p>
              </div>

              <hr className="my-6" />

              <div className="space-y-4 text-gray-700">
                <p className="flex items-center gap-2">
                  <FaExclamationTriangle className="text-[#0C7C59]" /> Emergency:
                  +91 987 654 3210
                </p>
                <p className="flex items-center gap-2">
                  <FaBuilding className="text-[#0C7C59]" /> Corporate: +91 555
                  333 2222
                </p>
              </div>

              <h3 className="text-lg text-[#0C7C59] mt-8 mb-3">
                Connect With Us
              </h3>
              <div className="flex gap-5 text-[#0C7C59] text-2xl">
                <a
                  href="https://wa.me/911234567890"
                  target="_blank"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="hover:text-green-500 transition" />
                </a>
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FaFacebook className="hover:text-blue-600 transition" />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram className="hover:text-pink-600 transition" />
                </a>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-[#0C7C59] mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0C7C59] focus:outline-none"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0C7C59] focus:outline-none"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0C7C59] focus:outline-none"
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm h-32 resize-none focus:ring-2 focus:ring-[#0C7C59] focus:outline-none"
                    placeholder="Write your message here..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0C7C59] text-white py-3 rounded-lg hover:bg-[#0b6b4e] transition-all duration-200 text-sm font-medium"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </div>

          {/* Map */}
          <div className="mt-16 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.0920866495555!2d76.95320817450705!3d8.524139893845598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbf9b4f22b41%3A0xd6a63f5a6d401cb!2sTrivandrum!5e0!3m2!1sen!2sin!4v1679327596323!5m2!1sen!2sin"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              title="Medicare Hospital Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
