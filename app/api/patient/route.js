import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // your prisma client

export async function GET(req) {
  try {
    const userId = req.headers.get("x-user-id"); // get from auth later

    if (!userId) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    // Fetch data from DB
    const appointments = await prisma.appointment.findMany({
      where: { patientId: userId },
      orderBy: { dateTime: "asc" },
    });

    const activities = await prisma.activity.findMany({
      where: { patientId: userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const prescriptions = await prisma.prescription.findMany({
      where: { patientId: userId },
    });

    return NextResponse.json({
      appointments,
      activities,
      prescriptions,
      healthScore: 92, // optional
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
