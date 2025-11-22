import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    // ✅ Basic Validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // ✅ Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format." },
        { status: 400 }
      );
    }

    // ✅ Save message to DB
    await prisma.contactMessage.create({
      data: { name, email, phone, message },
    });

    return NextResponse.json(
      { success: true, message: "Message submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
