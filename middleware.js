import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  console.log("Middleware: Checking path", req.nextUrl.pathname);

  if (!token) {
    console.log("Middleware: No token found");
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    console.log("Middleware: Token verified");
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware: Token verification failed", err.message);
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",  // protect dashboard
    "/doctor/:path*",     // protect doctor routes
    "/patient/:path*",    // protect patient routes
  ],
};
