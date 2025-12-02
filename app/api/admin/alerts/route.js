import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../lib/db";

// POST: Send a notification to a user or all users of a role
export async function POST(req) {
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
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, message, targetRole, targetUserId } = await req.json();

        if (!title || !message) {
            return NextResponse.json({ error: "Title and message are required" }, { status: 400 });
        }

        let count = 0;

        if (targetUserId) {
            // Send to specific user
            await prisma.notification.create({
                data: {
                    userId: targetUserId,
                    title,
                    message,
                    type: "INFO"
                }
            });
            count = 1;
        } else if (targetRole) {
            // Send to all users of a specific role
            const users = await prisma.user.findMany({
                where: { role: targetRole },
                select: { id: true }
            });

            if (users.length > 0) {
                await prisma.notification.createMany({
                    data: users.map(u => ({
                        userId: u.id,
                        title,
                        message,
                        type: "INFO"
                    }))
                });
                count = users.length;
            }
        }

        return NextResponse.json({ success: true, count });
    } catch (error) {
        console.error("Error sending alert:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
