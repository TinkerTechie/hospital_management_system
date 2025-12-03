#!/bin/bash

# Script to add JWT_SECRET validation to all API routes
# This adds the validation check before jwt.verify calls

echo "🔧 Adding JWT_SECRET validation to remaining API routes..."
echo ""

# List of files that need JWT_SECRET validation
files=(
    "app/api/doctor/route.js"
    "app/api/doctor/appointments/route.js"
    "app/api/doctor/patients/route.js"
    "app/api/patient/route.js"
    "app/api/user/profile/route.js"
    "app/api/notifications/route.js"
    "app/api/notifications/[id]/route.js"
    "app/api/patient-updates/route.js"
    "app/api/patient-updates/[id]/route.js"
    "app/api/reviews/route.js"
    "app/api/reviews/[id]/route.js"
    "app/api/appointments/route.js"
    "app/api/appointments/[id]/route.js"
    "app/api/admin/doctors/route.js"
    "app/api/admin/nurses/route.js"
    "app/api/admin/inventory/route.js"
    "app/api/admin/inventory/[id]/route.js"
    "app/api/admin/alerts/route.js"
    "app/api/admin/reports/overview/route.js"
    "app/api/nurse/patients/[id]/vitals/route.js"
)

count=0
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        # Check if file already has JWT_SECRET validation
        if grep -q "if (!process.env.JWT_SECRET)" "$file"; then
            echo "⏭️  Skipping $file (already has validation)"
        else
            echo "📝 Would add validation to: $file"
            ((count++))
        fi
    else
        echo "⚠️  File not found: $file"
    fi
done

echo ""
echo "📊 Summary:"
echo "   Files that need manual validation: $count"
echo ""
echo "⚠️  Note: This is a dry-run script."
echo "   Please add JWT_SECRET validation manually to the files listed above."
echo ""
echo "   Add this code before jwt.verify() calls:"
echo ""
echo "   // Validate JWT_SECRET exists"
echo "   if (!process.env.JWT_SECRET) {"
echo "       console.error(\"JWT_SECRET is not defined\");"
echo "       return NextResponse.json({ error: \"Server configuration error\" }, { status: 500 });"
echo "   }"
