import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
    try {
        let userId = null;
        let user = null;

        // First, try to get session from NextAuth (Google OAuth)
        const session = await getServerSession(authOptions);

        if (session && session.user) {
            userId = session.user.id;
            user = session.user;
        } else {
            // If no NextAuth session, try JWT token from cookies
            const cookieStore = await cookies();
            const token = cookieStore.get("token")?.value;

            if (!token) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.id;

                // Fetch user from database
                const dbUser = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { id: true, name: true, email: true, role: true, image: true }
                });

                if (!dbUser) {
                    return NextResponse.json({ error: "User not found" }, { status: 404 });
                }

                user = dbUser;
            } catch (jwtError) {
                console.error("JWT verification failed:", jwtError);
                return NextResponse.json({ error: "Invalid token" }, { status: 401 });
            }
        }

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Find the doctor profile associated with the user
        const doctor = await prisma.doctor.findUnique({
            where: { userId: userId },
        });

        // If no doctor profile exists, return empty data structure
        if (!doctor) {
            return NextResponse.json({
                stats: {
                    totalPatients: 0,
                    appointmentsToday: 0,
                    pendingReports: 0,
                },
                appointments: [],
                recentPatients: [],
                user: user,
                doctorProfile: null,
            });
        }

        // Fetch appointments for this doctor
        const appointments = await prisma.appointment.findMany({
            where: { doctorId: doctor.id },
            include: { patient: true },
            orderBy: { appointmentDate: "asc" },
        });

        // Calculate stats
        const totalPatients = await prisma.patient.count({
            where: { doctorId: doctor.id },
        });

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const appointmentsToday = await prisma.appointment.count({
            where: {
                doctorId: doctor.id,
                appointmentDate: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });

        // Fetch recent patients (unique patients from recent appointments)
        const recentAppointments = await prisma.appointment.findMany({
            where: { doctorId: doctor.id },
            include: { patient: true },
            orderBy: { appointmentDate: "desc" },
            take: 5,
        });

        // Deduplicate patients
        const uniquePatientsMap = new Map();
        recentAppointments.forEach(appt => {
            if (appt.patient && !uniquePatientsMap.has(appt.patient.id)) {
                uniquePatientsMap.set(appt.patient.id, appt.patient);
            }
        });
        const recentPatients = Array.from(uniquePatientsMap.values());

        return NextResponse.json({
            stats: {
                totalPatients,
                appointmentsToday,
                pendingReports: 0, // Placeholder for now
            },
            appointments,
            recentPatients,
            user: user,
            doctorProfile: doctor,
        });
    } catch (error) {
        console.error("Error fetching doctor dashboard data:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
