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

        const session = await getServerSession(authOptions);

        if (session && session.user) {
            userId = session.user.id;
            user = session.user;
        } else {
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
        const status = searchParams.get("status");
        const bloodGroup = searchParams.get("bloodGroup");

        const skip = (page - 1) * limit;

        // Build where clause
        const where = {
            AND: [
                search
                    ? {
                        OR: [
                            { name: { contains: search, mode: "insensitive" } },
                            { email: { contains: search, mode: "insensitive" } },
                            { phone: { contains: search, mode: "insensitive" } },
                        ],
                    }
                    : {},
                status && status !== "all" ? { status } : {},
                bloodGroup && bloodGroup !== "all" ? { bloodGroup } : {},
            ],
        };

        // Fetch patients with pagination
        const [patients, total] = await Promise.all([
            prisma.patient.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    bloodGroup: true,
                    status: true,
                    dateOfBirth: true,
                    gender: true,
                    address: true,
                    createdAt: true,
                },
            }),
            prisma.patient.count({ where }),
        ]);

        return NextResponse.json({
            patients,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching patients:", error);
        return NextResponse.json(
            { error: "Failed to fetch patients" },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user has permission (admin, doctor, or nurse)
        const userRole = session.user.role;
        if (!["admin", "doctor", "nurse"].includes(userRole)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const data = await request.json();

        // Create patient
        const patient = await prisma.patient.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
                gender: data.gender,
                bloodGroup: data.bloodGroup,
                address: data.address,
                emergencyContact: data.emergencyContact,
                allergies: data.allergies,
                medicalConditions: data.medicalConditions,
                insuranceProvider: data.insuranceProvider,
                insurancePolicyNumber: data.insurancePolicyNumber,
                status: "active",
            },
        });

        return NextResponse.json({ patient }, { status: 201 });
    } catch (error) {
        console.error("Error creating patient:", error);
        return NextResponse.json(
            { error: "Failed to create patient" },
            { status: 500 }
        );
    }
}
