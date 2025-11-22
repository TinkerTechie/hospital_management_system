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
        const category = searchParams.get("category");
        const stockStatus = searchParams.get("stockStatus");

        const skip = (page - 1) * limit;

        let where = {
            AND: [
                search
                    ? {
                        OR: [
                            { name: { contains: search, mode: "insensitive" } },
                            { category: { contains: search, mode: "insensitive" } },
                            { supplier: { contains: search, mode: "insensitive" } },
                        ],
                    }
                    : {},
                category && category !== "all" ? { category } : {},
            ],
        };

        // Handle stock status filter
        if (stockStatus && stockStatus !== "all") {
            if (stockStatus === "out-of-stock") {
                where.AND.push({ quantity: 0 });
            } else if (stockStatus === "low-stock") {
                where.AND.push({
                    AND: [
                        { quantity: { gt: 0 } },
                        { quantity: { lte: prisma.raw("reorder_level") } },
                    ],
                });
            } else if (stockStatus === "in-stock") {
                where.AND.push({ quantity: { gt: prisma.raw("reorder_level") } });
            }
        }

        const [items, total] = await Promise.all([
            prisma.inventoryItem.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
            }),
            prisma.inventoryItem.count({ where }),
        ]);

        return NextResponse.json({
            items,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching inventory:", error);
        return NextResponse.json(
            { error: "Failed to fetch inventory" },
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
        if (!["admin", "nurse"].includes(userRole)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const data = await request.json();

        const item = await prisma.inventoryItem.create({
            data: {
                name: data.name,
                description: data.description,
                category: data.category,
                quantity: parseInt(data.quantity) || 0,
                unit: data.unit,
                reorderLevel: parseInt(data.reorderLevel) || 0,
                supplier: data.supplier,
                costPrice: parseFloat(data.costPrice) || 0,
                sellingPrice: parseFloat(data.sellingPrice) || 0,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
            },
        });

        return NextResponse.json({ item }, { status: 201 });
    } catch (error) {
        console.error("Error creating inventory item:", error);
        return NextResponse.json(
            { error: "Failed to create inventory item" },
            { status: 500 }
        );
    }
}
