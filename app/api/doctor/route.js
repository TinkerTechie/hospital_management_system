import { NextResponse } from "next/server";

import { prisma } from "../../../lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
    try {
        let userId = null;
        let user = null;

        // Get JWT token from cookies
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

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Find or create the doctor profile associated with the user
        let doctor = await prisma.doctor.findUnique({
            where: { userId: userId },
        });

        // If no doctor profile exists, create one
        if (!doctor) {
            if (user.role !== "DOCTOR") {
                return NextResponse.json({ error: "Unauthorized - Not a doctor" }, { status: 403 });
            }

            doctor = await prisma.doctor.create({
                data: {
                    userId: userId,
                    fullName: user.name || "Doctor",
                },
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

export async function PUT(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.id;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const body = await req.json();
        const {
            name,
            email,
            phone,
            address,
            specialization,
            yearsOfExperience,
            bio,
            consultationFee,
            startTime,
            endTime
        } = body;

        // Get current user to check if email is changing
        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
        });

        // Only update email if it's different from current email
        const updateData = { name };
        if (email && email !== currentUser.email) {
            // Check if new email already exists
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });
            if (existingUser && existingUser.id !== userId) {
                return NextResponse.json(
                    { error: "Email already in use" },
                    { status: 400 }
                );
            }
            updateData.email = email;
        }

        // Update User (name, and email if changed)
        await prisma.user.update({
            where: { id: userId },
            data: updateData,
        });

        // Update Doctor Profile
        // We use upsert to create if it doesn't exist (though it should usually exist for a doctor user)
        const updatedDoctor = await prisma.doctor.upsert({
            where: { userId: userId },
            update: {
                fullName: name, // Keep synced with user name
                phone,
                address,
                specialization,
                yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : undefined,
                bio,
                consultationFee: consultationFee ? parseFloat(consultationFee) : undefined,
                startTime,
                endTime,
            },
            create: {
                userId: userId,
                fullName: name,
                phone,
                address,
                specialization,
                yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : undefined,
                bio,
                consultationFee: consultationFee ? parseFloat(consultationFee) : undefined,
                startTime,
                endTime,
            },
        });

        return NextResponse.json({ success: true, doctor: updatedDoctor });

    } catch (error) {
        console.error("Error updating doctor profile:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
