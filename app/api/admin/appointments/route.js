import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/db";

export async function GET(request) {
    try {
        // Validate JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            jwt.verify(token.value, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";
        const sortBy = searchParams.get("sortBy") || "appointmentDate"; // Use appointmentDate instead of date
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
                            { patient: { fullName: { contains: search, mode: "insensitive" } } },
                            { doctor: { fullName: { contains: search, mode: "insensitive" } } },
                        ],
                    }
                    : {},
                // Note: status and type fields don't exist in Appointment schema
            ],
        };

        // Fetch appointments with pagination
        const [appointments, total] = await Promise.all([
            prisma.appointment.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy === "date" ? "appointmentDate" : sortBy]: sortOrder }, // Map date to appointmentDate
                include: {
                    patient: {
                        select: {
                            id: true,
                            fullName: true,
                            // phone: true, // Patient has phone? Let's check schema. No, User has phone? Or Patient?
                            // Schema: Patient has no phone. User has no phone?
                            // User model: name, email, image.
                            // Doctor model: phone.
                            // Nurse model: phone.
                            // Patient model: no phone.
                            // Wait, let's check schema again.
                            // Patient model: fullName, age, bloodGroup, medicalHistory, assignedWard.
                            // User model: email.
                            // So Patient has NO phone.
                            // We should remove phone from selection or select from User if added?
                            // User schema: email, image. No phone.
                            // So we can't fetch phone for patient.
                            user: {
                                select: {
                                    email: true,
                                }
                            }
                        },
                    },
                    doctor: {
                        select: {
                            id: true,
                            fullName: true,
                            specialization: true,
                        },
                    },
                },
            }),
            prisma.appointment.count({ where }),
        ]);

        return NextResponse.json({
            appointments: appointments.map(a => ({
                ...a,
                patient: {
                    ...a.patient,
                    name: a.patient?.fullName,
                    email: a.patient?.user?.email,
                },
                doctor: {
                    ...a.doctor,
                    name: a.doctor?.fullName,
                }
            })),
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
            { error: error.message || "Failed to fetch appointments" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        // Validate JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const cookieStore = await cookies();
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

        if (!["ADMIN", "DOCTOR", "NURSE"].includes(userRole)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const data = await request.json();

        const appointment = await prisma.appointment.create({
            data: {
                patientId: data.patientId,
                doctorId: data.doctorId,
                appointmentDate: new Date(data.date), // Use appointmentDate as per schema
                time: data.time,
                reason: data.notes, // Map notes to reason
                // type: data.type || "consultation", // Schema doesn't have type field
                // notes: data.notes, // Schema doesn't have notes field
                // status: "scheduled", // Schema doesn't have status field
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

export async function DELETE(request) {
    try {
        // Validate JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const cookieStore = await cookies();
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
            return NextResponse.json({ error: "Appointment ID is required" }, { status: 400 });
        }

        // Check if appointment exists
        const appointment = await prisma.appointment.findUnique({
            where: { id },
        });

        if (!appointment) {
            return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
        }

        // Delete appointment
        await prisma.appointment.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Appointment deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return NextResponse.json(
            { error: "Failed to delete appointment" },
            { status: 500 }
        );
    }
}
