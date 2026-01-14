import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Fetch reviews for a specific department
export async function GET(req, { params }) {
    try {
        const { name } = await params;
        const departmentName = decodeURIComponent(name);

        // Fetch department reviews
        const departmentReviews = await prisma.review.findMany({
            where: {
                targetType: "DEPARTMENT",
                department: {
                    equals: departmentName,
                    mode: "insensitive", // Case-insensitive search
                },
            },
            include: {
                reviewer: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });

        // If no department reviews, fall back to hospital reviews
        let reviews = departmentReviews;
        if (departmentReviews.length === 0) {
            reviews = await prisma.review.findMany({
                where: {
                    targetType: "HOSPITAL",
                },
                include: {
                    reviewer: {
                        select: {
                            id: true,
                            name: true,
                            role: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 10,
            });
        }

        // Calculate average rating
        const avgRating =
            reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0;

        return NextResponse.json({
            reviews,
            avgRating: avgRating.toFixed(1),
            total: reviews.length,
            department: departmentName,
            isDepartmentSpecific: departmentReviews.length > 0,
        });
    } catch (error) {
        console.error("Error fetching department reviews:", error);
        return NextResponse.json(
            { error: "Failed to fetch reviews" },
            { status: 500 }
        );
    }
}
