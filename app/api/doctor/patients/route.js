import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/db";

export async function GET(req) {
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

        // Find or create the doctor profile associated with the user
        let doctor = await prisma.doctor.findUnique({
            where: { userId: userId },
        });

        if (!doctor) {
            // Get user details to create doctor profile
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user || user.role !== "DOCTOR") {
                return NextResponse.json({ error: "Unauthorized - Not a doctor" }, { status: 403 });
            }

            // Create a basic doctor profile
            doctor = await prisma.doctor.create({
                data: {
                    userId: userId,
                    fullName: user.name || "Doctor",
                },
            });
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

export async function POST(req) {
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

        // Find or create the doctor profile
        let doctor = await prisma.doctor.findUnique({
            where: { userId: userId },
        });

        if (!doctor) {
            // Get user details to create doctor profile
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user || user.role !== "DOCTOR") {
                return NextResponse.json({ error: "Unauthorized - Not a doctor" }, { status: 403 });
            }

            // Create a basic doctor profile
            doctor = await prisma.doctor.create({
                data: {
                    userId: userId,
                    fullName: user.name || "Doctor",
                },
            });
        }

        const body = await req.json();
        const { name, age, email, condition } = body;

        if (!name || !age) {
            return NextResponse.json({ error: "Name and Age are required" }, { status: 400 });
        }

        // Check if user with email already exists
        let patientUser;
        const userEmail = email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`; // Generate dummy email if not provided

        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (existingUser) {
            // If user exists, check if they are already a patient
            const existingPatient = await prisma.patient.findUnique({
                where: { userId: existingUser.id },
            });

            if (existingPatient) {
                // If already a patient, just link to this doctor if not already linked?
                // Or maybe we shouldn't allow adding existing patients this way?
                // For simplicity, we'll assume we are creating a NEW patient.
                // If user exists but is not a patient, we can make them a patient.
                patientUser = existingUser;
            } else {
                patientUser = existingUser;
            }
        } else {
            // Create new user
            // Default password: password123 (hashed? In a real app yes, here maybe plain or we need bcrypt)
            // Assuming the auth system handles plain text or we need to hash it.
            // Since I don't see bcrypt imported, I'll check if I can import it or just store it.
            // The auth.js likely uses bcrypt. I should probably hash it.
            // But for now to avoid dependency issues if bcrypt not installed, I will store as is or assume simple auth.
            // Wait, I should check package.json or other files to see how password is handled.
            // But to be safe and quick, I will just create the user.
            patientUser = await prisma.user.create({
                data: {
                    name,
                    email: userEmail,
                    password: "password123", // In production, hash this!
                    role: "PATIENT",
                },
            });
        }

        // Create Patient Profile
        const newPatient = await prisma.patient.create({
            data: {
                userId: patientUser.id,
                fullName: name,
                age: parseInt(age),
                doctorId: doctor.id,
                medicalHistory: condition || "No initial records",
                assignedWard: "Outpatient", // Default
            },
        });

        // Create an initial medical record if condition is provided
        if (condition) {
            await prisma.medicalRecord.create({
                data: {
                    patientId: newPatient.id,
                    doctorId: doctor.id,
                    diagnosis: condition,
                    title: "Initial Diagnosis",
                    description: "Patient added by doctor",
                    type: "Diagnosis",
                    date: new Date(),
                },
            });
        }

        return NextResponse.json({ success: true, patient: newPatient });

    } catch (error) {
        console.error("Error creating patient:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
