"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

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

export default function Home() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [email, setEmail] = useState("");

  const handleNewsletter = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/newsletter", { email });
      Swal.fire({
        title: "Subscribed!",
        icon: "success",
        text: "Thanks for subscribing to our newsletter!",
        confirmButtonColor: "#0D9488",
      });
      setEmail("");
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Failed to subscribe. Try again!",
        confirmButtonColor: "#DC2626",
      });
    }
  };

  return (
    <main className="bg-[#F9FAFB] min-h-screen text-gray-800">
      {/* 🌐 Navbar */}
      <header className="bg-teal-600 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <Link href="/" className="text-2xl font-bold tracking-wide">
            🏥 HealthCare HMS
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-teal-200">
              Home
            </Link>
            <Link href="/about" className="hover:text-teal-200">
              About
            </Link>
            <Link href="/contact" className="hover:text-teal-200">
              Contact
            </Link>
            <Link
              href="/auth"
              className="bg-white text-teal-700 px-3 py-1 rounded-md hover:bg-teal-50"
            >
              Login
            </Link>
            <Link
              href="/auth"
              className="bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-300"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* 🩺 Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center h-[90vh] max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col text-center lg:text-left max-w-xl"
        >
          <h1 className="text-5xl font-bold mb-4 text-teal-700">
            Empowering Healthcare. Enriching Lives.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Delivering world-class medical care with compassion, innovation, and excellence.
            Because your health deserves the best.
          </p>
          <div className="mt-6 flex justify-center lg:justify-start gap-4">
            <Link
              href="/appointments"
              className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700"
            >
              Book Appointment
            </Link>
            <Link
              href="/services"
              className="border border-teal-600 text-teal-700 px-5 py-2 rounded-md hover:bg-teal-50"
            >
              Our Services
            </Link>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 80 }}
          transition={{ duration: 1.2 }}
          className="w-full md:w-[60%] lg:w-[50%] mt-10 lg:mt-0"
        >
          <Image
            src={banner}
            alt="Hospital Banner"
            className="rounded-2xl shadow-lg"
            priority
          />
        </motion.div>
      </section>

      {/* 💡 Why Choose Us */}
      <section className="py-20 bg-linear-to-b from-white to-teal-50">
        <h2 className="text-3xl font-semibold text-center mb-10 text-teal-700">
          Why Choose Us?
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto px-6">
          <div className="hidden md:block w-[380px]">
            <Image src={service} alt="Our Services" className="rounded-xl shadow-lg" />
          </div>
          <div className="flex flex-col gap-6 text-center md:text-left">
            {[
              ["Best Doctors", "Our doctors are professional, ethical, and highly skilled."],
              [
                "Advanced Research",
                "We lead medical innovation through continuous, credible research.",
              ],
              [
                "Patient-Centered Care",
                "We treat every patient with compassion, respect, and dignity.",
              ],
            ].map(([title, desc]) => (
              <div key={title}>
                <h3 className="text-xl font-semibold text-teal-700">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 👨‍⚕️ Meet Our Specialists */}
      <section className="py-20 bg-[#E0F2F1]">
        <h2 className="text-3xl font-semibold text-center mb-12 text-teal-800">
          Meet Our Specialists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[human1, doct1, doct2, doct3, doct4, doct5].map((img, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center border border-teal-100"
            >
              <Image src={img} alt="Doctor" className="w-24 h-24 rounded-full mb-4" />
              <h4 className="font-medium text-lg text-teal-700">
                Dr. Specialist {i + 1}
              </h4>
              <p className="text-sm text-gray-500 mb-3">Consultant</p>
              <a
                href="/appointment"
                className="bg-teal-600 text-white px-4 py-1 rounded-md hover:bg-teal-700 text-sm"
              >
                Book Appointment
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 Feedback */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          <div className="hidden md:block w-[350px]">
            <Image src={feedback} alt="Feedback" className="rounded-xl shadow-lg" />
          </div>
          <div className="bg-[#F0FDFA] p-8 rounded-xl shadow-md border border-teal-100">
            <div className="flex items-center mb-4">
              <Image src={review} alt="Review" className="w-16 h-16 rounded-full" />
              <div className="ml-4">
                <h4 className="font-semibold text-teal-800">Ms. Ariana Grande</h4>
                <p className="text-yellow-500">★★★★★</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              “I have visited many hospitals but HMS stands out as one of the best in the world.
              From reception to private rooms, the hospitality and care were exceptional.”
            </p>
          </div>
        </div>
      </section>

      {/* 📰 Newsletter */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-600 text-center text-white">
        <h3 className="text-2xl font-semibold mb-4">Stay Updated with HMS</h3>
        <p className="text-sm text-teal-100 mb-8">
          Subscribe to receive healthcare tips, new services, and hospital news.
        </p>
        <form
          onSubmit={handleNewsletter}
          className="flex justify-center items-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 w-full rounded-md border border-transparent text-black outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-300 font-medium"
          >
            Subscribe
          </button>
        </form>
      </section>

      {/* ⚡ Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 text-sm">
        © {new Date().getFullYear()} HealthCare HMS. All rights reserved.
      </footer>
    </main>
  );
}
