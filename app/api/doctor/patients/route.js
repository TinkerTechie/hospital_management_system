import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/db";

export async function GET(req) {
    try {
        const cookieStore = cookies();
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

        // Find the doctor profile associated with the user
        const doctor = await prisma.doctor.findUnique({
            where: { userId: userId },
        });

        if (!doctor) {
            return NextResponse.json({ error: "Doctor profile not found" }, { status: 404 });
        }

        // Fetch patients assigned to this doctor
        const patients = await prisma.patient.findMany({
            where: { doctorId: doctor.id },
            include: {
                medicalRecords: {
                    orderBy: { date: "desc" },
                    take: 1
                },
                appointments: {
                    orderBy: { appointmentDate: "desc" },
                    take: 1
                }
            },
            orderBy: { updatedAt: "desc" }
        });

        // Format data for the frontend
        const formattedPatients = patients.map(patient => ({
            id: patient.id,
            name: patient.fullName,
            age: patient.age || "N/A",
            gender: "N/A", // Gender not in Patient model yet, maybe add later or infer? Schema says gender is not there, only in Doctor. Wait, let me check schema again.
            // Schema check: Patient model has `age`, `bloodGroup`, `medicalHistory`, `assignedWard`. No gender.
            // I will return "N/A" or maybe add it to schema later if requested. For now "N/A".
            phone: "N/A", // Phone is in User model, not Patient model directly? 
            // Schema check: Patient has `userId`. User has `email`. Patient doesn't have phone. 
            // Wait, let's check if we can include User to get email/phone if available?
            // User model has `email`. No phone in User model either? 
            // Doctor has phone. Nurse has phone. ContactMessage has phone.
            // Patient model doesn't have phone.
            // I'll check if I can include User to get email at least.
            lastVisit: patient.appointments[0]?.appointmentDate ? new Date(patient.appointments[0].appointmentDate).toLocaleDateString() : "No visits",
            condition: patient.medicalRecords[0]?.diagnosis || "No records",
            email: "N/A"
        }));

        // To get email, I need to include user
        const patientsWithUser = await prisma.patient.findMany({
            where: { doctorId: doctor.id },
            include: {
                user: {
                    select: { email: true, image: true }
                },
                medicalRecords: {
                    orderBy: { date: "desc" },
                    take: 1
                },
                appointments: {
                    orderBy: { appointmentDate: "desc" },
                    take: 1
                }
            },
            orderBy: { updatedAt: "desc" }
        });

        const finalPatients = patientsWithUser.map(patient => ({
            id: patient.id,
            name: patient.fullName,
            age: patient.age || "N/A",
            gender: "N/A",
            phone: "N/A",
            email: patient.user?.email || "N/A",
            image: patient.user?.image,
            lastVisit: patient.appointments[0]?.appointmentDate ? new Date(patient.appointments[0].appointmentDate).toLocaleDateString() : "No visits",
            condition: patient.medicalRecords[0]?.diagnosis || "No records",
        }));

        return NextResponse.json({ patients: finalPatients });

    } catch (error) {
        console.error("Error fetching doctor's patients:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
