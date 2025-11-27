import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET() {
    try {
        // Fetch all nurses with their reviews and user information
        const nurses = await prisma.nurse.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                reviews: {
                    select: {
                        rating: true,
                    },
                },
                _count: {
                    select: {
                        reviews: true,
                    },
                },
            },
            orderBy: {
                fullName: "asc",
            },
        });

        // Calculate average ratings and format data
        const nursesWithRatings = nurses.map((nurse) => {
            const totalRatings = nurse.reviews.length;
            const averageRating =
                totalRatings > 0
                    ? nurse.reviews.reduce((sum, review) => sum + review.rating, 0) /
                    totalRatings
                    : 0;

            return {
                id: nurse.id,
                fullName: nurse.fullName,
                assignedWard: nurse.assignedWard || "General Ward",
                shiftTiming: nurse.shiftTiming || "Day Shift",
                phone: nurse.phone || "",
                profilePicUrl: nurse.user?.image || "/default-nurse.png",
                email: nurse.user?.email || "",
                averageRating: parseFloat(averageRating.toFixed(1)),
                totalReviews: totalRatings,
            };
        });

        // Sort by average rating (descending), then by name
        const sortedNurses = nursesWithRatings.sort((a, b) => {
            if (b.averageRating !== a.averageRating) {
                return b.averageRating - a.averageRating;
            }
            return a.fullName.localeCompare(b.fullName);
        });

        // Group nurses by ward
        const nursesByWard = sortedNurses.reduce((acc, nurse) => {
            const ward = nurse.assignedWard;
            if (!acc[ward]) {
                acc[ward] = [];
            }
            acc[ward].push(nurse);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            nurses: sortedNurses,
            nursesByWard,
            totalNurses: sortedNurses.length,
        });
    } catch (error) {
        console.error("Error fetching best nurses:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch nurses",
                message: error.message
            },
            { status: 500 }
        );
    }
}
