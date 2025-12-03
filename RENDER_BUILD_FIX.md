# Render Build Error Fix

## Error
```
Error: Cannot find module '@tailwindcss/postcss'
```

## Root Cause
Render's build process may not be installing devDependencies properly, or the Tailwind CSS v4 PostCSS plugin isn't being found.

## Solution

### Option 1: Update Build Command (Recommended)

Use this build command on Render:

```bash
npm install && npx prisma generate && npx prisma db push && npm run build
```

This ensures all dependencies (including devDependencies) are installed before building.

### Option 2: Move @tailwindcss/postcss to dependencies

If Option 1 doesn't work, move the package from devDependencies to dependencies:

```bash
npm install @tailwindcss/postcss --save
```

Then commit and push:
```bash
git add package.json package-lock.json
git commit -m "Move @tailwindcss/postcss to dependencies for Render"
git push origin main
```

### Option 3: Disable Turbopack (If issues persist)

Update `package.json` scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build --no-turbopack",
  "start": "next start",
  "lint": "eslint"
}
```

## Recommended Render Settings

**Build Command:**
```bash
npm install && npx prisma generate && npx prisma db push && npm run build
```

**Start Command:**
```bash
npm start
```

**Environment Variables:**
- Ensure `NODE_ENV=production` is set
- All other env vars are configured

## Why This Happens

1. Render may skip devDependencies in production builds
2. Tailwind CSS v4 uses a different PostCSS plugin structure
3. Turbopack (Next.js 16) has stricter module resolution

## Quick Fix Steps

1. Go to Render Dashboard
2. Update Build Command to: `npm install && npx prisma generate && npx prisma db push && npm run build`
3. Trigger manual deploy
4. Monitor build logs
