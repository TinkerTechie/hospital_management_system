import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/db";

export async function GET(request) {
    try {
        const cookieStore = cookies();
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
        const cookieStore = cookies();
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
