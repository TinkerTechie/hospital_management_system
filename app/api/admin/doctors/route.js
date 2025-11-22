import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { prisma } from "../../../../lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request) {
    try {
        let userId = null;
        let user = null;

        // Try NextAuth session first
        const session = await getServerSession(authOptions);

        if (session && session.user) {
            userId = session.user.id;
            user = session.user;
        } else {
            // Fall back to JWT token
            const cookieStore = await cookies();
            const token = cookieStore.get("token")?.value;

            if (!token) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.id;

                const dbUser = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { id: true, name: true, email: true, role: true }
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
                            { name: { contains: search, mode: "insensitive" } },
                            { email: { contains: search, mode: "insensitive" } },
                            { specialization: { contains: search, mode: "insensitive" } },
                        ],
                    }
                    : {},
                specialization && specialization !== "all" ? { specialization } : {},
                status && status !== "all" ? { status } : {},
            ],
        };

        const [doctors, total] = await Promise.all([
            prisma.doctor.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    specialization: true,
                    experience: true,
                    consultationFee: true,
                    status: true,
                    licenseNumber: true,
                    createdAt: true,
                },
            }),
            prisma.doctor.count({ where }),
        ]);

        return NextResponse.json({
            doctors,
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
        let userId = null;
        let user = null;

        // Try NextAuth session first
        const session = await getServerSession(authOptions);

        if (session && session.user) {
            userId = session.user.id;
            user = session.user;
        } else {
            // Fall back to JWT token
            const cookieStore = await cookies();
            const token = cookieStore.get("token")?.value;

            if (!token) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.id;

                const dbUser = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { id: true, name: true, email: true, role: true }
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

        const userRole = user.role;
        if (userRole !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const data = await request.json();

        const doctor = await prisma.doctor.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                specialization: data.specialization,
                experience: parseInt(data.experience) || 0,
                licenseNumber: data.licenseNumber,
                consultationFee: parseFloat(data.consultationFee) || 0,
                qualifications: data.qualifications,
                status: "active",
            },
        });

        return NextResponse.json({ doctor }, { status: 201 });
    } catch (error) {
        console.error("Error creating doctor:", error);
        return NextResponse.json(
            { error: "Failed to create doctor" },
            { status: 500 }
        );
    }
}
