import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/db";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";
        const sortBy = searchParams.get("sortBy") || "date";
        const sortOrder = searchParams.get("sortOrder") || "desc";
        const status = searchParams.get("status");
        const type = searchParams.get("type");

        const skip = (page - 1) * limit;

        // Build where clause
        const where = {
            AND: [
                search
                    ? {
                        OR: [
                            { patient: { name: { contains: search, mode: "insensitive" } } },
                            { doctor: { name: { contains: search, mode: "insensitive" } } },
                        ],
                    }
                    : {},
                status && status !== "all" ? { status } : {},
                type && type !== "all" ? { type } : {},
            ],
        };

        // Fetch appointments with pagination
        const [appointments, total] = await Promise.all([
            prisma.appointment.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    patient: {
                        select: {
                            id: true,
                            name: true,
                            phone: true,
                            email: true,
                        },
                    },
                    doctor: {
                        select: {
                            id: true,
                            name: true,
                            specialization: true,
                        },
                    },
                },
            }),
            prisma.appointment.count({ where }),
        ]);

        return NextResponse.json({
            appointments,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return NextResponse.json(
            { error: "Failed to fetch appointments" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userRole = session.user.role;
        if (!["admin", "doctor", "nurse"].includes(userRole)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const data = await request.json();

        const appointment = await prisma.appointment.create({
            data: {
                patientId: data.patientId,
                doctorId: data.doctorId,
                date: new Date(data.date),
                time: data.time,
                type: data.type || "consultation",
                notes: data.notes,
                status: "scheduled",
            },
            include: {
                patient: true,
                doctor: true,
            },
        });

        return NextResponse.json({ appointment }, { status: 201 });
    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json(
            { error: "Failed to create appointment" },
            { status: 500 }
        );
    }
}
