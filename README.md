# 🏥 LifeCare HMS — Advanced Hospital Management System

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Deployment: Render](https://img.shields.io/badge/Deployment-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com/)

---

![LifeCare HMS Hero](./public/hero.png)

## 📌 Overview

**LifeCare HMS** is a state-of-the-art, full-stack Hospital Management System designed for modern healthcare facilities. Built with **Next.js 15**, **React 19**, and **Prisma**, it provides a seamless, high-performance experience for patients, doctors, nurses, and administrators. 

The system features **Glassmorphism UI**, **Framer Motion animations**, and **Role-Based Access Control (RBAC)** to ensure security and a premium user experience.

---

## ✨ Key Features

### 👨‍💼 Admin Dashboard
*   **Complete Overview**: Real-time statistics on patients, doctors, and revenue.
*   **User Management**: CRUD operations for Patients, Doctors, and Staff.
*   **Billing & Finance**: Integrated billing system with invoice generation.
*   **System Configuration**: Manage departments, services, and system settings.

### 👩‍⚕️ Nurse & Doctor Portals
*   **Patient Vitals**: Real-time tracking and updating of patient health metrics.
*   **Medical Records**: Secure management of history, prescriptions, and reports.
*   **Appointment Scheduling**: Intuitive calendar for managing consultations.
*   **Video Consulting**: Integrated tele-health capabilities for remote care.

### 👤 Patient Experience
*   **Personal Dashboard**: View upcoming appointments, medical history, and bills.
*   **Online Booking**: Easy-to-use interface for scheduling visits.
*   **Digital Prescriptions**: Downloadable and viewable medical records.
*   **Profile Management**: Update personal info and secure image uploads.

### ⚙️ Core Technical Features
*   **JWT Authentication**: Secure session management with HTTP-only cookies.
*   **Middleware Security**: Centralized authorization and route protection.
*   **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.
*   **Prisma ORM**: Type-safe database queries with PostgreSQL.
*   **Render Optimized**: Zero filesystem dependency, perfect for cloud deployment.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **Charts**: ApexCharts

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT & NextAuth
- **Emails**: Nodemailer

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm / yarn / pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hospital-management-system.git
   cd hospital-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database"
   JWT_SECRET="your_min_32_character_secret_key"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Prisma Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```text
├── app/                # Next.js App Router (Pages & API)
├── components/         # Reusable UI Components
├── lib/               # Database & Utility configurations
├── prisma/            # Database Schema & Migrations
├── public/            # Static Assets
└── styles/            # Global Styling
```

---

## 📍 API Documentation (Overview)

| Method | Route | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | User Authentication | None |
| `GET` | `/api/admin/patients` | Fetch All Patients | Admin |
| `POST` | `/api/patient/book` | Create Appointment | Patient |
| `PUT` | `/api/nurse/vitals` | Update Patient Stats | Nurse |

---

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">Made with ❤️ for Modern Healthcare</p>
