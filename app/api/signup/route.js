import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";   // ⬅️ ADDED

export async function POST(req) {
  try {
    const { name, email, password, role, licenseNumber } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Name, email, password, and role are required" },
        { status: 400 }
      );
    }

    const validRoles = ["PATIENT", "DOCTOR", "NURSE", "ADMIN"];
    if (!validRoles.includes(role.toUpperCase())) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
      },
    });

    switch (role.toUpperCase()) {
      case "DOCTOR":
        await prisma.doctor.create({
          data: {
            fullName: name,
            userId: user.id,
            licenseNumber: licenseNumber || null,
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

    // Validate JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    fetch(`${appUrl}/api/email/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: user.email,
        subject: "Welcome to HospitalNext!",
        text: `Hello ${user.name},\n\nWelcome to HospitalNext!`,
      }),
    }).catch((err) => console.error("Error sending welcome email:", err));

    const response = NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: userSafe,
        token,
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Server error during signup" },
      { status: 500 }
    );
  }
}
