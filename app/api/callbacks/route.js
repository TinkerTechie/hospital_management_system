import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function POST(request) {
    try {
        const { phone } = await request.json();

        if (!phone) {
            return NextResponse.json(
                { error: "Phone number is required" },
                { status: 400 }
            );
        }

        const callbackRequest = await prisma.callbackRequest.create({
            data: {
                phone,
            },
        });

        return NextResponse.json({ success: true, data: callbackRequest }, { status: 201 });
    } catch (error) {
        console.error("Error creating callback request:", error);
        return NextResponse.json(
            { error: "Failed to submit request" },
            { status: 500 }
        );
    }
}
