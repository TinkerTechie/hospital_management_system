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
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "../../src/redux/UserSlice";

export function SignUpForm({ onSwitch }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [role, setRole] = useState("patient");

  // Base fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Doctor/Nurse verification
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

    // License verification for doctors and nurses
    if ((role === "doctor" || role === "nurse") && !licenseNumber.trim())
      newErrors.licenseNumber = "License Number is required for verification.";

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

      // Add license number for doctors and nurses
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

      Swal.fire({
        title: "Success!",
        text: "Account created successfully! Logging you in...",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      // Auto-login logic
      const user = data.user;
      dispatch(login(user));
      localStorage.setItem("user", JSON.stringify(user));

      // Role-based redirect
      if (user.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (user.role === "DOCTOR") {
        router.push("/dashboard/doctor");
      } else if (user.role === "NURSE") {
        router.push("/dashboard/nurse");
      } else {
        router.push("/dashboard/patient");
      }

    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ROLE TOGGLE */}
      <div className="grid grid-cols-4 gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
        {[
          { id: "patient", label: "Patient", icon: User, activeClass: "bg-teal-600" },
          { id: "doctor", label: "Doctor", icon: Briefcase, activeClass: "bg-blue-600" },
          { id: "nurse", label: "Nurse", icon: Stethoscope, activeClass: "bg-purple-600" },
          { id: "admin", label: "Admin", icon: FileSignature, activeClass: "bg-orange-600" },
        ].map((r) => {
          const Icon = r.icon;
          const isActive = role === r.id;

          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`flex flex-col items-center justify-center rounded-lg px-2 py-3 transition-all ${isActive
                ? `${r.activeClass} shadow-lg text-white scale-105`
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{r.label}</span>
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

      {/* LICENSE NUMBER - For Doctors and Nurses */}
      {(role === "doctor" || role === "nurse") && (
        <>
          <label className="font-medium" htmlFor="licenseNumber">
            Medical License Number *
          </label>
          <Input
            id="licenseNumber"
            icon={FileSignature}
            placeholder="Enter your medical license number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            onBlur={validate}
          />
          {errors.licenseNumber && (
            <p className="text-red-500 text-sm">⚠️ {errors.licenseNumber}</p>
          )}
          <p className="text-xs text-gray-500 -mt-3">
            Required to verify your medical credentials
          </p>
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
