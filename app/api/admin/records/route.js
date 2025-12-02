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

        if (!["ADMIN", "DOCTOR", "NURSE"].includes(userRole)) {
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
