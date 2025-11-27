import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PUT(req) {
    try {
        // Get token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        if (!userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const data = await req.json();
        const { fullName, email, phone, assignedWard, shiftTiming } = data;

        // Get user to check role
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Update User table
        await prisma.user.update({
            where: { id: userId },
            data: {
                name: fullName,
                email: email
            }
        });

        // Update role-specific profile (use upsert to create if doesn't exist)
        if (user.role === "NURSE") {
            await prisma.nurse.upsert({
                where: { userId: userId },
                update: {
                    fullName,
                    phone,
                    assignedWard,
                    shiftTiming
                },
                create: {
                    userId: userId,
                    fullName,
                    phone,
                    assignedWard,
                    shiftTiming
                }
            });
        } else if (user.role === "DOCTOR") {
            await prisma.doctor.upsert({
                where: { userId: userId },
                update: {
                    fullName,
                    phone
                },
                create: {
                    userId: userId,
                    fullName,
                    phone
                }
            });
        } else if (user.role === "PATIENT") {
            await prisma.patient.upsert({
                where: { userId: userId },
                update: {
                    fullName
                },
                create: {
                    userId: userId,
                    fullName
                }
            });
        }

        // Update localStorage
        const updatedUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, role: true, image: true }
        });

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
