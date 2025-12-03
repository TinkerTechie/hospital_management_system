import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// PATCH - Mark notification as read
export async function PATCH(req, { params }) {
    try {
        const { id } = params;

        // Get token from cookie
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Get notification
        const notification = await prisma.notification.findUnique({
            where: { id },
        });

        if (!notification) {
            return NextResponse.json(
                { error: "Notification not found" },
                { status: 404 }
            );
        }

        // Check ownership
        if (notification.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();
        const { read } = body;

        // Update notification
        const updated = await prisma.notification.update({
            where: { id },
            data: {
                read: read !== undefined ? read : true,
            },
        });

        return NextResponse.json({
            success: true,
            notification: updated,
        });
    } catch (error) {
        console.error("Error updating notification:", error);
        // Log the ID and body for debugging
        console.error("Notification ID:", params.id);
        return NextResponse.json(
            { error: "Failed to update notification", details: error.message },
            { status: 500 }
        );
    }
}

// DELETE - Delete a notification
export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        // Get token from cookie
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Get notification
        const notification = await prisma.notification.findUnique({
            where: { id },
        });

        if (!notification) {
            return NextResponse.json(
                { error: "Notification not found" },
                { status: 404 }
            );
        }

        // Check ownership
        if (notification.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Delete notification
        await prisma.notification.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Notification deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting notification:", error);
        return NextResponse.json(
            { error: "Failed to delete notification" },
            { status: 500 }
        );
    }
}
