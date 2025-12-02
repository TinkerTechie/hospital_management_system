import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/db";

export async function GET(request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userId;
        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            userId = decoded.id;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";
        const sortBy = searchParams.get("sortBy") || "name";
        const sortOrder = searchParams.get("sortOrder") || "asc";
        const status = searchParams.get("status");
        const bloodGroup = searchParams.get("bloodGroup");

        const skip = (page - 1) * limit;

        // Build where clause
        const where = {
            AND: [
                search
                    ? {
                        OR: [
                            { fullName: { contains: search, mode: "insensitive" } },
                        ],
                    }
                    : {},
                bloodGroup && bloodGroup !== "all" ? { bloodGroup } : {},
            ],
        };

        // Fetch patients with pagination
        const [patients, total] = await Promise.all([
            prisma.patient.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy === "name" ? "fullName" : sortBy]: sortOrder },
                select: {
                    id: true,
                    fullName: true,
                    bloodGroup: true,
                    assignedWard: true,
                    age: true,
                    createdAt: true,
                    user: {
                        select: {
                            email: true,
                            image: true,
                        }
                    }
                },
            }),
            prisma.patient.count({ where }),
        ]);

        return NextResponse.json({
            patients: patients.map(p => ({
                ...p,
                name: p.fullName,
                email: p.user?.email,
                image: p.user?.image
            })),
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching patients:", error);
        return NextResponse.json(
            { error: "Failed to fetch patients" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userRole;
        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            userRole = decoded.role;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        // Check if user has permission (admin, doctor, or nurse)
        if (!["ADMIN", "DOCTOR", "NURSE"].includes(userRole)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const data = await request.json();

        // Note: In a real app, we should create a User first, but for now assuming we just create Patient record linked to a placeholder or existing user is complex.
        // For simplicity in this task, we will just update the Patient record if it exists, or create one.
        // However, the schema requires `userId`.
        // Since we are just adding `assignedWard` support, let's assume we are updating an existing patient or creating one properly.

        // Actually, let's just support PUT for updating ward for now, as creating a full patient requires User creation.
        // But the user asked for "edit".

        return NextResponse.json({ error: "Create not implemented yet" }, { status: 501 });

    } catch (error) {
        console.error("Error creating patient:", error);
        return NextResponse.json(
            { error: "Failed to create patient" },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            jwt.verify(token.value, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const data = await request.json();
        const { id, assignedWard } = data;

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const updatedPatient = await prisma.patient.update({
            where: { id },
            data: {
                assignedWard
            }
        });

        return NextResponse.json({ patient: updatedPatient }, { status: 200 });
    } catch (error) {
        console.error("Error updating patient:", error);
        return NextResponse.json(
            { error: "Failed to update patient" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userRole;
        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            userRole = decoded.role;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        if (userRole !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Patient ID is required" }, { status: 400 });
        }

        // Check if patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: parseInt(id) },
        });

        if (!patient) {
            return NextResponse.json({ error: "Patient not found" }, { status: 404 });
        }

        // Delete patient
        await prisma.patient.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "Patient deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting patient:", error);
        return NextResponse.json(
            { error: "Failed to delete patient" },
            { status: 500 }
        );
    }
}
