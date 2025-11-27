"use client";

import React, { useState, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";

export default function ProfileImageUpload({ currentImage, onImageUpdate }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage);
    const fileInputRef = useRef(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file");
            return;
        }

        // Validate size (e.g., 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be less than 5MB");
            return;
        }

        setUploading(true);

        // Convert to Base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result;

            try {
                const res = await fetch("/api/user/upload-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: base64Image }),
                });

                const data = await res.json();

                if (res.ok) {
                    setPreview(data.imageUrl);
                    // Update local storage to reflect change immediately across app
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                        const user = JSON.parse(storedUser);
                        user.image = data.imageUrl;
                        localStorage.setItem("user", JSON.stringify(user));
                    }

                    if (onImageUpdate) onImageUpdate(data.imageUrl);
                } else {
                    alert(data.error || "Upload failed");
                }
            } catch (error) {
                console.error("Upload error:", error);
                alert("An error occurred while uploading");
            } finally {
                setUploading(false);
            }
        };
    };

    return (
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 overflow-hidden relative shadow-md">
                <img
                    src={preview || "https://placehold.co/100x100.png?text=User"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-8 w-8 text-white" />
                </div>

                {/* Loading State */}
                {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                    </div>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />

            <div className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full border-2 border-white dark:border-gray-900 shadow-sm group-hover:scale-110 transition-transform">
                <Camera className="h-3 w-3" />
            </div>
        </div>
    );
}
