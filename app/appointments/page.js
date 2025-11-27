"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/shared/Navbar";
import AppointmentCalendar from "../components/AppointmentCalendar";
import TimeSlotPicker from "../components/TimeSlotPicker";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Calendar,
  Clock,
  User,
  Stethoscope,
  FileText,
  CheckCircle
} from 'lucide-react';

export default function AppointmentPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Booking data
  const [bookingData, setBookingData] = useState({
    serviceType: "",
    doctor: null,
    date: null,
    time: "",
    patientName: "",
    email: "",
    phone: "",
    city: "",
    reason: ""
  });

  // Check authentication
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to book an appointment.",
        icon: "info",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#00796B",
      }).then(() => {
        router.push("/auth");
      });
    } else {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setBookingData(prev => ({
        ...prev,
        patientName: userData.name || "",
        email: userData.email || ""
      }));
    }
  }, [router]);

  // Service types
  const serviceTypes = [
    { id: "consultation", name: "General Consultation", icon: Stethoscope, duration: "30 min" },
    { id: "followup", name: "Follow-up Visit", icon: FileText, duration: "15 min" },
    { id: "emergency", name: "Emergency Consultation", icon: CheckCircle, duration: "Immediate" }
  ];

  // Mock doctors data
  const doctors = [
    { id: 1, name: "Dr. Aarav Sharma", specialty: "Cardiologist", rating: 4.8, experience: "15 years", image: "/assets/doct1.jpg" },
    { id: 2, name: "Dr. Meera Patel", specialty: "Neurologist", rating: 4.9, experience: "12 years", image: "/assets/doct2.jpg" },
    { id: 3, name: "Dr. Rohan Kumar", specialty: "Orthopedic", rating: 4.7, experience: "10 years", image: "/assets/doct3.jpg" }
  ];

  const handleNext = () => {
    // Validation for each step
    if (currentStep === 1 && !bookingData.serviceType) {
      Swal.fire("Please select a service type", "", "warning");
      return;
    }
    if (currentStep === 2 && !bookingData.doctor) {
      Swal.fire("Please select a doctor", "", "warning");
      return;
    }
    if (currentStep === 3 && !bookingData.date) {
      Swal.fire("Please select a date", "", "warning");
      return;
    }
    if (currentStep === 4 && !bookingData.time) {
      Swal.fire("Please select a time slot", "", "warning");
      return;
    }
    if (currentStep === 5) {
      if (!bookingData.phone || !bookingData.city || !bookingData.reason) {
        Swal.fire("Please fill all required fields", "", "warning");
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const appointmentPayload = {
        patient: bookingData.patientName,
        email: bookingData.email,
        phone: bookingData.phone,
        city: bookingData.city,
        appointmentDate: bookingData.date?.toISOString().split('T')[0],
        time: bookingData.time,
        doctor: bookingData.doctor?.name,
        reason: bookingData.reason,
        serviceType: bookingData.serviceType
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentPayload),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Appointment Booked!",
          text: "Your appointment has been confirmed successfully.",
          icon: "success",
          confirmButtonColor: "#00796B",
        }).then(() => {
          router.push("/dashboard/patient/appointments");
        });
      } else {
        Swal.fire("Error", data.error || "Failed to book appointment.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Server Error", "Unable to connect to the server.", "error");
    }
  };

  // Progress indicator
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
              ${currentStep >= step ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}
              transition-all duration-300
            `}>
              {currentStep > step ? <Check className="h-5 w-5" /> : step}
            </div>
            {step < 6 && (
              <div className={`
                flex-1 h-1 mx-2
                ${currentStep > step ? 'bg-teal-600' : 'bg-gray-200'}
                transition-all duration-300
              `} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm font-semibold text-gray-800 mt-2">
        <span>Service</span>
        <span>Doctor</span>
        <span>Date</span>
        <span>Time</span>
        <span>Details</span>
        <span>Confirm</span>
      </div>
    </div>
  );

  // Step 1: Service Type Selection
  const ServiceTypeStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Service Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceTypes.map((service) => {
          const Icon = service.icon;
          return (
            <button
              key={service.id}
              onClick={() => setBookingData({ ...bookingData, serviceType: service.id })}
              className={`
                p-6 rounded-xl border-2 transition-all text-left
                ${bookingData.serviceType === service.id
                  ? 'border-teal-600 bg-teal-50'
                  : 'border-gray-200 hover:border-teal-300'
                }
              `}
            >
              <Icon className={`h-8 w-8 mb-3 ${bookingData.serviceType === service.id ? 'text-teal-600' : 'text-gray-600'}`} />
              <h3 className="font-bold text-lg mb-1 text-gray-900">{service.name}</h3>
              <p className="text-sm font-medium text-gray-700">Duration: {service.duration}</p>
            </button>
          );
        })}
      </div>
    </motion.div>
  );

  // Step 2: Doctor Selection
  const DoctorSelectionStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Doctor</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <button
            key={doctor.id}
            onClick={() => setBookingData({ ...bookingData, doctor })}
            className={`
              p-6 rounded-xl border-2 transition-all text-left
              ${bookingData.doctor?.id === doctor.id
                ? 'border-teal-600 bg-teal-50'
                : 'border-gray-200 hover:border-teal-300'
              }
            `}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
              {doctor.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="font-bold text-lg mb-1 text-gray-900">{doctor.name}</h3>
            <p className="text-sm font-medium text-gray-700 mb-2">{doctor.specialty}</p>
            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
              <span>⭐ {doctor.rating}</span>
              <span>{doctor.experience}</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  // Step 3: Date Selection
  const DateSelectionStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Date</h2>
      <AppointmentCalendar
        selectedDate={bookingData.date}
        onDateSelect={(date) => setBookingData({ ...bookingData, date })}
      />
    </motion.div>
  );

  // Step 4: Time Selection
  const TimeSelectionStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Time Slot</h2>
      <TimeSlotPicker
        selectedTime={bookingData.time}
        onTimeSelect={(time) => setBookingData({ ...bookingData, time })}
      />
    </motion.div>
  );

  // Step 5: Patient Details
  const PatientDetailsStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Details</h2>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={bookingData.patientName}
            onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
            placeholder="Full Name"
            className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-600 bg-white"
            required
          />
          <input
            type="email"
            value={bookingData.email}
            onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
            placeholder="Email Address"
            className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-600 bg-white"
            required
          />
          <input
            type="tel"
            value={bookingData.phone}
            onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
            placeholder="Phone Number"
            className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-600 bg-white"
            required
          />
          <input
            type="text"
            value={bookingData.city}
            onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}
            placeholder="City"
            className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-600 bg-white"
            required
          />
        </div>
        <textarea
          value={bookingData.reason}
          onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
          placeholder="Reason for Appointment"
          className="border-2 border-gray-300 rounded-lg px-4 py-3 mt-4 w-full text-gray-900 placeholder-gray-500 focus:outline-none focus:border-teal-600 bg-white"
          rows={4}
          required
        />
      </div>
    </motion.div>
  );

  // Step 6: Confirmation
  const ConfirmationStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Appointment</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b">
            <span className="font-medium text-gray-700">Service Type:</span>
            <span className="font-semibold">{serviceTypes.find(s => s.id === bookingData.serviceType)?.name}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="font-medium text-gray-700">Doctor:</span>
            <span className="font-semibold">{bookingData.doctor?.name}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="font-medium text-gray-700">Date:</span>
            <span className="font-semibold">{bookingData.date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="font-medium text-gray-700">Time:</span>
            <span className="font-semibold">{bookingData.time}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b">
            <span className="font-medium text-gray-700">Patient:</span>
            <span className="font-semibold">{bookingData.patientName}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="font-medium text-gray-700">Contact:</span>
            <span className="font-semibold">{bookingData.phone}</span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-600 text-white font-bold py-4 rounded-lg mt-6 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle className="h-5 w-5" />
          Confirm Booking
        </button>
      </div>
    </motion.div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
            <p className="text-lg font-medium text-gray-700">Follow the steps to schedule your visit</p>
          </div>

          {/* Progress Bar */}
          <ProgressBar />

          {/* Step Content */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {currentStep === 1 && <ServiceTypeStep key="step1" />}
              {currentStep === 2 && <DoctorSelectionStep key="step2" />}
              {currentStep === 3 && <DateSelectionStep key="step3" />}
              {currentStep === 4 && <TimeSelectionStep key="step4" />}
              {currentStep === 5 && <PatientDetailsStep key="step5" />}
              {currentStep === 6 && <ConfirmationStep key="step6" />}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
                ${currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-teal-600'
                }
              `}
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>

            {currentStep < totalSteps && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-colors"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
