import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
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

    // Find patient profile
    const patient = await prisma.patient.findUnique({
      where: { userId },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient profile not found" }, { status: 404 });
    }

    const data = await req.json();
    const {
      doctorId,
      email,
      phone,
      appointmentDate,
      time,
      reason,
      city,
    } = data;

    const appointment = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        doctorId,
        email: email || patient.user?.email, // Fallback to user email if not provided
        phone: phone || patient.phone,
        appointmentDate: new Date(appointmentDate), // Ensure Date object
        time,
        reason,
        city,
      },
    });

    return NextResponse.json({ success: true, appointment }, { status: 201 });
  } catch (error) {
    console.error("Error saving appointment:", error);
    return NextResponse.json(
      { success: false, error: "Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
