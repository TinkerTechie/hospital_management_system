import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT), // make sure it's a number
      secure: process.env.EMAIL_PORT === "465", // true for 465, false for others
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HospitalNext" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // replace with dynamic recipient if needed
      subject: "Test Email from HospitalNext",
      text: "If you see this, your email setup works correctly!",
    });

    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error("Email Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
