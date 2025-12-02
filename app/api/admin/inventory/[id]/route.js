import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../lib/db";

export async function GET(request, { params }) {
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

        const { id } = await params;

        const item = await prisma.inventoryItem.findUnique({
            where: { id },
        });

        if (!item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json({ item });

    } catch (error) {
        console.error("Error fetching item:", error);
        return NextResponse.json({ error: "Failed to fetch item" }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
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

        const { id } = await params;
        const data = await request.json();

        const updatedItem = await prisma.inventoryItem.update({
            where: { id },
            data: {
                name: data.name,
                category: data.category,
                description: data.description,
                quantity: data.quantity !== undefined ? parseInt(data.quantity) : undefined,
                unit: data.unit,
                reorderLevel: data.reorderLevel !== undefined ? parseInt(data.reorderLevel) : undefined,
                expiryDate: data.expiryDate ? new Date(data.expiryDate) : undefined,
                supplier: data.supplier,
                price: data.price !== undefined ? parseFloat(data.price) : undefined,
            },
        });

        return NextResponse.json({ item: updatedItem });

    } catch (error) {
        console.error("Error updating item:", error);
        return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
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

        const { id } = await params;

        await prisma.inventoryItem.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Error deleting item:", error);
        return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
    }
}
