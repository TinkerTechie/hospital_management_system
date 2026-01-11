# 🏥 Medicare — Advanced Hospital Management System

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Deployment: Render](https://img.shields.io/badge/Deployment-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com/)

---

![Medicare Hero](./public/hero.png)

## 📌 Overview

**Medicare** is a state-of-the-art, full-stack Hospital Management System designed for modern healthcare facilities. Built with **Next.js 15**, **React 19**, and **Prisma**, it provides a seamless, high-performance experience for patients, doctors, nurses, and administrators. 

The system features **Glassmorphism UI**, **Framer Motion animations**, and **Role-Based Access Control (RBAC)** to ensure security and a premium user experience.

---

## ✨ Key Features

### 👨‍💼 Admin Dashboard
*   **Complete Overview**: Real-time statistics on patients, doctors, and revenue.
*   **User Management**: CRUD operations for Patients, Doctors, and Staff.
*   **Billing & Finance**: Integrated billing system with invoice generation.
*   **Inventory & Alerts**: Manage hospital resources and broadcast urgent notifications.

### 👩‍⚕️ Nurse & Doctor Portals
*   **Patient Vitals**: Real-time tracking and updating of patient health metrics.
*   **Medical Records**: Secure management of history, prescriptions, and reports.
*   **Appointment Scheduling**: Intuitive calendar for managing consultations.
*   **Specialty Management**: Dedicated modules for Cardiology, Neurology, Pediatrics, and Orthopedics.

### 👤 Patient Experience
*   **Personal Dashboard**: View upcoming appointments, medical history, and status updates.
*   **Online Booking**: Easy-to-use interface for scheduling visits.
*   **Digital Records**: download and view records, prescriptions, and test results.
*   **Profile Management**: Secure profile updates and image uploads.

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
- **Emails**: Nodemailer / SendGrid

---
## 📂 Project Structure

```text
├── app/
│   ├── api/            # Complete API Implementation
│   ├── dashboard/      # Role-based Dashboards (Admin, Doctor, Patient, Nurse)
│   ├── auth/           # Login, Signup, Password Recovery
│   └── components/     # High-quality UI Components
├── lib/               # Shared logic & Database client
├── prisma/            # Database Schema (PostgreSQL)
├── public/            # Modern Assets & Images
└── styles/            # Global Stylings & Glassmorphism
```

---

## 📍 API Documentation

### 🔐 Authentication & Profile
| Method | Route | Description | 
| :--- | :--- | :--- |
| `POST` | `/api/login` | Check credentials & return JWT |
| `POST` | `/api/signup` | Register new patient |
| `POST` | `/api/forgot-password` | Initiate password recovery |
| `POST` | `/api/reset-password` | Update password with token |
| `GET` | `/api/user/profile` | Fetch authenticated user data |
| `POST` | `/api/user/upload-image`| Upload profile picture (Base64/URL) |

### 👨‍💼 Admin Operations
| Method | Route | Description |
| :--- | :--- | :--- |
| `GET/POST` | `/api/admin/patients` | Manage patient database |
| `GET/POST` | `/api/admin/doctors` | Manage medical staff |
| `GET/POST` | `/api/admin/nurses` | Manage nursing staff |
| `GET/POST` | `/api/admin/appointments` | Global appointment controller |
| `GET/POST` | `/api/admin/billing` | Financial records & Invoicing |
| `GET/POST` | `/api/admin/records` | Centralized medical record system |
| `GET/POST` | `/api/admin/inventory` | Hospital resource management |
| `POST` | `/api/admin/alerts` | Broadcast system-wide notifications |
| `GET` | `/api/admin/reports/overview`| Analytics & Statistical reports |

### 👩‍⚕️ Medical Staff (Doctors & Nurses)
| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/doctor` | Doctor dashboard data |
| `GET` | `/api/doctor/appointments` | Assigned patient consultations |
| `GET` | `/api/doctor/patients` | List of patients under care |
| `GET` | `/api/nurse` | Nurse dashboard data |
| `PUT` | `/api/nurse/patients/[id]/vitals`| Update heart rate, BP, temperature |

### 👤 Patient & Public Actions
| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/patient` | My health overview |
| `GET/POST` | `/api/appointments` | Book/View personal appointments |
| `GET` | `/api/notifications` | Personal alerts & reminders |
| `GET` | `/api/patient-updates` | Real-time recovery progress |
| `GET` | `/api/doctors` | Public directory of available doctors |
| `GET` | `/api/best-doctors` | Featured/Top-rated specialists |
| `GET` | `/api/best-nurses` | Featured nursing staff |
| `GET` | `/api/search` | Global search across departments |

### 🏥 Specialties & Departments
| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/api/cardiology/services` | Heart care services |
| `GET` | `/api/neurology/services` | Brain & nerve care |
| `GET` | `/api/pediatrics/services` | Child healthcare |
| `GET` | `/api/orthopedics/services` | Bone & joint care |
| `GET` | `/api/diagnostics/packages` | Health checkup packages |
| `GET` | `/api/emergency/services` | Urgent care details |

### ✉️ Utilities
| Method | Route | Description |
| :--- | :--- | :--- |
| `POST` | `/api/email/send` | Generic email service |
| `POST` | `/api/contact` | Contact form processing |


---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<p align="center">Made with ❤️ for Modern Healthcare by TinkerTechie</p>
