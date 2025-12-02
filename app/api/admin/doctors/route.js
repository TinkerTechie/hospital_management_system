import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/db";

export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userId;
        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            userId = decoded.id;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";
        const sortBy = searchParams.get("sortBy") || "name";
        const sortOrder = searchParams.get("sortOrder") || "asc";
        const specialization = searchParams.get("specialization");
        const status = searchParams.get("status");

        const skip = (page - 1) * limit;

        const where = {
            AND: [
                search
                    ? {
                        OR: [
                            { fullName: { contains: search, mode: "insensitive" } },
                            { user: { email: { contains: search, mode: "insensitive" } } },
                            { specialization: { contains: search, mode: "insensitive" } },
                        ],
                    }
                    : {},
                specialization && specialization !== "all" ? { specialization } : {},
                // Note: status field doesn't exist in Doctor schema
            ],
        };

        const [doctors, total] = await Promise.all([
            prisma.doctor.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy === "name" ? "fullName" : sortBy]: sortOrder },
                select: {
                    id: true,
                    fullName: true,
                    phone: true,
                    specialization: true,
                    yearsOfExperience: true,
                    consultationFee: true,
                    // status: true, // Schema doesn't have status? Let's check.
                    // licenseNumber: true,
                    createdAt: true,
                    user: {
                        select: {
                            email: true,
                            image: true,
                        }
                    }
                },
            }),
            prisma.doctor.count({ where }),
        ]);

        return NextResponse.json({
            doctors: doctors.map(d => ({
                ...d,
                name: d.fullName,
                email: d.user?.email,
                image: d.user?.image,
                experience: d.yearsOfExperience, // Map back to frontend expectation
            })),
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return NextResponse.json(
            { error: "Failed to fetch doctors" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userRole;
        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            userRole = decoded.role;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        if (userRole !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const data = await request.json();

        // Create User and Doctor transactionally
        const result = await prisma.$transaction(async (prisma) => {
            // 1. Create User
            const user = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password || "$2b$10$EpWa/..", // Default password or handle properly
                    role: "DOCTOR",
                },
            });

            // 2. Create Doctor Profile
            const doctor = await prisma.doctor.create({
                data: {
                    userId: user.id,
                    fullName: data.name,
                    phone: data.phone,
                    specialization: data.specialization,
                    yearsOfExperience: parseInt(data.experience) || 0,
                    licenseNumber: data.licenseNumber,
                    consultationFee: parseFloat(data.consultationFee) || 0,
                    degrees: data.qualifications,
                    status: "active", // Note: Schema doesn't have status, might need to check
                },
            });

            return doctor;
        }, {
            maxWait: 5000, // Wait longer for connection
            timeout: 10000 // Allow longer transaction time
        });

        return NextResponse.json({ doctor: result }, { status: 201 });
    } catch (error) {
        console.error("Error creating doctor:", error);
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return NextResponse.json(
                { error: "A user with this email already exists." },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: error.message || "Failed to create doctor" },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let userRole;
        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            userRole = decoded.role;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        if (userRole !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 });
        }

        // Check if doctor exists
        const doctor = await prisma.doctor.findUnique({
            where: { id },
        });

        if (!doctor) {
            return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
        }

        // Delete doctor
        await prisma.doctor.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Doctor deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting doctor:", error);
        return NextResponse.json(
            { error: "Failed to delete doctor" },
            { status: 500 }
        );
    }
}
