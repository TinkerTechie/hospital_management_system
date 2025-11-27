import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// GET - Fetch a specific patient update
export async function GET(req, { params }) {
    try {
        const { id } = params;

        // Get token from cookie
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const update = await prisma.patientUpdate.findUnique({
            where: { id },
            include: {
                patient: {
                    include: {
                        user: true,
                    },
                },
                updatedBy: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
        });

        if (!update) {
            return NextResponse.json({ error: "Update not found" }, { status: 404 });
        }

        // Check permissions (patient owner or staff)
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (
            update.patient.userId !== userId &&
            !["ADMIN", "DOCTOR", "NURSE"].includes(user.role)
        ) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json({ update });
    } catch (error) {
        console.error("Error fetching patient update:", error);
        return NextResponse.json(
            { error: "Failed to fetch patient update" },
            { status: 500 }
        );
    }
}

// DELETE - Delete a patient update (admin only)
export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        // Get token from cookie
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Get user
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Only admin can delete updates
        if (user.role !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Delete update
        await prisma.patientUpdate.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Patient update deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting patient update:", error);
        return NextResponse.json(
            { error: "Failed to delete patient update" },
            { status: 500 }
        );
    }
}
