"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({
    rating = 0,
    onRatingChange = null,
    size = "md",
    readonly = false,
}) {
    const [hover, setHover] = useState(0);

    const sizes = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
    };

    const sizeClass = sizes[size] || sizes.md;
    const isInteractive = !readonly && onRatingChange;

    const handleClick = (value) => {
        if (isInteractive) {
            onRatingChange(value);
        }
    };

    const handleMouseEnter = (value) => {
        if (isInteractive) {
            setHover(value);
        }
    };

    const handleMouseLeave = () => {
        if (isInteractive) {
            setHover(0);
        }
    };

    const displayRating = hover || rating;

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= Math.floor(displayRating);
                const isHalf = star === Math.ceil(displayRating) && displayRating % 1 !== 0;

                return (
                    <button
                        key={star}
                        type="button"
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        disabled={!isInteractive}
                        className={`${isInteractive ? "cursor-pointer hover:scale-110" : "cursor-default"
                            } transition-transform duration-150`}
                    >
                        {isHalf ? (
                            <div className="relative">
                                <Star className={`${sizeClass} text-gray-300`} />
                                <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                                    <Star className={`${sizeClass} text-yellow-400 fill-yellow-400`} />
                                </div>
                            </div>
                        ) : (
                            <Star
                                className={`${sizeClass} ${isFilled
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    } transition-colors duration-150`}
                            />
                        )}
                    </button>
                );
            })}
            {readonly && (
                <span className="ml-2 text-sm font-medium text-gray-600">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
}
