import { NextResponse } from "next/server";
import { verifyAuthToken } from "../../../lib/apiHelpers";
import { prisma } from "../../../lib/db";

export async function GET(request) {
    // Verify authentication
    const auth = await verifyAuthToken();
    if (!auth.success) return auth.response;

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "5");

    if (!query || query.length < 2) {
        return NextResponse.json({ results: { patients: [], doctors: [], nurses: [], appointments: [] } });
    }

    try {
        const userRole = auth.decoded.role;
        const userId = auth.decoded.id;
        const results = {
            patients: [],
            doctors: [],
            nurses: [],
            appointments: [],
        };

        // Search based on user role
        if (["ADMIN", "DOCTOR", "NURSE"].includes(userRole)) {
            // Search patients
            try {
                results.patients = await prisma.patient.findMany({
                    where: {
                        fullName: { contains: query, mode: "insensitive" },
                    },
                    take: limit,
                    select: {
                        id: true,
                        fullName: true,
                        age: true,
                        bloodGroup: true,
                        assignedWard: true,
                    },
                });
            } catch (error) {
                console.error("Error searching patients:", error);
            }

            // Search doctors
            try {
                results.doctors = await prisma.doctor.findMany({
                    where: {
                        OR: [
                            { fullName: { contains: query, mode: "insensitive" } },
                            { specialization: { contains: query, mode: "insensitive" } },
                            { department: { contains: query, mode: "insensitive" } },
                        ],
                    },
                    take: limit,
                    select: {
                        id: true,
                        fullName: true,
                        specialization: true,
                        department: true,
                    },
                });
            } catch (error) {
                console.error("Error searching doctors:", error);
            }

            // Search nurses (admin only)
            if (userRole === "ADMIN") {
                try {
                    results.nurses = await prisma.nurse.findMany({
                        where: {
                            OR: [
                                { fullName: { contains: query, mode: "insensitive" } },
                                { assignedWard: { contains: query, mode: "insensitive" } },
                            ],
                        },
                        take: limit,
                        select: {
                            id: true,
                            fullName: true,
                            assignedWard: true,
                        },
                    });
                } catch (error) {
                    console.error("Error searching nurses:", error);
                }
            }
        }

        // Search appointments
        try {
            let appointmentWhere = {};

            if (userRole === "PATIENT") {
                // Patients see only their appointments
                const patient = await prisma.patient.findUnique({
                    where: { userId: userId },
                    select: { id: true },
                });
                if (patient) {
                    appointmentWhere = { patientId: patient.id };
                }
            } else if (userRole === "DOCTOR") {
                // Doctors see their appointments
                const doctor = await prisma.doctor.findUnique({
                    where: { userId: userId },
                    select: { id: true },
                });
                if (doctor) {
                    appointmentWhere = { doctorId: doctor.id };
                }
            }
            // Admin sees all appointments (no filter)

            results.appointments = await prisma.appointment.findMany({
                where: {
                    ...appointmentWhere,
                    OR: [
                        { patient: { fullName: { contains: query, mode: "insensitive" } } },
                        { doctor: { fullName: { contains: query, mode: "insensitive" } } },
                        { reason: { contains: query, mode: "insensitive" } },
                    ],
                },
                take: limit,
                include: {
                    patient: { select: { fullName: true } },
                    doctor: { select: { fullName: true } },
                },
                orderBy: { appointmentDate: "desc" },
            });
        } catch (error) {
            console.error("Error searching appointments:", error);
        }

        return NextResponse.json({ results });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json(
            { error: "Search failed", details: error.message },
            { status: 500 }
        );
    }
}
