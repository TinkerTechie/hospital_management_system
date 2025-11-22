const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding diagnostics data...');

    // =============================
    // DIAGNOSTIC SERVICES
    // =============================

    const diagnosticServices = [
        {
            serviceId: "complete-blood-count",
            name: "Complete Blood Count (CBC)",
            category: "Blood Tests",
            description: "Comprehensive blood test measuring red cells, white cells, platelets, hemoglobin, and hematocrit.",
            price: 500,
            duration: "4-6 hours",
            preparation: ["Fasting not required", "Avoid strenuous exercise before test", "Stay hydrated"],
            image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "lipid-profile",
            name: "Lipid Profile",
            category: "Blood Tests",
            description: "Measures cholesterol levels including HDL, LDL, triglycerides, and total cholesterol.",
            price: 800,
            duration: "Same day",
            preparation: ["12-hour fasting required", "No alcohol 24 hours before", "Take regular medications"],
            image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "hba1c-diabetes",
            name: "HbA1c (Diabetes Test)",
            category: "Blood Tests",
            description: "Measures average blood sugar levels over past 2-3 months for diabetes monitoring.",
            price: 600,
            duration: "4-6 hours",
            preparation: ["No fasting required", "Continue regular medications", "Normal diet allowed"],
            image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "thyroid-function",
            name: "Thyroid Function Test (TFT)",
            category: "Blood Tests",
            description: "Checks thyroid hormone levels (T3, T4, TSH) to assess thyroid function.",
            price: 700,
            duration: "Same day",
            preparation: ["Morning sample preferred", "No fasting required", "Inform about thyroid medications"],
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "x-ray",
            name: "X-Ray",
            category: "Radiology",
            description: "Digital X-ray imaging for bones, chest, abdomen, and other body parts.",
            price: 400,
            duration: "Immediate",
            preparation: ["Remove metal objects", "Wear comfortable clothing", "Inform if pregnant"],
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "ultrasound",
            name: "Ultrasound Scan",
            category: "Radiology",
            description: "Non-invasive imaging using sound waves for abdomen, pelvis, pregnancy, and soft tissues.",
            price: 1200,
            duration: "30-45 minutes",
            preparation: ["Full bladder for pelvic scan", "Fasting for abdominal scan", "Wear loose clothing"],
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "ct-scan",
            name: "CT Scan",
            category: "Radiology",
            description: "Advanced computed tomography for detailed cross-sectional images of body structures.",
            price: 3500,
            duration: "1-2 hours",
            preparation: ["Fasting 4-6 hours before", "Remove metal objects", "Inform about allergies"],
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "mri-scan",
            name: "MRI Scan",
            category: "Radiology",
            description: "Magnetic resonance imaging for detailed soft tissue, brain, spine, and joint imaging.",
            price: 5000,
            duration: "45-90 minutes",
            preparation: ["Remove all metal objects", "Inform about implants/pacemakers", "Fasting for abdominal MRI"],
            image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "urine-analysis",
            name: "Urine Analysis",
            category: "Pathology",
            description: "Complete urine examination for kidney function, infections, and metabolic disorders.",
            price: 300,
            duration: "4-6 hours",
            preparation: ["First morning sample preferred", "Clean catch method", "Avoid contamination"],
            image: "https://images.unsplash.com/photo-1579684385180-1ea67fbc3faa?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "liver-function",
            name: "Liver Function Test (LFT)",
            category: "Blood Tests",
            description: "Measures liver enzymes and proteins to assess liver health and function.",
            price: 650,
            duration: "Same day",
            preparation: ["8-hour fasting recommended", "Avoid alcohol 24 hours before", "Normal water intake"],
            image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "kidney-function",
            name: "Kidney Function Test (KFT)",
            category: "Blood Tests",
            description: "Evaluates kidney health through creatinine, urea, and electrolyte measurements.",
            price: 600,
            duration: "Same day",
            preparation: ["No special preparation", "Stay hydrated", "Inform about medications"],
            image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "covid-rtpcr",
            name: "COVID-19 RT-PCR Test",
            category: "Pandemic Tests",
            description: "Gold standard molecular test for detecting active COVID-19 infection.",
            price: 800,
            duration: "24 hours",
            preparation: ["No eating/drinking 30 min before", "Nasal swab collection", "Wear mask"],
            image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const service of diagnosticServices) {
        await prisma.diagnosticService.upsert({
            where: { serviceId: service.serviceId },
            update: service,
            create: service,
        });
    }
    console.log('✅ Seeded 12 diagnostic services');

    // =============================
    // DIAGNOSTIC PACKAGES
    // =============================

    const diagnosticPackages = [
        {
            packageId: "executive-health-check",
            name: "Executive Health Checkup",
            description: "Comprehensive health screening for busy professionals covering all major organs and systems.",
            tests: [
                "Complete Blood Count",
                "Lipid Profile",
                "Liver Function Test",
                "Kidney Function Test",
                "Thyroid Function Test",
                "HbA1c",
                "Chest X-Ray",
                "ECG",
                "Urine Analysis"
            ],
            price: 5000,
            discountPrice: 3999,
            popular: true,
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
        },
        {
            packageId: "diabetes-screening",
            name: "Diabetes Screening Package",
            description: "Complete diabetes assessment and monitoring package for early detection and management.",
            tests: [
                "Fasting Blood Sugar",
                "Post-Prandial Blood Sugar",
                "HbA1c",
                "Lipid Profile",
                "Kidney Function Test",
                "Urine Analysis"
            ],
            price: 2500,
            discountPrice: 1999,
            popular: true,
            image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80"
        },
        {
            packageId: "heart-health-package",
            name: "Heart Health Package",
            description: "Comprehensive cardiac screening to assess heart health and cardiovascular risk.",
            tests: [
                "Lipid Profile",
                "ECG",
                "2D Echo",
                "Stress Test",
                "Complete Blood Count",
                "Blood Pressure Monitoring"
            ],
            price: 4000,
            discountPrice: 3199,
            popular: true,
            image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80"
        },
        {
            packageId: "pregnancy-profile",
            name: "Pregnancy Profile",
            description: "Essential tests for healthy pregnancy monitoring and fetal development.",
            tests: [
                "Complete Blood Count",
                "Blood Group & Rh",
                "Thyroid Function Test",
                "Blood Sugar",
                "Urine Analysis",
                "Ultrasound Scan",
                "HIV & Hepatitis Screening"
            ],
            price: 3500,
            discountPrice: 2799,
            popular: false,
            image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80"
        },
        {
            packageId: "kids-wellness",
            name: "Kids Wellness Package",
            description: "Comprehensive health checkup designed specifically for children aged 5-15 years.",
            tests: [
                "Complete Blood Count",
                "Hemoglobin",
                "Vitamin D",
                "Calcium",
                "Growth Assessment",
                "Vision & Hearing Test"
            ],
            price: 2000,
            discountPrice: 1599,
            popular: false,
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
        },
        {
            packageId: "senior-citizen-package",
            name: "Senior Citizen Health Package",
            description: "Tailored health screening for elderly covering age-related health concerns.",
            tests: [
                "Complete Blood Count",
                "Lipid Profile",
                "Diabetes Screening",
                "Kidney Function Test",
                "Liver Function Test",
                "Thyroid Test",
                "Bone Density Scan",
                "ECG",
                "Chest X-Ray"
            ],
            price: 4500,
            discountPrice: 3599,
            popular: false,
            image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const pkg of diagnosticPackages) {
        await prisma.diagnosticPackage.upsert({
            where: { packageId: pkg.packageId },
            update: pkg,
            create: pkg,
        });
    }
    console.log('✅ Seeded 6 diagnostic packages');

    // =============================
    // DIAGNOSTIC EXPERTS
    // =============================

    const diagnosticExperts = [
        {
            expertId: "dr-meera-sharma",
            name: "Dr. Meera Sharma",
            role: "Chief Pathologist",
            specialization: "Clinical Pathology",
            experience: "15+ years",
            certifications: ["MD Pathology", "MBBS", "Fellow of Indian Academy of Pathology"],
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
        },
        {
            expertId: "dr-rajesh-kumar",
            name: "Dr. Rajesh Kumar",
            role: "Senior Radiologist",
            specialization: "Diagnostic Radiology",
            experience: "12+ years",
            certifications: ["MD Radiology", "MBBS", "FRCR"],
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80"
        },
        {
            expertId: "ms-priya-patel",
            name: "Ms. Priya Patel",
            role: "Lab Technician",
            specialization: "Clinical Laboratory Science",
            experience: "8+ years",
            certifications: ["BSc Medical Lab Technology", "Certified Lab Technician"],
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=80"
        },
        {
            expertId: "dr-amit-verma",
            name: "Dr. Amit Verma",
            role: "Microbiologist",
            specialization: "Clinical Microbiology",
            experience: "10+ years",
            certifications: ["PhD Microbiology", "MSc Microbiology"],
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const expert of diagnosticExperts) {
        await prisma.diagnosticExpert.upsert({
            where: { expertId: expert.expertId },
            update: expert,
            create: expert,
        });
    }
    console.log('✅ Seeded 4 diagnostic experts');

    // =============================
    // DIAGNOSTIC FACILITIES
    // =============================

    const diagnosticFacilities = [
        {
            facilityId: "modern-lab",
            name: "Modern Laboratory",
            description: "State-of-the-art automated analyzers and equipment for accurate results",
            image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
        },
        {
            facilityId: "radiology-suite",
            name: "Advanced Radiology Suite",
            description: "Latest MRI, CT, and X-ray machines with digital imaging technology",
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
        },
        {
            facilityId: "sample-collection",
            name: "Comfortable Sample Collection Area",
            description: "Clean, hygienic, and patient-friendly sample collection rooms",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
        },
        {
            facilityId: "waiting-area",
            name: "Spacious Waiting Area",
            description: "Air-conditioned waiting lounge with comfortable seating and refreshments",
            image: "https://images.unsplash.com/photo-1519494080410-f9aa76cb4283?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const facility of diagnosticFacilities) {
        await prisma.diagnosticFacility.upsert({
            where: { facilityId: facility.facilityId },
            update: facility,
            create: facility,
        });
    }
    console.log('✅ Seeded 4 diagnostic facilities');

    console.log('🎉 Diagnostics data seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
