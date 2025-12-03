# API Helper Usage Guide

## Overview
The `lib/apiHelpers.js` file provides utility functions to reduce code duplication and standardize error handling across all API routes.

## Functions

### 1. `verifyAuthToken(requireToken = true)`
Verifies JWT token from cookies and returns decoded data.

**Usage:**
```javascript
import { verifyAuthToken } from "@/lib/apiHelpers";

export async function GET(request) {
  const auth = await verifyAuthToken();
  if (!auth.success) {
    return auth.response; // Returns error response
  }
  
  const userId = auth.decoded.id;
  const userRole = auth.decoded.role;
  
  // Your logic here...
}
```

### 2. `checkRole(userRole, allowedRoles)`
Checks if user has required role.

**Usage:**
```javascript
import { verifyAuthToken, checkRole } from "@/lib/apiHelpers";

export async function POST(request) {
  const auth = await verifyAuthToken();
  if (!auth.success) return auth.response;
  
  const roleCheck = checkRole(auth.decoded.role, ["ADMIN", "DOCTOR"]);
  if (!roleCheck.success) return roleCheck.response;
  
  // Your logic here...
}
```

### 3. `validateRequiredFields(data, requiredFields)`
Validates required fields in request body.

**Usage:**
```javascript
import { validateRequiredFields } from "@/lib/apiHelpers";

export async function POST(request) {
  const data = await request.json();
  
  const validation = validateRequiredFields(data, ["name", "email", "age"]);
  if (!validation.valid) {
    return validation.response; // Returns 400 with missing fields
  }
  
  // Your logic here...
}
```

### 4. `errorResponse(message, status)` & `successResponse(data, status)`
Standardized response creators.

**Usage:**
```javascript
import { errorResponse, successResponse } from "@/lib/apiHelpers";

// Error response
return errorResponse("Patient not found", 404);

// Success response
return successResponse({ patient: data }, 201);
```

### 5. `withErrorHandling(handler)`
Wraps an API handler with automatic error handling.

**Usage:**
```javascript
import { withErrorHandling } from "@/lib/apiHelpers";

async function handleGET(request) {
  // Your logic here...
  // Any thrown errors will be caught automatically
}

export const GET = withErrorHandling(handleGET);
```

## Complete Example

### Before (Old Way):
```javascript
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
    
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    let decoded;
    try {
      decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    
    if (!["ADMIN", "DOCTOR"].includes(decoded.role)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    
    // Your logic...
    return NextResponse.json({ data: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

### After (New Way):
```javascript
import { verifyAuthToken, checkRole, successResponse } from "@/lib/apiHelpers";

export async function GET(request) {
  // Verify authentication
  const auth = await verifyAuthToken();
  if (!auth.success) return auth.response;
  
  // Check role
  const roleCheck = checkRole(auth.decoded.role, ["ADMIN", "DOCTOR"]);
  if (!roleCheck.success) return roleCheck.response;
  
  // Your logic...
  return successResponse({ data: "success" });
}
```

## Benefits

✅ **Less Code**: Reduce boilerplate by 60-70%
✅ **Consistency**: All routes use same error messages and status codes
✅ **Maintainability**: Update validation logic in one place
✅ **Type Safety**: Clear function signatures
✅ **Error Handling**: Automatic error catching and logging

## Migration Guide

To migrate existing routes:

1. Import helper functions at the top
2. Replace JWT verification code with `verifyAuthToken()`
3. Replace role checks with `checkRole()`
4. Replace manual field validation with `validateRequiredFields()`
5. Use `successResponse()` and `errorResponse()` for responses

## Environment Variables

The helpers automatically validate:
- `JWT_SECRET` - Required for authentication
- `DATABASE_URL` - Required for database operations

Make sure these are set in your `.env` file and Render dashboard.
