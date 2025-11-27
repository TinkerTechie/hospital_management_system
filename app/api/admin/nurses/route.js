import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

// GET: Fetch all nurses
export async function GET() {
    try {
        const nurses = await prisma.nurse.findMany({
            include: {
                user: {
                    select: {
                        email: true,
                        image: true,
                    },
                },
            },
            orderBy: { fullName: "asc" },
        });

        return NextResponse.json(nurses);
    } catch (error) {
        console.error("Error fetching nurses:", error);
        return NextResponse.json(
            { error: "Failed to fetch nurses" },
            { status: 500 }
        );
    }
}

// PUT: Update nurse details (Shift & Ward)
export async function PUT(req) {
    try {
        const { id, shiftTiming, assignedWard } = await req.json();

        if (!id) {
            return NextResponse.json(
                { error: "Nurse ID is required" },
                { status: 400 }
            );
        }

        const updatedNurse = await prisma.nurse.update({
            where: { id },
            data: {
                shiftTiming,
                assignedWard,
            },
        });

        return NextResponse.json(updatedNurse);
    } catch (error) {
        console.error("Error updating nurse:", error);
        return NextResponse.json(
            { error: "Failed to update nurse" },
            { status: 500 }
        );
    }
}
