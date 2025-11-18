<<<<<<< HEAD
# hospital_management_system
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).
1. Project Title
MediCare Connect – Hospital Management System

2. Problem Statement
Hospitals face inefficiencies due to outdated systems — including manual data entry, poor inter-department communication, billing errors, and lack of centralized patient information.
MediCare Connect aims to provide a secure, integrated, and automated digital platform to manage patients, appointments, billing, and records efficiently.

3. System Architecture
Architecture: Three-tier (Frontend → Backend → Database)
Layer
Technology
Frontend
React.js, React Router, Axios, TailwindCSS
Backend
Node.js, Express.js, Mongoose
Database
Mongodb
Authentication
JWT + bcrypt
Hosting
Frontend → Vercel, Backend → Render/Railway, DB → MongoDB Atlas


4. Key Features
Category
Features
Auth & Roles
Secure login/signup, JWT-based, Admin/Doctor/Patient/Staff roles
Patient Management
Register, update, track medical history & insurance
Appointments
Book, reschedule, cancel appointments
Doctors
Manage schedules, fees, and availability
Billing
Generate invoices, track payments & insurance claims
Records
Upload/view medical reports & prescriptions
Inventory
Track supplies, stock alerts
Reports


Analytics dashboards, performance insights


Search & Filter 
Search: Admins and staff can search for patients, doctors, or appointments by name, ID, or department.
Filtering: Users can filter doctors by specialization, patients by admission status, and appointments by date or status.
Sorting: Records such as patients, doctors, and bills can be sorted by name, date, or amount for easier data analysis.
Pagination: All large data lists (patients, doctors, appointments, billing records) will be paginated to improve performance and ensure a smooth user experience.






5. Tech Stack
Layer
Technologies Used
Frontend
Next.js, React Router, Axios, TailwindCSS / Bootstrap
Backend
Node.js, Express.js
Database
MySQL
Authentication
JWT (JSON Web Tokens), bcrypt
Testing
Jest, Supertest, Cypress
Hosting / Deployment
Vercel (Frontend), Render/Railway (Backend), MongoDB Atlas (Database)
Version Control
Git & GitHub
Tools
Postman (API testing), VS Code, ESLint, Nodemon



6. API Overview
Endpoint
Method
Description
Access
/api/auth/signup
POST
Register user
Public
/api/auth/login
POST
Login user
Public
/api/patients
GET
Get patients
Admin/Staff
/api/appointments
POST
Create appointment
Patient
/api/doctors
GET
View doctors
Public
/api/billing
POST
Create bill
Admin/Finance



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
>>>>>>> 6e50ae2 (Initial commit from Create Next App)