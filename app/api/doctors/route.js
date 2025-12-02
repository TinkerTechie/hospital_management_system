import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
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

    return NextResponse.json({ doctors }, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
