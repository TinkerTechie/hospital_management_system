import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../lib/db";

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

        // Fetch overview statistics
        const [
            totalPatients,
            todayAppointments,
            activeDoctors,
            monthlyInvoices,
        ] = await Promise.all([
            prisma.patient.count(),
            prisma.appointment.count({
                where: {
                    appointmentDate: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999)),
                    },
                },
            }),
            prisma.doctor.count(),
            prisma.invoice.findMany({
                where: {
                    date: {
                        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                    },
                },
                select: {
                    totalAmount: true,
                },
            }),
        ]);

        const monthlyRevenue = monthlyInvoices.reduce(
            (sum, invoice) => sum + (invoice.totalAmount || 0),
            0
        );

        return NextResponse.json({
            totalPatients,
            todayAppointments,
            activeDoctors,
            monthlyRevenue,
        });
    } catch (error) {
        console.error("Error fetching overview stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch overview stats" },
            { status: 500 }
        );
    }
}
