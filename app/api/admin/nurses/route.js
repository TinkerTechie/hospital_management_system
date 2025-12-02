import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/db";
import { hash } from "bcryptjs";

// GET: Fetch all nurses with pagination, search, and filtering
export async function GET(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            jwt.verify(token.value, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";
        const sortBy = searchParams.get("sortBy") || "fullName";
        const sortOrder = searchParams.get("sortOrder") || "asc";
        const shiftTiming = searchParams.get("shiftTiming");
        const assignedWard = searchParams.get("assignedWard");

        const skip = (page - 1) * limit;

        const where = {
            AND: [
                search
                    ? {
                        OR: [
                            { fullName: { contains: search, mode: "insensitive" } },
                            { user: { email: { contains: search, mode: "insensitive" } } },
                            { phone: { contains: search, mode: "insensitive" } },
                        ],
                    }
                    : {},
                shiftTiming && shiftTiming !== "all" ? { shiftTiming } : {},
                assignedWard && assignedWard !== "all" ? { assignedWard } : {},
            ],
        };

        const [nurses, total] = await Promise.all([
            prisma.nurse.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    user: {
                        select: {
                            email: true,
                            image: true,
                        },
                    },
                },
            }),
            prisma.nurse.count({ where }),
        ]);

        return NextResponse.json({
            nurses: nurses.map(n => ({
                ...n,
                email: n.user?.email,
                image: n.user?.image,
            })),
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching nurses:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch nurses" },
            { status: 500 }
        );
    }
}

// POST: Create a new Nurse (and User)
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

        // Validate required fields
        if (!data.name || !data.email || !data.password) {
            return NextResponse.json(
                { error: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        const hashedPassword = await hash(data.password, 10);

        // Transaction: Create User -> Create Nurse
        const result = await prisma.$transaction(async (prisma) => {
            // 1. Create User
            const user = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    role: "NURSE",
                    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
                },
            });

            // 2. Create Nurse Profile
            const nurse = await prisma.nurse.create({
                data: {
                    userId: user.id,
                    fullName: data.name,
                    phone: data.phone,
                    shiftTiming: data.shiftTiming,
                    assignedWard: data.assignedWard,
                },
            });

            return nurse;
        }, {
            maxWait: 5000,
            timeout: 10000
        });

        return NextResponse.json({ nurse: result }, { status: 201 });

    } catch (error) {
        console.error("Error creating nurse:", error);
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return NextResponse.json(
                { error: "A user with this email already exists." },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: error.message || "Failed to create nurse" },
            { status: 500 }
        );
    }
}

// PUT: Update nurse details
export async function PUT(req) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, shiftTiming, assignedWard, phone, fullName } = await req.json();

        if (!id) {
            return NextResponse.json(
                { error: "Nurse ID is required" },
                { status: 400 }
            );
        }

        const updatedNurse = await prisma.nurse.update({
            where: { id },
            data: {
                shiftTiming,
                assignedWard,
                phone,
                fullName
            },
        });

        return NextResponse.json(updatedNurse);
    } catch (error) {
        console.error("Error updating nurse:", error);
        return NextResponse.json(
            { error: "Failed to update nurse" },
            { status: 500 }
        );
    }
}

// DELETE: Delete a nurse
export async function DELETE(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Nurse ID is required" }, { status: 400 });
        }

        // Get the nurse to find the userId
        const nurse = await prisma.nurse.findUnique({
            where: { id },
            select: { userId: true }
        });

        if (!nurse) {
            return NextResponse.json({ error: "Nurse not found" }, { status: 404 });
        }

        // Transaction: Delete Nurse -> Delete User
        await prisma.$transaction(async (prisma) => {
            await prisma.nurse.delete({ where: { id } });
            await prisma.user.delete({ where: { id: nurse.userId } });
        });

        return NextResponse.json({ message: "Nurse deleted successfully" });
    } catch (error) {
        console.error("Error deleting nurse:", error);
        return NextResponse.json(
            { error: error.message || "Failed to delete nurse" },
            { status: 500 }
        );
    }
}
