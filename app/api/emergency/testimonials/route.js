import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Fetch emergency department reviews
        const emergencyReviews = await prisma.review.findMany({
            where: {
                targetType: "DEPARTMENT",
                department: {
                    equals: "Emergency",
                    mode: "insensitive",
                },
            },
            include: {
                reviewer: {
                    select: {
                        name: true,
                        role: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
        });

        // If no emergency reviews, fall back to hospital reviews
        if (emergencyReviews.length === 0) {
            const hospitalReviews = await prisma.review.findMany({
                where: {
                    targetType: "HOSPITAL",
                },
                include: {
                    reviewer: {
                        select: {
                            name: true,
                            role: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                take: 5,
            });

            // Format for emergency page
            return NextResponse.json(
                hospitalReviews.map((review) => ({
                    name: review.reviewer?.name || "Anonymous",
                    role: review.reviewer?.role || "Patient",
                    quote: review.comment || "Great experience at Medicare Hospital!",
                    rating: review.rating,
                }))
            );
        }

        // Format emergency reviews
        return NextResponse.json(
            emergencyReviews.map((review) => ({
                name: review.reviewer?.name || "Anonymous",
                role: review.reviewer?.role || "Patient",
                quote: review.comment || "Excellent emergency care!",
                rating: review.rating,
            }))
        );
    } catch (error) {
        console.error("Error fetching emergency testimonials:", error);
        // Return empty array on error
        return NextResponse.json([]);
    }
}
