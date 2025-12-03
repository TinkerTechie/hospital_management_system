#!/bin/bash

# Render Deployment Validation Script
# Run this before deploying to Render to catch common issues

echo "🔍 Checking for Render deployment issues..."
echo ""

# Check for environment variables in .env (for reference)
echo "📋 Checking environment variables..."
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found"
else
    if grep -q "JWT_SECRET" .env; then
        echo "✅ JWT_SECRET found in .env"
    else
        echo "❌ JWT_SECRET missing in .env"
    fi
    
    if grep -q "DATABASE_URL" .env; then
        echo "✅ DATABASE_URL found in .env"
    else
        echo "❌ DATABASE_URL missing in .env"
    fi
fi

echo ""
echo "📦 Checking dependencies..."

# Check if uuid is in package.json (no longer needed)
if grep -q "\"uuid\"" package.json; then
    echo "⚠️  Warning: uuid package found but may not be needed"
else
    echo "✅ uuid package not in dependencies (good)"
fi

# Check for filesystem operations
echo ""
echo "🔍 Checking for filesystem operations..."
if grep -r "fs.writeFileSync\|fs.writeFile\|fs.mkdirSync" app/api --include="*.js" 2>/dev/null; then
    echo "❌ Found filesystem write operations - these will fail on Render!"
else
    echo "✅ No filesystem write operations found"
fi

# Check for missing JWT_SECRET validation
echo ""
echo "🔐 Checking JWT_SECRET validation..."
jwt_routes=$(grep -l "jwt.verify" app/api/**/*.js 2>/dev/null | wc -l)
jwt_validated=$(grep -l "if (!process.env.JWT_SECRET)" app/api/**/*.js 2>/dev/null | wc -l)
echo "   Routes using JWT: $jwt_routes"
echo "   Routes with JWT_SECRET validation: $jwt_validated"

if [ "$jwt_routes" -gt "$jwt_validated" ]; then
    echo "⚠️  Some routes may be missing JWT_SECRET validation"
else
    echo "✅ JWT_SECRET validation looks good"
fi

# Check Prisma schema
echo ""
echo "🗄️  Checking Prisma setup..."
if [ -f "prisma/schema.prisma" ]; then
    echo "✅ Prisma schema found"
else
    echo "❌ Prisma schema not found"
fi

# Check build scripts
echo ""
echo "🏗️  Checking build configuration..."
if grep -q "\"build\":" package.json; then
    echo "✅ Build script found in package.json"
else
    echo "❌ Build script missing in package.json"
fi

echo ""
echo "📝 Recommended Render Build Command:"
echo "   npx prisma generate && npx prisma db push && npm run build"
echo ""
echo "📝 Recommended Render Start Command:"
echo "   npm start"
echo ""
echo "✅ Validation complete!"
echo ""
echo "⚠️  Remember to set these environment variables in Render:"
echo "   - DATABASE_URL"
echo "   - JWT_SECRET"
echo "   - NODE_ENV=production"
