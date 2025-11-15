import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET() {
  try {
    const doctor = await prisma.doctor.findFirst({
      select: {
        id: true,
        fullName: true,
        specialization: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!doctor) {
      return NextResponse.json({ error: "No doctor found" }, { status: 404 });
    }

    return NextResponse.json(doctor, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
