"use client";

import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Briefcase,
  Stethoscope,
  ArrowRight,
  FileSignature,
  Loader2
} from "lucide-react";
import { Input } from "./Input";
import { Button } from "./Button";
import Swal from "sweetalert2";

export function SignUpForm({ onSwitch }) {
  const [role, setRole] = useState("patient");

  // Base fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Doctor/Nurse field
  const [licenseNumber, setLicenseNumber] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /** Email validator */
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /** MAIN VALIDATION (Runs only onBlur + Submit) */
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Full Name is required.";

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!validateEmail(email))
      newErrors.email = "Please enter a valid email address.";

    if (!password.trim()) newErrors.password = "Password is required.";

    // FIXED: only check mismatch when both filled
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    // Only doctor/nurse
    if ((role === "doctor" || role === "nurse") && !licenseNumber.trim())
      newErrors.licenseNumber = "License Number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** FIXED Password onChange */
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (confirmPassword && value !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match."
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: null }));
    }
  };

  /** FIXED Confirm Password onChange */
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password && value !== password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match."
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: null }));
    }
  };

  /** SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const body = {
        name,
        email,
        password,
        role: role.toUpperCase(),
      };

      if (role === "doctor" || role === "nurse") {
        body.licenseNumber = licenseNumber;
      }

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.error || "Signup failed", "error");
        return;
      }

      Swal.fire("Success!", "Account created successfully!", "success");
      onSwitch();
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ROLE TOGGLE */}
      <div className="grid grid-cols-3 gap-2 bg-gray-100 p-2 rounded-lg">
        {[
          { id: "patient", label: "Patient", icon: User },
          { id: "doctor", label: "Doctor", icon: Briefcase },
          { id: "nurse", label: "Nurse", icon: Stethoscope },
        ].map((r) => {
          const Icon = r.icon;

          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`flex items-center justify-center rounded-md px-3 py-2 ${
                role === r.id
                  ? "bg-white shadow text-green-700"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Icon className="h-4 w-4 mr-2" /> {r.label}
            </button>
          );
        })}
      </div>

      {/* FULL NAME */}
      <label className="font-medium" htmlFor="name">
        Full Name
      </label>
      <Input
        id="name"
        icon={User}
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={validate}
      />
      {errors.name && <p className="text-red-500 text-sm">⚠️ {errors.name}</p>}

      {/* EMAIL */}
      <label className="font-medium" htmlFor="email">
        Email Address
      </label>
      <Input
        id="email"
        type="email"
        icon={Mail}
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={validate}
      />
      {errors.email && <p className="text-red-500 text-sm">⚠️ {errors.email}</p>}

      {/* PASSWORD */}
      <label className="font-medium" htmlFor="password">
        Password
      </label>
      <Input
        id="password"
        type="password"
        icon={Lock}
        placeholder="Enter your password"
        value={password}
        onChange={handlePasswordChange}
        onBlur={validate}
      />
      {errors.password && <p className="text-red-500 text-sm">⚠️ {errors.password}</p>}

      {/* CONFIRM PASSWORD */}
      <label className="font-medium" htmlFor="confirmPassword">
        Confirm Password
      </label>
      <Input
        id="confirmPassword"
        type="password"
        icon={Lock}
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        onBlur={validate}
      />
      {errors.confirmPassword && (
        <p className="text-red-500 text-sm">⚠️ {errors.confirmPassword}</p>
      )}

      {/* LICENSE NUMBER */}
      {(role === "doctor" || role === "nurse") && (
        <>
          <label className="font-medium" htmlFor="licenseNumber">
            License Number
          </label>
          <Input
            id="licenseNumber"
            icon={FileSignature}
            placeholder="Enter your license number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            onBlur={validate}
          />
          {errors.licenseNumber && (
            <p className="text-red-500 text-sm">⚠️ {errors.licenseNumber}</p>
          )}
        </>
      )}

      {/* BUTTON */}
      <Button type="submit" disabled={loading}>
        {loading ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <>
            Create Account <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>

      {/* SWITCH */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-green-700 underline"
        >
          Login
        </button>
      </p>
    </form>
  );
}
