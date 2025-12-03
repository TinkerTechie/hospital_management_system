import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../../lib/db";

export async function POST(request, { params }) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userId, userRole;
        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            userId = decoded.id;
            userRole = decoded.role;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        if (!["ADMIN", "DOCTOR", "NURSE"].includes(userRole)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { id } = await params;
        const data = await request.json();

        // Validate patient exists
        const patient = await prisma.patient.findUnique({
            where: { id },
        });

        if (!patient) {
            return NextResponse.json({ error: "Patient not found" }, { status: 404 });
        }

        // Create vitals record
        const vitals = await prisma.vitals.create({
            data: {
                patientId: id,
                heartRate: data.heartRate ? parseInt(data.heartRate) : null,
                bpSystolic: data.bpSystolic ? parseInt(data.bpSystolic) : null,
                bpDiastolic: data.bpDiastolic ? parseInt(data.bpDiastolic) : null,
                temperature: data.temperature ? parseFloat(data.temperature) : null,
                oxygenSaturation: data.oxygenSaturation ? parseInt(data.oxygenSaturation) : null,
                respiratoryRate: data.respiratoryRate ? parseInt(data.respiratoryRate) : null,
                recordedBy: userId,
                notes: data.notes || null,
            },
        });

        // Create notification for the patient
        try {
            await prisma.notification.create({
                data: {
                    userId: patient.userId,
                    title: "Vital Signs Updated",
                    message: `Your vital signs have been recorded: HR ${data.heartRate || 'N/A'} BPM, BP ${data.bpSystolic || 'N/A'}/${data.bpDiastolic || 'N/A'} mmHg, Temp ${data.temperature || 'N/A'}°F, O2 ${data.oxygenSaturation || 'N/A'}%`,
                    type: "INFO",
                    link: "/dashboard/patient/records",
                },
            });
        } catch (notifError) {
            console.error("Error creating notification:", notifError);
            // Don't fail the whole request if notification fails
        }

        return NextResponse.json({ vitals }, { status: 201 });
    } catch (error) {
        console.error("Error creating vitals:", error);
        return NextResponse.json(
            { error: "Failed to create vitals" },
            { status: 500 }
        );
    }
}

// GET vitals history for a patient
export async function GET(request, { params }) {
    try {
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

        const { id } = await params;

        const vitals = await prisma.vitals.findMany({
            where: { patientId: id },
            orderBy: { createdAt: "desc" },
            take: 20, // Last 20 records
        });

        return NextResponse.json({ vitals });
    } catch (error) {
        console.error("Error fetching vitals:", error);
        return NextResponse.json(
            { error: "Failed to fetch vitals" },
            { status: 500 }
        );
    }
}
