🏥 Hospital Management System — Full Stack (Next.js + Prisma + PostgreSQL)
A full-featured Hospital Management System built with Next.js App Router, Prisma, PostgreSQL, and JWT Authentication, including dedicated portals for Admins, Nurses, and Users.
This project is fully optimized for Render Deployment, with secure environment variable validation and zero filesystem usage.
⭐ Features
👨‍⚕️ Admin Portal
Manage Patients (CRUD)
Manage Appointments
Manage Medical Records
Manage Billing
Role-based authentication and access control
👩‍⚕️ Nurse Portal
View assigned patients
Update vitals
Add observations & notes
👤 User Portal
Login / Signup
Profile management
Image upload via URL/Base64
Cloud storage ready (Cloudinary / AWS S3)
⚙️ App-Level Features
Centralized JWT middleware
Prisma ORM with PostgreSQL
Render-optimized: no filesystem writes
Production logging & error handling enhancements
📍 API ROUTES DOCUMENTATION
🔐 Auth Routes (/api)
POST /api/login
User login → returns JWT.
POST /api/signup
User registration.
👨‍⚕️ Admin Routes (/api/admin)
All require admin-role JWT.
Patients
Method	Route	Description
GET	/api/admin/patients	Fetch all patients
POST	/api/admin/patients	Create a patient
PUT	/api/admin/patients	Update a patient
DELETE	/api/admin/patients	Delete a patient
Appointments
Method	Route	Description
GET	/api/admin/appointments	Fetch all appointments
POST	/api/admin/appointments	Create an appointment
DELETE	/api/admin/appointments	Delete an appointment
Billing
Method	Route	Description
GET	/api/admin/billing	Get billing records
POST	/api/admin/billing	Create billing entry
Medical Records
Method	Route	Description
GET	/api/admin/records	Fetch medical records
POST	/api/admin/records	Create record
👩‍⚕️ Nurse Route (/api/nurse)
GET /api/nurse
Fetch patients assigned to the nurse.
👤 User Routes (/api/user)
POST /api/user/upload-image
Upload profile image using:
Public Image URL
Base64 encoded string
No filesystem writes — Render compatible.
🧩 Render Deployment Fixes
✔ Removed filesystem operations
Replaced with URL/Base64 storage.
Cloud upload integration ready.
✔ Validated environment variables
Every protected route checks:
JWT_SECRET
DATABASE_URL
✔ Optimized Prisma logging
Only logs errors in production
Speeds up Render performance
✔ Improved error handling
Standard HTTP response codes
try/catch protection on all routes
🛠️ Tech Stack
Frontend
Next.js (App Router)
React
Tailwind CSS
Lucide Icons
Backend
Next.js API Routes
JWT Authentication
Middleware-based Authorization
Database
PostgreSQL
Prisma ORM
Deployment
Render
⚙️ Installation
git clone https://github.com/your-username/hospital-management-system.git
cd hospital-management-system
npm install
🔧 Environment Variables
Create a .env file:
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your_super_secret_key_minimum_32_characters_long
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
🗃️ Prisma Setup
npx prisma generate
npx prisma db push
Or for migrations:
npx prisma migrate deploy
▶️ Running the Project
Development
npm run dev
Production
npx prisma generate && npm run build
npm start
🚀 Deploying on Render
Build Command
npx prisma generate && npx prisma migrate deploy && npm run build
Start Command
npm start
Required Environment Variables on Render
Variable	Required	Description
DATABASE_URL	✅	PostgreSQL connection
JWT_SECRET	✅	32+ character secret key
NODE_ENV	Optional	Set to production
NEXT_PUBLIC_APP_URL	Optional	Render URL
✔️ Deployment Checklist
 Prisma Client generated
 DATABASE_URL added
 JWT_SECRET is at least 32 characters
 Build completes on Render
 No filesystem operations remain
 API routes responding correctly
🛑 Common Errors & Fixes
❌ JWT_SECRET is not defined
Add it in Render → Environment.
❌ DATABASE_URL missing
Set correct PostgreSQL URL.
❌ Prisma Client not generated
Add npx prisma generate to build command.
❌ ENOENT: no such file or directory
You are trying to write to the filesystem — disabled in production.
🌥️ Optional Enhancements
Image Storage (Recommended)
Use Cloudinary or AWS S3:
npm install cloudinary
Email Services
SendGrid
Resend
AWS SES
Monitoring
Sentry
LogRocket
📂 Key Modified Files (12 Total)
File	Purpose
app/api/user/upload-image/route.js	Removed filesystem usage
app/api/admin/*	Added JWT_SECRET validation
app/api/login/route.js	Validation added
app/api/signup/route.js	Validation added
app/api/nurse/route.js	Validation added
middleware.js	Centralized JWT checks
lib/db.js	DATABASE_URL validation
RENDER_DEPLOYMENT_FIXES.md	Documentation
scripts/validate-render.sh	Deployment validator
