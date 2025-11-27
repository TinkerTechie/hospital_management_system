const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');
    console.log('🗑️  Clearing existing data...');

    // Clear existing data
    await prisma.review.deleteMany();
    await prisma.appointment.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.nurse.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create Admin
    console.log('👤 Creating admin...');
    await prisma.user.create({
        data: {
            name: 'Rajesh Kumar',
            email: 'admin@hospital.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    // Create Doctors with Indian names
    console.log('👨‍⚕️ Creating doctors...');
    const doctor1 = await prisma.user.create({
        data: {
            name: 'Dr. Priya Sharma',
            email: 'priya.sharma@hospital.com',
            password: hashedPassword,
            role: 'DOCTOR',
            doctorProfile: {
                create: {
                    fullName: 'Dr. Priya Sharma',
                    specialization: 'Cardiology',
                    licenseNumber: 'MCI-12345',
                    yearsOfExperience: 15,
                    consultationFee: 1500.00,
                    bio: 'Experienced cardiologist with 15 years of practice in treating heart conditions.',
                },
            },
        },
        include: { doctorProfile: true },
    });

    const doctor2 = await prisma.user.create({
        data: {
            name: 'Dr. Arjun Patel',
            email: 'arjun.patel@hospital.com',
            password: hashedPassword,
            role: 'DOCTOR',
            doctorProfile: {
                create: {
                    fullName: 'Dr. Arjun Patel',
                    specialization: 'Neurology',
                    licenseNumber: 'MCI-12346',
                    yearsOfExperience: 12,
                    consultationFee: 1200.00,
                    bio: 'Specialist in neurological disorders and brain health.',
                },
            },
        },
        include: { doctorProfile: true },
    });

    const doctor3 = await prisma.user.create({
        data: {
            name: 'Dr. Anjali Reddy',
            email: 'anjali.reddy@hospital.com',
            password: hashedPassword,
            role: 'DOCTOR',
            doctorProfile: {
                create: {
                    fullName: 'Dr. Anjali Reddy',
                    specialization: 'Pediatrics',
                    licenseNumber: 'MCI-12347',
                    yearsOfExperience: 10,
                    consultationFee: 1000.00,
                    bio: 'Dedicated pediatrician caring for children\'s health and development.',
                },
            },
        },
        include: { doctorProfile: true },
    });

    // Create Nurses with Indian names
    console.log('👩‍⚕️ Creating nurses...');
    const nurse1 = await prisma.user.create({
        data: {
            name: 'Kavita Singh',
            email: 'kavita.singh@hospital.com',
            password: hashedPassword,
            role: 'NURSE',
            nurseProfile: {
                create: {
                    fullName: 'Kavita Singh',
                    assignedWard: 'Emergency',
                    shiftTiming: '08:00 AM - 04:00 PM',
                },
            },
        },
        include: { nurseProfile: true },
    });

    const nurse2 = await prisma.user.create({
        data: {
            name: 'Meera Desai',
            email: 'meera.desai@hospital.com',
            password: hashedPassword,
            role: 'NURSE',
            nurseProfile: {
                create: {
                    fullName: 'Meera Desai',
                    assignedWard: 'ICU',
                    shiftTiming: '04:00 PM - 12:00 AM',
                },
            },
        },
        include: { nurseProfile: true },
    });

    // Create Patients with Indian names
    console.log('🏥 Creating patients...');
    const patient1 = await prisma.user.create({
        data: {
            name: 'Amit Verma',
            email: 'amit.verma@email.com',
            password: hashedPassword,
            role: 'PATIENT',
            patientProfile: {
                create: {
                    fullName: 'Amit Verma',
                    age: 38,
                    bloodGroup: 'O+',
                    medicalHistory: 'No major health issues',
                },
            },
        },
        include: { patientProfile: true },
    });

    const patient2 = await prisma.user.create({
        data: {
            name: 'Sneha Gupta',
            email: 'sneha.gupta@email.com',
            password: hashedPassword,
            role: 'PATIENT',
            patientProfile: {
                create: {
                    fullName: 'Sneha Gupta',
                    age: 33,
                    bloodGroup: 'A+',
                    medicalHistory: 'Mild asthma',
                },
            },
        },
        include: { patientProfile: true },
    });

    const patient3 = await prisma.user.create({
        data: {
            name: 'Rahul Malhotra',
            email: 'rahul.malhotra@email.com',
            password: hashedPassword,
            role: 'PATIENT',
            patientProfile: {
                create: {
                    fullName: 'Rahul Malhotra',
                    age: 45,
                    bloodGroup: 'B+',
                    medicalHistory: 'Diabetes Type 2',
                },
            },
        },
        include: { patientProfile: true },
    });

    const patient4 = await prisma.user.create({
        data: {
            name: 'Pooja Iyer',
            email: 'pooja.iyer@email.com',
            password: hashedPassword,
            role: 'PATIENT',
            patientProfile: {
                create: {
                    fullName: 'Pooja Iyer',
                    age: 28,
                    bloodGroup: 'AB+',
                },
            },
        },
        include: { patientProfile: true },
    });

    const patient5 = await prisma.user.create({
        data: {
            name: 'Vikram Rao',
            email: 'vikram.rao@email.com',
            password: hashedPassword,
            role: 'PATIENT',
            patientProfile: {
                create: {
                    fullName: 'Vikram Rao',
                    age: 41,
                    bloodGroup: 'O-',
                },
            },
        },
        include: { patientProfile: true },
    });

    // Create Appointments with 2025 dates
    console.log('📅 Creating appointments for 2025...');
    const today = new Date('2025-01-15'); // January 15, 2025
    const tomorrow = new Date('2025-01-16');
    const nextWeek = new Date('2025-01-22');

    await prisma.appointment.create({
        data: {
            patientId: patient1.patientProfile.id,
            doctorId: doctor1.doctorProfile.id,
            appointmentDate: today,
            time: '10:00 AM',
        },
    });

    await prisma.appointment.create({
        data: {
            patientId: patient2.patientProfile.id,
            doctorId: doctor2.doctorProfile.id,
            appointmentDate: today,
            time: '2:00 PM',
        },
    });

    await prisma.appointment.create({
        data: {
            patientId: patient3.patientProfile.id,
            doctorId: doctor1.doctorProfile.id,
            appointmentDate: tomorrow,
            time: '11:00 AM',
        },
    });

    await prisma.appointment.create({
        data: {
            patientId: patient4.patientProfile.id,
            doctorId: doctor3.doctorProfile.id,
            appointmentDate: nextWeek,
            time: '9:00 AM',
        },
    });

    // Create Reviews
    console.log('⭐ Creating reviews...');
    await prisma.review.create({
        data: {
            reviewerId: patient1.id,
            reviewerRole: 'PATIENT',
            targetType: 'DOCTOR',
            targetId: doctor1.doctorProfile.id,
            rating: 5,
            comment: 'Dr. Priya Sharma is excellent! Very thorough and caring. Highly recommend for heart issues.',
        },
    });

    await prisma.review.create({
        data: {
            reviewerId: patient2.id,
            reviewerRole: 'PATIENT',
            targetType: 'DOCTOR',
            targetId: doctor2.doctorProfile.id,
            rating: 5,
            comment: 'Dr. Arjun Patel explained everything clearly. Great neurologist!',
        },
    });

    await prisma.review.create({
        data: {
            reviewerId: patient3.id,
            reviewerRole: 'PATIENT',
            targetType: 'HOSPITAL',
            rating: 4,
            comment: 'Great hospital with modern facilities and friendly staff. Clean environment.',
        },
    });

    await prisma.review.create({
        data: {
            reviewerId: patient4.id,
            reviewerRole: 'PATIENT',
            targetType: 'DEPARTMENT',
            department: 'Cardiology',
            rating: 5,
            comment: 'The cardiology department is top-notch! Best treatment I have received.',
        },
    });

    await prisma.review.create({
        data: {
            reviewerId: patient5.id,
            reviewerRole: 'PATIENT',
            targetType: 'NURSE',
            targetId: nurse1.nurseProfile.id,
            rating: 5,
            comment: 'Kavita Singh was very kind and professional during my emergency visit.',
        },
    });

    // Create Notifications
    console.log('🔔 Creating notifications...');
    await prisma.notification.create({
        data: {
            userId: patient1.id,
            title: 'Appointment Confirmed',
            type: 'INFO',
            message: 'Your appointment with Dr. Priya Sharma is confirmed for January 15, 2025',
            link: '/dashboard/patient/appointments',
        },
    });

    await prisma.notification.create({
        data: {
            userId: patient2.id,
            title: 'Test Results Ready',
            type: 'SUCCESS',
            message: 'Your test results are ready. Please check your medical records.',
            link: '/dashboard/patient/records',
        },
    });

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('- 1 Admin (Rajesh Kumar)');
    console.log('- 3 Doctors (Priya Sharma, Arjun Patel, Anjali Reddy)');
    console.log('- 2 Nurses (Kavita Singh, Meera Desai)');
    console.log('- 5 Patients (Amit, Sneha, Rahul, Pooja, Vikram)');
    console.log('- 4 Appointments (January 2025)');
    console.log('- 5 Reviews');
    console.log('- 2 Notifications');
    console.log('\n🔑 Login Credentials (all use password: password123):');
    console.log('Admin: admin@hospital.com');
    console.log('Doctor: priya.sharma@hospital.com');
    console.log('Nurse: kavita.singh@hospital.com');
    console.log('Patient: amit.verma@email.com');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
