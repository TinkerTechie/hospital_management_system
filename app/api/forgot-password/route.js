import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      // Generate secure token
      const token = crypto.randomBytes(32).toString("hex");

      // Store token + expiry (1 hour)
      await prisma.user.update({
        where: { email },
        data: {
          resetToken: token,
          resetTokenExpiry: new Date(Date.now() + 3600000),
        },
      });

      // Reset link
      const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
      console.log("Reset link:", resetLink);

      // ✅ Setup Nodemailer
      const transporter = nodemailer.createTransport({
              service: "gmail",
           auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // App Password only
           },
      });

      // ✅ Send email
      const mailOptions = {
        from: `"Hospital Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset Request",
        html: `
          <h2>Password Reset</h2>
          <p>Click below to reset your password:</p>
          <a href="${resetLink}" target="_blank">${resetLink}</a>
          <p>This link will expire in 1 hour.</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent to:", email);
    }

    return NextResponse.json({
      message:
        "If this email is registered, you'll receive a reset link shortly.",
    });
  } catch (err) {
    console.error("❌ Error in forgot-password:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
