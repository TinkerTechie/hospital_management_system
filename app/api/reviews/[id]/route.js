import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// GET - Fetch a specific review
export async function GET(req, { params }) {
    try {
        const { id } = params;

        const review = await prisma.review.findUnique({
            where: { id },
            include: {
                reviewer: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
                doctor: {
                    select: {
                        id: true,
                        fullName: true,
                        specialization: true,
                    },
                },
                nurse: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
            },
        });

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        return NextResponse.json({ review });
    } catch (error) {
        console.error("Error fetching review:", error);
        return NextResponse.json(
            { error: "Failed to fetch review" },
            { status: 500 }
        );
    }
}

// DELETE - Delete a review (admin only or own review)
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

        // Get review
        const review = await prisma.review.findUnique({
            where: { id },
        });

        if (!review) {
            return NextResponse.json({ error: "Review not found" }, { status: 404 });
        }

        // Check permissions (admin or review owner)
        if (user.role !== "ADMIN" && review.reviewerId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Delete review
        await prisma.review.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting review:", error);
        return NextResponse.json(
            { error: "Failed to delete review" },
            { status: 500 }
        );
    }
}
