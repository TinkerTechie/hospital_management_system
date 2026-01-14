/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-hooks/static-components */
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

// Progress indicator
const ProgressBar = ({ currentStep }) => (
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
const ServiceTypeStep = ({ bookingData, setBookingData }) => (
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
const DoctorSelectionStep = ({ bookingData, setBookingData, doctors, loading }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-4"
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Doctor</h2>
    {loading ? (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading doctors...</p>
      </div>
    ) : doctors.length === 0 ? (
      <div className="text-center py-10 text-gray-500">
        No doctors found. Please try again later.
      </div>
    ) : (
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
              {doctor.fullName?.split(' ').map(n => n[0]).join('') || 'DR'}
            </div>
            <h3 className="font-bold text-lg mb-1 text-gray-900">{doctor.fullName}</h3>
            <p className="text-sm font-medium text-gray-700 mb-2">{doctor.specialization}</p>
            <div className="flex items-center justify-between text-sm font-medium text-gray-700">
              <span>⭐ {doctor.rating || '4.8'}</span>
              <span>{doctor.yearsOfExperience ? `${doctor.yearsOfExperience} years` : 'Experienced'}</span>
            </div>
          </button>
        ))}
      </div>
    )}
  </motion.div>
);

// Step 3: Date Selection
const DateSelectionStep = ({ bookingData, setBookingData }) => (
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
const TimeSelectionStep = ({ bookingData, setBookingData }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Time Slot</h2>
    <TimeSlotPicker
      selectedTime={bookingData.time}
      onTimeSelect={(time) => setBookingData({ ...bookingData, time })}
      selectedDate={bookingData.date}
    />
  </motion.div>
);

// Step 5: Patient Details
const PatientDetailsStep = ({ bookingData, setBookingData }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Patient Details</h2>

    <input
      type="text"
      placeholder="Phone Number"
      value={bookingData.phone}
      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />

    <input
      type="text"
      placeholder="City"
      value={bookingData.city}
      onChange={(e) => setBookingData({ ...bookingData, city: e.target.value })}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />

    <textarea
      placeholder="Reason for Visit"
      value={bookingData.reason}
      onChange={(e) => setBookingData({ ...bookingData, reason: e.target.value })}
      rows={4}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
    />
  </motion.div>
);



// Step 6: Confirmation
const ConfirmationStep = ({ bookingData, handleSubmit }) => (
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
          <span className="font-semibold">{bookingData.doctor?.fullName}</span>
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

export default function AppointmentPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
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

  // Check authentication and fetch doctors
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
      fetchDoctors();
    }
  }, [router]);

  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const res = await fetch("/api/doctors");
      if (res.ok) {
        const data = await res.json();
        setDoctors(data.doctors || []);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoadingDoctors(false);
    }
  };

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
        doctorId: bookingData.doctor?.id, // Send ID, not name
        reason: bookingData.reason,
        serviceType: bookingData.serviceType,
        type: "Consultation", // Default type
        status: "scheduled"
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentPayload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
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
          <ProgressBar currentStep={currentStep} />

          {/* Step Content */}
          <div className="min-h-[500px]">
            <AnimatePresence mode="wait">
              {currentStep === 1 && <ServiceTypeStep key="step1" bookingData={bookingData} setBookingData={setBookingData} />}
              {currentStep === 2 && <DoctorSelectionStep key="step2" bookingData={bookingData} setBookingData={setBookingData} doctors={doctors} loading={loadingDoctors} />}
              {currentStep === 3 && <DateSelectionStep key="step3" bookingData={bookingData} setBookingData={setBookingData} />}
              {currentStep === 4 && <TimeSelectionStep key="step4" bookingData={bookingData} setBookingData={setBookingData} />}
              {currentStep === 5 && <PatientDetailsStep key="step5" bookingData={bookingData} setBookingData={setBookingData} />}
              {currentStep === 6 && <ConfirmationStep key="step6" bookingData={bookingData} handleSubmit={handleSubmit} />}
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
