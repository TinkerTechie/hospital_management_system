// app/api/appointments/route.js
import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      patientId,
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
        patientId,
        doctorId,
        email,
        phone,
        appointmentDate,
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
