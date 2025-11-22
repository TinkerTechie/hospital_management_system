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
        const sortBy = searchParams.get("sortBy") || "createdAt";
        const sortOrder = searchParams.get("sortOrder") || "desc";
        const type = searchParams.get("type");

        const skip = (page - 1) * limit;

        const where = {
            AND: [
                search
                    ? {
                        OR: [
                            { title: { contains: search, mode: "insensitive" } },
                            { patient: { name: { contains: search, mode: "insensitive" } } },
                        ],
                    }
                    : {},
                type && type !== "all" ? { type } : {},
            ],
        };

        const [records, total] = await Promise.all([
            prisma.medicalRecord.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    patient: {
                        select: {
                            id: true,
                            name: true,
                            phone: true,
                        },
                    },
                    doctor: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            }),
            prisma.medicalRecord.count({ where }),
        ]);

        return NextResponse.json({
            records,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching records:", error);
        return NextResponse.json(
            { error: "Failed to fetch records" },
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

        const userRole = session.user.role;
        if (!["admin", "doctor", "nurse"].includes(userRole)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const data = await request.json();

        const record = await prisma.medicalRecord.create({
            data: {
                title: data.title,
                description: data.description,
                type: data.type,
                patientId: data.patientId,
                doctorId: data.doctorId,
                fileUrl: data.fileUrl,
                tags: data.tags,
            },
            include: {
                patient: true,
                doctor: true,
            },
        });

        return NextResponse.json({ record }, { status: 201 });
    } catch (error) {
        console.error("Error creating record:", error);
        return NextResponse.json(
            { error: "Failed to create record" },
            { status: 500 }
        );
    }
}
