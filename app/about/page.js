"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  const logo = "/assets/logo.png";
  const doctorTeam = "/assets/doct2.jpg";
  const hospitalBuilding = "/assets/human1.jpg";

  return (
    <main className="bg-[#F9FBFA] text-gray-800 min-h-screen">
      {/* ===== Header Section ===== */}
      <section className="bg-[#0B6B56] py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={logo}
            alt="Hospital Logo"
            width={90}
            height={90}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-white mb-2">
            About Our Hospital
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Compassion. Excellence. Innovation. We are committed to providing
            world-class healthcare with a personal touch.
          </p>
        </motion.div>
      </section>

      {/* ===== Our Journey Section ===== */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-[#0B6B56] mb-4">
            Our Journey
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded with a mission to make quality healthcare accessible to all,
            our hospital has grown into a trusted name in medical excellence.
            From cutting-edge technology to a compassionate team, we ensure every
            patient receives the best care possible.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our multi-speciality departments, expert doctors, and patient-first
            philosophy have helped us earn trust and recognition across the
            region.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Image
            src={hospitalBuilding}
            alt="Hospital Building"
            width={500}
            height={350}
            className="rounded-2xl shadow-md border border-[#0B6B56]/10"
          />
        </motion.div>
      </section>

      {/* ===== Team Section ===== */}
      <section className="bg-[#E6F5EF] py-16">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold text-[#0B6B56] mb-6"
          >
            Meet Our Dedicated Team
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={doctorTeam}
              alt="Our Doctors"
              width={700}
              height={450}
              className="mx-auto rounded-2xl shadow-md border border-[#0B6B56]/10"
            />
          </motion.div>

          <p className="text-gray-700 max-w-2xl mx-auto mt-6">
            Our team of highly qualified doctors, nurses, and specialists work
            tirelessly to provide the best medical care to every patient.
          </p>
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="bg-[#0B6B56] text-white py-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">
            Ready to Experience World-Class Care?
          </h3>
          <p className="text-white/80 mb-6">
            Book an appointment today and take the first step toward better
            health.
          </p>
          <a
            href="/contact"
            className="bg-white text-[#0B6B56] px-6 py-3 rounded-xl font-medium shadow-md hover:bg-[#F9FBFA] transition"
          >
            Contact Us
          </a>
        </motion.div>
      </section>
    </main>
  );
}
