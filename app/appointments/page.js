"use client";
import React, { useState } from "react";
import Navbar from "../components/shared/Navbar";
import Swal from "sweetalert2";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AppointmentPage() {
  const [appointment, setAppointment] = useState({
    patient: "",
    phone: "",
    appointmentDate: "",
    time: "",
    doctor: "",
    reason: "",
    email: "",
    city: "",
  });

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        title: "Appointment Booked!",
        text: "Your appointment has been saved successfully.",
        icon: "success",
        confirmButtonColor: "#00796B",
      });

      // reset form
      setAppointment({
        patient: "",
        phone: "",
        appointmentDate: "",
        time: "",
        doctor: "",
        reason: "",
        email: "",
        city: "",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: data.error || "Failed to book appointment.",
        icon: "error",
        confirmButtonColor: "#00796B",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: "Server Error",
      text: "Unable to connect to the server.",
      icon: "error",
      confirmButtonColor: "#00796B",
    });
  }
};


  // ✅ use /assets/... paths (no imports from public folder)
  const appoint = "/assets/appoint.png";
  const doct1 = "/assets/doct1.jpg";
  const doct2 = "/assets/doct2.jpg";
  const doct3 = "/assets/doct3.jpg";

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#00796B] text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Book Your Appointment</h1>
        <p className="mt-3 text-lg">
          Delivering world-class care with compassion and innovation.
        </p>
      </section>

      {/* Appointment Form Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center px-6 py-12 gap-10">
        {/* Left Image */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={appoint}
            alt="Doctor appointment"
            className="rounded-xl shadow-lg"
            width={400}
            height={400}
            priority
          />
        </motion.div>

        {/* Appointment Form */}
        <motion.form
          ref={ref}
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
        >
          <h2 className="text-2xl font-semibold text-[#00796B] mb-6 text-center">
            Schedule an Appointment
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["patient", "phone", "email", "city"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={
                  field === "patient"
                    ? "Full Name"
                    : field === "phone"
                    ? "Phone Number"
                    : field === "email"
                    ? "Email Address"
                    : "City"
                }
                onChange={handleChange}
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00796B]"
                required
              />
            ))}
            <input
              type="date"
              name="appointmentDate"
              onChange={handleChange}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00796B]"
              required
            />
            <input
              type="time"
              name="time"
              onChange={handleChange}
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00796B]"
              required
            />
          </div>

          <textarea
            name="reason"
            placeholder="Reason for Appointment"
            onChange={handleChange}
            className="border rounded-md px-4 py-2 mt-4 w-full focus:outline-none focus:ring-2 focus:ring-[#00796B]"
            required
          />

          <button
            type="submit"
            className="bg-[#00796B] text-white font-semibold mt-6 py-3 px-6 rounded-lg w-full hover:bg-[#00695C] transition"
          >
            Book Appointment
          </button>
        </motion.form>
      </section>

      {/* Doctors Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-3xl font-bold text-center text-[#00796B] mb-10">
          Meet Our Doctors
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {[doct1, doct2, doct3].map((doc, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white rounded-xl shadow-md overflow-hidden w-72 text-center hover:shadow-lg transition"
            >
              <Image
                src={doc}
                alt={`Doctor ${i + 1}`}
                width={400}
                height={300}
                className="object-cover w-full h-56"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-[#00796B]">
                  Dr. {["Aarav", "Meera", "Rohan"][i]}
                </h3>
                <p className="text-gray-500">Specialist</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
