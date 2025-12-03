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

        // Validate JWT_SECRET exists
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
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

        // Find the nurse profile associated with the user
        const nurse = await prisma.nurse.findUnique({
            where: { userId: userId },
        });

        // If no nurse profile exists, return empty data structure
        if (!nurse) {
            return NextResponse.json({
                stats: {
                    patientsToday: 0,
                    pendingTriage: 0,
                    activeCases: 0,
                },
                triageQueue: [],
                assignedPatients: [],
                user: user,
                nurseProfile: null,
                alerts: [],
            });
        }

        // Filter patients by Nurse's Assigned Ward
        // If nurse has no ward assigned, show no patients (or all? let's show none for safety/clarity)
        const wardFilter = nurse.assignedWard ? { assignedWard: nurse.assignedWard } : { assignedWard: "Unassigned" };

        const recentPatients = await prisma.patient.findMany({
            where: wardFilter,
            take: 10,
            orderBy: { updatedAt: "desc" },
            include: {
                medicalRecords: {
                    take: 1,
                    orderBy: { date: "desc" }
                }
            }
        });

        // Fetch Real Notifications
        const alerts = await prisma.notification.findMany({
            where: { userId: userId, read: false },
            orderBy: { createdAt: "desc" },
            take: 5
        });

        // Simulate Triage Queue from recent patients (in real app, this would be a status field)
        const triageQueue = recentPatients.map(p => ({
            id: p.id,
            name: p.fullName,
            condition: p.medicalRecords[0]?.diagnosis || "General Checkup",
            priority: Math.random() > 0.5 ? "high" : "medium", // Still simulated priority as it's not in DB yet
            waiting: `${Math.floor(Math.random() * 30)} min`
        }));

        // Simulate Assigned Patients
        const assignedPatients = recentPatients.slice(0, 5).map(p => ({
            id: p.id,
            name: p.fullName,
            age: p.age || "N/A",
            issue: p.medicalRecords[0]?.diagnosis || "Observation",
        }));

        return NextResponse.json({
            stats: {
                patientsToday: recentPatients.length,
                pendingTriage: triageQueue.length,
                activeCases: assignedPatients.length,
            },
            triageQueue,
            assignedPatients,
            user: user,
            nurseProfile: nurse,
            alerts: alerts.map(a => ({
                id: a.id,
                msg: a.message,
                time: new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }))
        });
    } catch (error) {
        console.error("Error fetching nurse dashboard data:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
