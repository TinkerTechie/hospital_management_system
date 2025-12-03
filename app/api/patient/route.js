import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    let userId = null;
    let user = null;

    // Get JWT token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;

      // Fetch user from database
      const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true, image: true }
      });

      if (!dbUser) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      user = dbUser;
    } catch (jwtError) {
      console.error("JWT verification failed:", jwtError);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the patient profile associated with the user
    const patient = await prisma.patient.findUnique({
      where: { userId: userId },
    });

    // If no patient profile exists, return empty data structure
    if (!patient) {
      return NextResponse.json({
        appointments: [],
        prescriptions: [],
        medicalRecords: [],
        user: user,
        patientProfile: null, // Frontend should handle this
      });
    }

    // Fetch data from DB using the patient's ID
    const appointments = await prisma.appointment.findMany({
      where: { patientId: patient.id },
      include: { doctor: true },
      orderBy: { appointmentDate: "asc" },
    });

    const prescriptions = await prisma.prescription.findMany({
      where: { patientId: patient.id },
      include: { doctor: true },
      orderBy: { issuedDate: "desc" },
    });

    const medicalRecords = await prisma.medicalRecord.findMany({
      where: { patientId: patient.id },
      include: { doctor: true },
      orderBy: { date: "desc" },
    });

    // Fetch latest vitals
    const vitals = await prisma.vitals.findMany({
      where: { patientId: patient.id },
      orderBy: { createdAt: "desc" },
      take: 1, // Get only the most recent vitals
    });

    return NextResponse.json({
      appointments,
      prescriptions,
      medicalRecords,
      vitals: vitals[0] || null, // Return the latest vitals or null
      user: user,
      patientProfile: patient,
    });
  } catch (error) {
    console.error("Error fetching patient dashboard data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { name, email, phone, address, bloodGroup, insuranceProvider, medicalHistory, dob } = body;

    // Get current user to check if email is changing
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    // Only update email if it's different from current email
    const updateData = { name };
    if (email && email !== currentUser.email) {
      // Check if new email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser && existingUser.id !== userId) {
        return NextResponse.json(
          { error: "Email already in use" },
          { status: 400 }
        );
      }
      updateData.email = email;
    }

    // Update User model
    await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    // Update Patient model
    // We use upsert to create if it doesn't exist (though it should for a patient user)
    // Calculate age if DOB is provided
    let age = undefined;
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    }

    const updatedPatient = await prisma.patient.upsert({
      where: { userId: userId },
      update: {
        fullName: name,
        bloodGroup,
        medicalHistory,
        phone,
        address,
        dob: dob ? new Date(dob) : undefined,
        insuranceProvider,
        age,
      },
      create: {
        userId,
        fullName: name,
        bloodGroup,
        medicalHistory,
        phone,
        address,
        dob: dob ? new Date(dob) : undefined,
        insuranceProvider,
        age,
      },
    });

    return NextResponse.json({ success: true, patient: updatedPatient });
  } catch (error) {
    console.error("Error updating patient profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
