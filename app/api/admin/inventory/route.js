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

        if (!["ADMIN", "NURSE"].includes(userRole)) {
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
