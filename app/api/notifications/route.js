import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// GET - Fetch user notifications
export async function GET(req) {
    try {
        // Get token from cookie
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { searchParams } = new URL(req.url);
        const readStatus = searchParams.get("read");
        const limit = parseInt(searchParams.get("limit") || "20");
        const offset = parseInt(searchParams.get("offset") || "0");

        const where = { userId };
        if (readStatus !== null && readStatus !== undefined) {
            where.read = readStatus === "true";
        }

        const notifications = await prisma.notification.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
            take: limit,
            skip: offset,
        });

        const unreadCount = await prisma.notification.count({
            where: {
                userId,
                read: false,
            },
        });

        const total = await prisma.notification.count({ where });

        return NextResponse.json({
            notifications,
            unreadCount,
            total,
            limit,
            offset,
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json(
            { error: "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}

// POST - Create a notification (admin/doctor/nurse only)
export async function POST(req) {
    try {
        // Get token from cookie
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const creatorId = decoded.id;

        // Get creator user
        const creator = await prisma.user.findUnique({
            where: { id: creatorId },
        });

        if (!creator) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check permissions (only admin, doctor, nurse can create notifications)
        if (!["ADMIN", "DOCTOR", "NURSE"].includes(creator.role)) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();
        const { userId, title, message, type, link } = body;

        // Validate required fields
        if (!userId || !title || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create notification
        const notification = await prisma.notification.create({
            data: {
                userId,
                title,
                message,
                type: type || "INFO",
                link: link || null,
            },
        });

        return NextResponse.json({
            success: true,
            notification,
            message: "Notification created successfully",
        });
    } catch (error) {
        console.error("Error creating notification:", error);
        return NextResponse.json(
            { error: "Failed to create notification" },
            { status: 500 }
        );
    }
}
