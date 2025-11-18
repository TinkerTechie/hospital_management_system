import { NextResponse } from "next/server";
import prisma from "../../../lib/db"; // make sure db.js is correct

export async function GET() {
  try {
    // Fetch upcoming appointments (example: limit 5)
    const appointments = await prisma.appointment.findMany({
      where: {
        // only for this patient — adjust after login integration
      },
      orderBy: { dateTime: "asc" },
      take: 5,
    });

    // Return dashboard stats
    return NextResponse.json({
      stats: {
        upcomingAppointments: appointments.length,
        totalPatients: 1, // not relevant for patient, you can remove later
      },
      appointments,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}
