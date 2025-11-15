import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import bcrypt from "bcryptjs";

// POST /api/auth/signup
export async function POST(req) {
  try {
    const { name, email, password, role, dob } = await req.json(); // ⬅️ added dob

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password, and role are required" },
        { status: 400 }
      );
    }

    // Validate role enum
    const validRoles = ["PATIENT", "DOCTOR", "NURSE"];
    if (!validRoles.includes(role.toUpperCase())) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
      },
    });

    // Create linked profile based on role
    switch (role.toUpperCase()) {
      case "DOCTOR":
        await prisma.doctor.create({
          data: {
            fullName: name,
            userId: user.id,
            dob: new Date(dob),
            gender: gender,
            phone: phone,
            licenseNumber: licenseNumber,
          },
        });
        break;

      case "NURSE":
        await prisma.nurse.create({
          data: {
            fullName: name,
            userId: user.id,
          },
        });
        break;

      case "PATIENT":
        await prisma.patient.create({
          data: {
            fullName: name,
            userId: user.id,
          },
        });
        break;
    }

    const { password: _, ...userSafe } = user;

    // Send welcome email asynchronously (non-blocking)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: user.email,
        subject: "Welcome to HospitalNext!",
        text: `Hello ${user.name},\n\nWelcome to HospitalNext! Your account has been created successfully. We are glad to have you onboard!\n\n- Team HospitalNext`,
      }),
    }).catch((err) => console.error("Error sending welcome email:", err));

    // Response
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: userSafe,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Server error during signup" },
      { status: 500 }
    );
  }
}
