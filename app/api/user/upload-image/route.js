import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        // Get token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify JWT token
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        if (!userId) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        // Check if it's a URL or base64
        let imageUrl;

        if (image.startsWith('http://') || image.startsWith('https://')) {
            // It's already a URL, use it directly
            imageUrl = image;
        } else if (image.startsWith('data:image')) {
            // For base64 images in production, we need cloud storage
            // For now, store the base64 directly (not recommended for large images)
            // TODO: Integrate with Cloudinary, AWS S3, or similar service

            // Temporary solution: Store base64 in database (works but not optimal)
            imageUrl = image;

            // Better solution would be:
            // const uploadResult = await uploadToCloudinary(image);
            // imageUrl = uploadResult.secure_url;
        } else {
            return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
        }

        // Update user in database
        await prisma.user.update({
            where: { id: userId },
            data: { image: imageUrl },
        });

        return NextResponse.json({ success: true, imageUrl });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({
            error: error.message || "Server error"
        }, { status: 500 });
    }
}
