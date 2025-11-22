import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { prisma } from "../../../../../lib/db";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Fetch overview statistics
        const [
            totalPatients,
            todayAppointments,
            activeDoctors,
            monthlyInvoices,
        ] = await Promise.all([
            prisma.patient.count({ where: { status: "active" } }),
            prisma.appointment.count({
                where: {
                    date: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999)),
                    },
                },
            }),
            prisma.doctor.count({ where: { status: "active" } }),
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
