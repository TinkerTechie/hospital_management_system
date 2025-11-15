import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { to, subject, text, html } = await req.json();

    if (!to || !subject || (!text && !html)) {
      return NextResponse.json(
        { message: "To, subject, and text/html are required." },
        { status: 400 }
      );
    }

    console.log("📧 Sending email to:", to);

    // Same transporter as reset-password (working)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the actual email
    const info = await transporter.sendMail({
      from: `"HospitalNext" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("📨 Email sent successfully:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });

  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error);

    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 }
    );
  }
}
