const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting medical records seeding...');

    // Fetch existing patients and doctors
    const patients = await prisma.patient.findMany();
    const doctors = await prisma.doctor.findMany();

    if (patients.length === 0) {
        console.log('❌ No patients found. Please seed patients first.');
        return;
    }

    if (doctors.length === 0) {
        console.log('❌ No doctors found. Please seed doctors first.');
        return;
    }

    console.log(`Found ${patients.length} patients and ${doctors.length} doctors.`);

    const recordTypes = ['Lab Report', 'Prescription', 'Diagnosis', 'X-Ray', 'MRI Scan', 'Discharge Summary'];
    const diagnoses = [
        'Acute Bronchitis', 'Hypertension', 'Type 2 Diabetes', 'Migraine', 'Fractured Tibia',
        'Viral Fever', 'Gastritis', 'Allergic Rhinitis', 'Sprained Ankle', 'Vitamin D Deficiency'
    ];

    let recordsCount = 0;

    // Create 2-5 records for each patient
    for (const patient of patients) {
        const numRecords = Math.floor(Math.random() * 4) + 2; // 2 to 5 records

        for (let i = 0; i < numRecords; i++) {
            const doctor = doctors[Math.floor(Math.random() * doctors.length)];
            const type = recordTypes[Math.floor(Math.random() * recordTypes.length)];
            const diagnosis = diagnoses[Math.floor(Math.random() * diagnoses.length)];

            // Random date within last 2 years
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 730));

            await prisma.medicalRecord.create({
                data: {
                    patientId: patient.id,
                    doctorId: doctor.id,
                    title: `${type} - ${diagnosis}`,
                    description: `Medical record for ${diagnosis} treatment.`,
                    type: type,
                    diagnosis: diagnosis,
                    treatment: `Standard protocol for ${diagnosis}. Rest and medication prescribed.`,
                    notes: 'Patient responded well to initial treatment.',
                    date: date,
                    attachments: {
                        files: [
                            {
                                name: `${type.toLowerCase().replace(' ', '-')}.pdf`,
                                url: 'https://example.com/dummy-report.pdf',
                                type: 'application/pdf'
                            }
                        ]
                    }
                }
            });
            recordsCount++;
        }
    }

    console.log(`✅ Successfully seeded ${recordsCount} medical records.`);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding medical records:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
