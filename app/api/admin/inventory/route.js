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

        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            if (decoded.role !== "ADMIN") {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category") || "";
        const stockStatus = searchParams.get("stockStatus") || "";
        const sortBy = searchParams.get("sortBy") || "name";
        const sortOrder = searchParams.get("sortOrder") || "asc";

        const skip = (page - 1) * limit;

        const where = {
            AND: [
                search ? {
                    OR: [
                        { name: { contains: search, mode: "insensitive" } },
                        { description: { contains: search, mode: "insensitive" } },
                        { supplier: { contains: search, mode: "insensitive" } },
                    ]
                } : {},
                category ? { category: { equals: category, mode: "insensitive" } } : {},
            ]
        };

        // Handle stock status filtering manually or via complex query if needed
        // For simplicity, we'll filter after fetching if complex, but here we can try:
        if (stockStatus === "out-of-stock") {
            where.AND.push({ quantity: 0 });
        } else if (stockStatus === "low-stock") {
            // This is tricky in Prisma without raw query if reorderLevel is dynamic per item
            // We'll handle this one in memory for now or assume a fixed level if schema was simple
            // But since we have reorderLevel in schema, we can't easily do "quantity <= reorderLevel" in standard Prisma where clause easily
            // So we will fetch and filter for low-stock
        }

        let items = await prisma.inventoryItem.findMany({
            where,
            orderBy: { [sortBy]: sortOrder },
            // If filtering by low-stock, we might need to fetch all matching other criteria first
            // But for pagination to work correctly with post-filtering, it's hard.
            // For now, let's ignore low-stock filter in DB query and do it in memory if dataset is small, 
            // OR just don't support server-side low-stock filter perfectly yet.
            // Let's stick to standard pagination for now.
            skip: stockStatus === "low-stock" ? undefined : skip,
            take: stockStatus === "low-stock" ? undefined : limit,
        });

        if (stockStatus === "low-stock") {
            items = items.filter(item => item.quantity <= item.reorderLevel && item.quantity > 0);
            // Manual pagination for this case
            const start = (page - 1) * limit;
            items = items.slice(start, start + limit);
        }

        const total = await prisma.inventoryItem.count({ where });

        return NextResponse.json({
            items,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });

    } catch (error) {
        console.error("Error fetching inventory:", error);
        return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            if (decoded.role !== "ADMIN") {
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            }
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const data = await request.json();

        // Validation
        if (!data.name || !data.category || data.quantity === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newItem = await prisma.inventoryItem.create({
            data: {
                name: data.name,
                category: data.category,
                description: data.description,
                quantity: parseInt(data.quantity),
                unit: data.unit || "units",
                reorderLevel: parseInt(data.reorderLevel) || 10,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
                supplier: data.supplier,
                price: data.price ? parseFloat(data.price) : null,
            },
        });

        return NextResponse.json({ item: newItem }, { status: 201 });

    } catch (error) {
        console.error("Error creating inventory item:", error);
        return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
    }
}
