// app/api/appointments/route.js
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req) {
  try {
    const data = await req.json();
    const {
      patient,
      email,
      phone,
      appointmentDate,
      time,
      doctor,
      reason,
      city,
    } = data;

    const appointment = await prisma.appointment.create({
      data: {
        patient,
        email,
        phone,
        appointmentDate,
        time,
        doctor,
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
