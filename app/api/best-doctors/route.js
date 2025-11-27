import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function GET() {
    try {
        // Fetch all doctors with their reviews and user information
        const doctors = await prisma.doctor.findMany({
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
                        appointments: true,
                    },
                },
            },
            orderBy: {
                yearsOfExperience: "desc",
            },
        });

        // Calculate average ratings and format data
        const doctorsWithRatings = doctors.map((doctor) => {
            const totalRatings = doctor.reviews.length;
            const averageRating =
                totalRatings > 0
                    ? doctor.reviews.reduce((sum, review) => sum + review.rating, 0) /
                    totalRatings
                    : 0;

            return {
                id: doctor.id,
                fullName: doctor.fullName,
                specialization: doctor.specialization || "General Medicine",
                department: doctor.specialization || "General Medicine",
                yearsOfExperience: doctor.yearsOfExperience || 0,
                consultationFee: doctor.consultationFee || 0,
                bio: doctor.bio || "",
                profilePicUrl: doctor.profilePicUrl || doctor.user?.image || "/default-doctor.png",
                email: doctor.user?.email || "",
                averageRating: parseFloat(averageRating.toFixed(1)),
                totalReviews: totalRatings,
                totalAppointments: doctor._count.appointments,
                languages: doctor.languages || "English",
                enableTeleconsultation: doctor.enableTeleconsultation || false,
            };
        });

        // Sort by average rating (descending), then by experience
        const sortedDoctors = doctorsWithRatings.sort((a, b) => {
            if (b.averageRating !== a.averageRating) {
                return b.averageRating - a.averageRating;
            }
            return b.yearsOfExperience - a.yearsOfExperience;
        });

        // Group doctors by department
        const doctorsByDepartment = sortedDoctors.reduce((acc, doctor) => {
            const dept = doctor.department;
            if (!acc[dept]) {
                acc[dept] = [];
            }
            acc[dept].push(doctor);
            return acc;
        }, {});

        return NextResponse.json({
            success: true,
            doctors: sortedDoctors,
            doctorsByDepartment,
            totalDoctors: sortedDoctors.length,
        });
    } catch (error) {
        console.error("Error fetching best doctors:", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch doctors",
                message: error.message
            },
            { status: 500 }
        );
    }
}
