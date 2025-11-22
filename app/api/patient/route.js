import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    let userId = null;
    let user = null;

    // First, try to get session from NextAuth (Google OAuth)
    const session = await getServerSession(authOptions);

    if (session && session.user) {
      userId = session.user.id;
      user = session.user;
    } else {
      // If no NextAuth session, try JWT token from cookies
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

    return NextResponse.json({
      appointments,
      prescriptions,
      medicalRecords,
      user: user,
      patientProfile: patient,
    });
  } catch (error) {
    console.error("Error fetching patient dashboard data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
