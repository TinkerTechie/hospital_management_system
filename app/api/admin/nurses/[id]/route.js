import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../lib/db";

// GET: Fetch single nurse by ID
export async function GET(request, { params }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const nurse = await prisma.nurse.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        email: true,
                        image: true,
                    },
                },
            },
        });

        if (!nurse) {
            return NextResponse.json({ error: "Nurse not found" }, { status: 404 });
        }

        return NextResponse.json({
            ...nurse,
            email: nurse.user?.email,
            image: nurse.user?.image,
        });

    } catch (error) {
        console.error("Error fetching nurse:", error);
        return NextResponse.json(
            { error: "Failed to fetch nurse details" },
            { status: 500 }
        );
    }
}

// PUT: Update nurse details
export async function PUT(request, { params }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const data = await request.json();

        const updatedNurse = await prisma.nurse.update({
            where: { id },
            data: {
                fullName: data.name,
                phone: data.phone,
                shiftTiming: data.shiftTiming,
                assignedWard: data.assignedWard,
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
