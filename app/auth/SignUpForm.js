"use client";

import React, { useState } from "react";
import { Mail, Lock, User, Briefcase, Stethoscope, ArrowRight } from "lucide-react";
import { Input } from "./Input";
import { Button } from "./Button";
import Swal from "sweetalert2";

// Role Toggle Component
function RoleToggle({ selectedRole, onRoleChange }) {
  const roles = [
    { id: "patient", label: "Patient", icon: User },
    { id: "doctor", label: "Doctor", icon: Briefcase },
    { id: "nurse", label: "Nurse", icon: Stethoscope },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-100 p-1">
      {roles.map((r) => {
        const Icon = r.icon;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onRoleChange(r.id)}
            className={`flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
              selectedRole === r.id
                ? "bg-white text-green-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Icon className="mr-2 h-4 w-4" /> {r.label}
          </button>
        );
      })}
    </div>
  );
}

// Signup Form Component
export function SignUpForm({ onSwitch }) {
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: role.toUpperCase(), // Match Prisma ENUM
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.error || "Signup failed", "error");
        return;
      }

      Swal.fire("Success!", "Account created. Please login.", "success");
      onSwitch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Signup failed. Check console.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <RoleToggle selectedRole={role} onRoleChange={setRole} />
      <Input
        id="signup-name"
        label="Full Name"
        icon={User}
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        id="signup-email"
        label="Email"
        icon={Mail}
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        id="signup-password"
        label="Password"
        icon={Lock}
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        id="signup-confirm-password"
        label="Confirm Password"
        icon={Lock}
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Account"}{" "}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-medium text-green-600 hover:text-green-700 hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  );
}
