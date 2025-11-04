import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// -------------------------
// GET → Fetch all doctors
// -------------------------
export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        fullName: true,
        specialization: true,
        yearsOfExperience: true,
      },
    });
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}

// -------------------------
// PUT → Update a doctor profile
// -------------------------
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, fullName, specialization, yearsOfExperience, email, phone, address, city, state } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Doctor ID is required" },
        { status: 400 }
      );
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data: { fullName, specialization, yearsOfExperience, email, phone, address, city, state },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update doctor profile" },
      { status: 500 }
    );
  }
}
