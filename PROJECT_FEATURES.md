# Hospital Management System - Project Features

This project is a comprehensive **Hospital Management System** built with **Next.js**, designed to streamline hospital operations and improve patient care.

## 👥 User Roles & Access Control
The system supports multiple user roles with specific permissions:
- **Admin**: Full control over the system. Can manage doctors, patients, appointments, and nurses.
- **Doctor**: Can view their appointments, patient details, and manage their schedule.
- **Nurse**: Can record patient vitals (`/dashboard/nurse/vitals`) and manage ward assignments.
- **Patient**: Can view their medical history, appointments, and prescriptions.

## 🏥 Core Modules

### 1. Doctor Management
- **View All Doctors**: List of all doctors with their specialization, experience, and status.
- **Add Doctor**: Create new doctor profiles.
- **Delete Doctor**: Remove doctor records (with confirmation).
- **Search & Filter**: Find doctors by name, specialization, or status.

### 2. Patient Management
- **Patient Records**: Centralized database of patient information.
- **Add/Edit Patient**: Register new patients and update their details (e.g., ward assignment).
- **Delete Patient**: Remove patient records securely.
- **Search & Filter**: Quickly locate patients by name, blood group, or ID.

### 3. Appointment System
- **Booking**: Schedule appointments between patients and doctors.
- **Management**: View upcoming, completed, or cancelled appointments.
- **Delete Appointment**: Cancel/remove appointments.
- **Sorting**: Order appointments by date or status.

### 4. Clinical Features
- **Vitals Recording**: Nurses can record and track patient vitals.
- **Diagnostics**: View and manage diagnostic reports (Facilities gallery).

## 🛠 Technical Capabilities
- **Full CRUD Operations**: Create, Read, Update, and Delete functionality for core entities.
- **Advanced Data Handling**:
    - **Pagination**: Efficiently handles large datasets.
    - **Searching**: Real-time search across modules.
    - **Sorting**: Sort data by various fields (e.g., Name, Date).
    - **Filtering**: Filter data by specific criteria (e.g., Status, Specialization).
- **Authentication**: Secure login and signup with role-based redirection.
- **API-First Architecture**: Robust backend APIs handling all data operations.

## 🎨 UI/UX Features
- **Responsive Design**: Works seamlessly on desktop and mobile devices.
- **Dark Mode**: Built-in dark mode support for better accessibility.
- **Modern Interface**: Clean, professional design with status badges and intuitive navigation.
- **Interactive Elements**: Confirmation dialogs for critical actions (e.g., Deletion).
