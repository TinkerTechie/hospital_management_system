// lib/apiHelpers.js - Utility functions for API routes
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

/**
 * Validates JWT_SECRET environment variable
 * @returns {boolean} true if valid
 */
export function validateJWTSecret() {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET environment variable is not defined");
        return false;
    }
    return true;
}

/**
 * Validates DATABASE_URL environment variable
 * @returns {boolean} true if valid
 */
export function validateDatabaseURL() {
    if (!process.env.DATABASE_URL) {
        console.error("DATABASE_URL environment variable is not defined");
        return false;
    }
    return true;
}

/**
 * Verifies JWT token from cookies and returns decoded data
 * @param {boolean} requireToken - Whether token is required (default: true)
 * @returns {Promise<{success: boolean, decoded?: any, error?: string, response?: NextResponse}>}
 */
export async function verifyAuthToken(requireToken = true) {
    try {
        // Validate JWT_SECRET first
        if (!validateJWTSecret()) {
            return {
                success: false,
                error: "Server configuration error",
                response: NextResponse.json(
                    { error: "Server configuration error" },
                    { status: 500 }
                ),
            };
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            if (requireToken) {
                return {
                    success: false,
                    error: "Unauthorized - No token provided",
                    response: NextResponse.json(
                        { error: "Unauthorized" },
                        { status: 401 }
                    ),
                };
            }
            return { success: true, decoded: null };
        }

        try {
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
            return { success: true, decoded };
        } catch (err) {
            return {
                success: false,
                error: "Invalid or expired token",
                response: NextResponse.json(
                    { error: "Invalid token" },
                    { status: 401 }
                ),
            };
        }
    } catch (error) {
        console.error("Token verification error:", error);
        return {
            success: false,
            error: "Token verification failed",
            response: NextResponse.json(
                { error: "Server error" },
                { status: 500 }
            ),
        };
    }
}

/**
 * Checks if user has required role
 * @param {string} userRole - User's role
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {{success: boolean, response?: NextResponse}}
 */
export function checkRole(userRole, allowedRoles) {
    if (!allowedRoles.includes(userRole)) {
        return {
            success: false,
            response: NextResponse.json(
                { error: "Forbidden - Insufficient permissions" },
                { status: 403 }
            ),
        };
    }
    return { success: true };
}

/**
 * Creates a standardized error response
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @returns {NextResponse}
 */
export function errorResponse(message, status = 500) {
    return NextResponse.json({ error: message }, { status });
}

/**
 * Creates a standardized success response
 * @param {any} data - Response data
 * @param {number} status - HTTP status code
 * @returns {NextResponse}
 */
export function successResponse(data, status = 200) {
    return NextResponse.json(data, { status });
}

/**
 * Wraps an API handler with common error handling
 * @param {Function} handler - The API handler function
 * @returns {Function} Wrapped handler
 */
export function withErrorHandling(handler) {
    return async (...args) => {
        try {
            return await handler(...args);
        } catch (error) {
            console.error("API Error:", error);
            return errorResponse(
                error.message || "Internal server error",
                error.status || 500
            );
        }
    };
}

/**
 * Validates required fields in request body
 * @param {Object} data - Request body data
 * @param {string[]} requiredFields - Array of required field names
 * @returns {{valid: boolean, missing?: string[], response?: NextResponse}}
 */
export function validateRequiredFields(data, requiredFields) {
    const missing = requiredFields.filter((field) => !data[field]);

    if (missing.length > 0) {
        return {
            valid: false,
            missing,
            response: NextResponse.json(
                { error: `Missing required fields: ${missing.join(", ")}` },
                { status: 400 }
            ),
        };
    }

    return { valid: true };
}
