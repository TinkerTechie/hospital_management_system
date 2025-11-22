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
            });
        }

        // Since Nurse model doesn't have direct patient relation yet,
        // we will fetch recent patients to simulate a "Ward View" or "Triage Queue"
        // In a real app, this would filter by the Nurse's assigned ward.

        const recentPatients = await prisma.patient.findMany({
            take: 5,
            orderBy: { updatedAt: "desc" },
            include: {
                medicalRecords: {
                    take: 1,
                    orderBy: { date: "desc" }
                }
            }
        });

        // Simulate Triage Queue from recent patients
        const triageQueue = recentPatients.map(p => ({
            id: p.id,
            name: p.fullName,
            condition: p.medicalRecords[0]?.diagnosis || "General Checkup",
            priority: Math.random() > 0.5 ? "high" : "medium", // Simulated priority
            waiting: `${Math.floor(Math.random() * 30)} min`
        }));

        // Simulate Assigned Patients (just taking the first 2 for demo)
        const assignedPatients = recentPatients.slice(0, 2).map(p => ({
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
        });
    } catch (error) {
        console.error("Error fetching nurse dashboard data:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
