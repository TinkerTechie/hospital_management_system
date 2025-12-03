const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Starting appointment seeding...");

    // 1. Find the first Doctor
    const doctor = await prisma.doctor.findFirst();
    if (!doctor) {
        console.error("No doctor found. Please create a doctor first.");
        return;
    }
    console.log(`Seeding appointments for Doctor: ${doctor.fullName} (${doctor.id})`);

    // 2. Find or Create Patients
    let patients = await prisma.patient.findMany({
        where: { doctorId: doctor.id },
        take: 5
    });

    if (patients.length === 0) {
        console.log("No patients found. Creating sample patients...");
        // Create a few patients if none exist
        for (let i = 1; i <= 3; i++) {
            const user = await prisma.user.create({
                data: {
                    name: `Test Patient ${i}`,
                    email: `testpatient${i}@example.com`,
                    password: "password123",
                    role: "PATIENT"
                }
            });
            const patient = await prisma.patient.create({
                data: {
                    userId: user.id,
                    fullName: user.name,
                    age: 20 + i * 5,
                    doctorId: doctor.id,
                    medicalHistory: "Seeded patient",
                    assignedWard: "General"
                }
            });
            patients.push(patient);
        }
    }

    // 3. Create Appointments
    const appointmentTypes = ["General Checkup", "Follow-up", "Consultation", "Emergency"];
    const statuses = ["Upcoming", "Completed", "Cancelled"];

    const today = new Date();

    // Create 10 appointments
    for (let i = 0; i < 10; i++) {
        const patient = patients[i % patients.length];
        const daysOffset = i - 3; // Some past, some future
        const date = new Date(today);
        date.setDate(today.getDate() + daysOffset);
        date.setHours(9 + i, 0, 0, 0); // 9 AM onwards

        // Determine status based on date for consistency with our API logic
        // Past = Completed, Future = Upcoming
        // We can also manually set some to verify logic
        let status = date < today ? "Completed" : "Upcoming";

        await prisma.appointment.create({
            data: {
                patientId: patient.id,
                doctorId: doctor.id,
                appointmentDate: date,
                time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                reason: appointmentTypes[i % appointmentTypes.length],
                city: "New York",
                email: "test@example.com",
                phone: "123-456-7890",
            }
        });
        console.log(`Created appointment for ${patient.fullName} on ${date.toDateString()}`);
    }

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
