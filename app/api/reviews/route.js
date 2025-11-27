import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// GET - Fetch reviews with filtering
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const targetType = searchParams.get("targetType");
        const targetId = searchParams.get("targetId");
        const limit = parseInt(searchParams.get("limit") || "10");
        const offset = parseInt(searchParams.get("offset") || "0");

        const where = {};
        if (targetType) where.targetType = targetType;
        if (targetId) where.targetId = targetId;

        const reviews = await prisma.review.findMany({
            where,
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
            orderBy: {
                createdAt: "desc",
            },
            take: limit,
            skip: offset,
        });

        // Calculate average rating
        const avgRating =
            reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0;

        const total = await prisma.review.count({ where });

        return NextResponse.json({
            reviews,
            avgRating: avgRating.toFixed(1),
            total,
            limit,
            offset,
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}

// POST - Submit a new review
export async function POST(req) {
    try {
        // Get token from cookie
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Get user to check role
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const body = await req.json();
        const { rating, comment, targetType, targetId, department } = body;

        // Validate rating
        if (!rating || rating < 1 || rating > 5) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        // Validate target type
        if (!["DOCTOR", "NURSE", "DEPARTMENT", "HOSPITAL"].includes(targetType)) {
            return NextResponse.json(
                { error: "Invalid target type" },
                { status: 400 }
            );
        }

        // Build review data
        const reviewData = {
            reviewerId: userId,
            reviewerRole: user.role,
            rating,
            comment: comment || null,
            targetType,
            targetId: targetId || null,
            department: department || null,
        };

        // Add specific relations
        if (targetType === "DOCTOR" && targetId) {
            reviewData.doctorId = targetId;
        } else if (targetType === "NURSE" && targetId) {
            reviewData.nurseId = targetId;
        }

        // Create review
        const review = await prisma.review.create({
            data: reviewData,
            include: {
                reviewer: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
        });

        // Create notification for the reviewed entity (if doctor or nurse)
        if (targetType === "DOCTOR" && targetId) {
            const doctor = await prisma.doctor.findUnique({
                where: { id: targetId },
                select: { userId: true, fullName: true },
            });

            if (doctor) {
                await prisma.notification.create({
                    data: {
                        userId: doctor.userId,
                        title: "New Review Received",
                        message: `You received a ${rating}-star review from ${user.name || "a patient"}`,
                        type: "INFO",
                        link: `/dashboard/doctor/reviews`,
                    },
                });
            }
        } else if (targetType === "NURSE" && targetId) {
            const nurse = await prisma.nurse.findUnique({
                where: { id: targetId },
                select: { userId: true, fullName: true },
            });

            if (nurse) {
                await prisma.notification.create({
                    data: {
                        userId: nurse.userId,
                        title: "New Review Received",
                        message: `You received a ${rating}-star review from ${user.name || "a patient"}`,
                        type: "INFO",
                        link: `/dashboard/nurse/reviews`,
                    },
                });
            }
        }

        return NextResponse.json({
            success: true,
            review,
            message: "Review submitted successfully",
        });
    } catch (error) {
        console.error("Error creating review:", error);
        console.error("Error stack:", error.stack);
        console.error("Error message:", error.message);
        return NextResponse.json(
            { error: "Failed to create review", details: error.message },
            { status: 500 }
        );
    }
}
