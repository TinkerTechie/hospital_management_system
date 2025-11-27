import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// GET - Fetch patient updates
export async function GET(req) {
    try {
        // Get token from cookie
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Get user and patient profile
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                patientProfile: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Only patients can fetch their updates
        if (user.role !== "PATIENT" || !user.patientProfile) {
            return NextResponse.json(
                { error: "Only patients can view updates" },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(req.url);
        const limit = parseInt(searchParams.get("limit") || "10");
        const offset = parseInt(searchParams.get("offset") || "0");

        const updates = await prisma.patientUpdate.findMany({
            where: {
                patientId: user.patientProfile.id,
            },
            include: {
                updatedBy: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: limit,
            skip: offset,
        });

        const total = await prisma.patientUpdate.count({
            where: {
                patientId: user.patientProfile.id,
            },
        });

        return NextResponse.json({
            updates,
            total,
            limit,
            offset,
        });
    } catch (error) {
        console.error("Error fetching patient updates:", error);
        return NextResponse.json(
            { error: "Failed to fetch patient updates" },
            { status: 500 }
        );
    }
}

// POST - Create a patient update (doctor/nurse/admin only)
export async function POST(req) {
    try {
        // Get token from cookie
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const creatorId = decoded.id;

        // Get creator user
        const creator = await prisma.user.findUnique({
            where: { id: creatorId },
        });

        if (!creator) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check permissions (only admin, doctor, nurse can create updates)
        if (!["ADMIN", "DOCTOR", "NURSE"].includes(creator.role)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();
        const { patientId, updateType, title, description } = body;

        // Validate required fields
        if (!patientId || !updateType || !title || !description) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate update type
        if (
            ![
                "DIAGNOSIS",
                "PRESCRIPTION",
                "APPOINTMENT",
                "TREATMENT",
                "TEST_RESULT",
                "GENERAL",
            ].includes(updateType)
        ) {
            return NextResponse.json(
                { error: "Invalid update type" },
                { status: 400 }
            );
        }

        // Verify patient exists
        const patient = await prisma.patient.findUnique({
            where: { id: patientId },
            include: {
                user: true,
            },
        });

        if (!patient) {
            return NextResponse.json({ error: "Patient not found" }, { status: 404 });
        }

        // Create patient update
        const update = await prisma.patientUpdate.create({
            data: {
                patientId,
                updatedById: creatorId,
                updateType,
                title,
                description,
            },
            include: {
                updatedBy: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
        });

        // Create notification for patient
        await prisma.notification.create({
            data: {
                userId: patient.userId,
                title: `New ${updateType.toLowerCase().replace("_", " ")} update`,
                message: title,
                type: "INFO",
                link: `/dashboard/patient/updates`,
            },
        });

        return NextResponse.json({
            success: true,
            update,
            message: "Patient update created successfully",
        });
    } catch (error) {
        console.error("Error creating patient update:", error);
        return NextResponse.json(
            { error: "Failed to create patient update" },
            { status: 500 }
        );
    }
}
