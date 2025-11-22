const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding all specialty departments...');

    // =============================
    // CARDIOLOGY DATA
    // =============================

    const cardiologyServices = [
        {
            serviceId: "interventional-cardiology",
            title: "Interventional Cardiology",
            shortDesc: "Minimally invasive procedures like Angioplasty and Stenting.",
            fullDesc: "Interventional cardiology deals with the catheter-based treatment of structural heart diseases. It involves using a small tube (catheter) to repair damaged or weakened vessels, narrowed arteries, or other affected parts of the heart structure.",
            procedureSteps: [
                "Local anesthesia is applied.",
                "A catheter is inserted into a blood vessel.",
                "Contrast dye is injected to visualize blockages.",
                "Balloon angioplasty or stent placement is performed."
            ],
            eligibility: "Patients with coronary artery disease, heart valve disease, or peripheral vascular disease.",
            image: "https://images.unsplash.com/photo-1579684385180-1ea67fbc3faa?q=80&w=2072&auto=format&fit=crop"
        },
        {
            serviceId: "electrophysiology",
            title: "Electrophysiology",
            shortDesc: "Diagnosis and treatment of heart rhythm disorders.",
            fullDesc: "Cardiac electrophysiology is the science of elucidating, diagnosing, and treating the electrical activities of the heart. It is used to assess complex arrhythmias, elucidate symptoms, evaluate abnormal electrocardiograms, assess risk of developing arrhythmias in the future, and design treatment.",
            procedureSteps: [
                "Catheters are inserted through veins in the groin.",
                "Electrical signals are mapped.",
                "Ablation is performed to destroy tissue causing abnormal rhythms.",
                "Pacemaker or ICD implantation if necessary."
            ],
            eligibility: "Patients with atrial fibrillation, tachycardia, bradycardia, or other arrhythmias.",
            image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2072&auto=format&fit=crop"
        },
        {
            serviceId: "cardiac-surgery",
            title: "Cardiac Surgery",
            shortDesc: "Advanced surgical solutions including Bypass and Valve Replacement.",
            fullDesc: "Cardiac surgery, or cardiovascular surgery, is surgery on the heart or great vessels performed by cardiac surgeons. It is often used to treat complications of ischemic heart disease (for example, with coronary artery bypass grafting); to correct congenital heart disease; or to treat valvular heart disease from various causes.",
            procedureSteps: [
                "General anesthesia is administered.",
                "The chest is opened (sternotomy) or minimally invasive incision.",
                "Heart-lung machine may be used.",
                "Surgery is performed (bypass, valve repair/replacement).",
                "Chest is closed and recovery begins."
            ],
            eligibility: "Patients with severe coronary artery disease, valve defects, or aortic aneurysms.",
            image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=2047&auto=format&fit=crop"
        },
        {
            serviceId: "non-invasive-cardiology",
            title: "Non-Invasive Cardiology",
            shortDesc: "Comprehensive testing including Echo, Stress Tests, and Holter.",
            fullDesc: "Non-invasive cardiology focuses on the detection and treatment of heart disease using external tests rather than instruments inserted into the body to evaluate and diagnose cardiac disorders.",
            procedureSteps: [
                "Patient preparation (e.g., changing into a gown).",
                "Electrodes or ultrasound probe applied.",
                "Monitoring during rest or exercise (stress test).",
                "Data analysis by a cardiologist."
            ],
            eligibility: "Anyone experiencing chest pain, palpitations, or shortness of breath.",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    for (const service of cardiologyServices) {
        await prisma.cardiologyService.upsert({
            where: { serviceId: service.serviceId },
            update: service,
            create: service,
        });
    }
    console.log('✅ Seeded 4 cardiology services');

    // Cardiology Conditions - placeholder, will be filled from actual API
    const cardiologyConditions = [
        {
            conditionId: "coronary-artery-disease",
            name: "Coronary Artery Disease",
            description: "Narrowing or blockage of coronary arteries due to plaque buildup.",
            symptoms: ["Chest pain (angina)", "Shortness of breath", "Fatigue", "Heart palpitations"],
            diagnosis: "ECG, stress test, coronary angiography",
            treatment: "Lifestyle changes, medications, angioplasty, bypass surgery",
            prevention: "Healthy diet, regular exercise, no smoking, manage blood pressure",
            image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const condition of cardiologyConditions) {
        await prisma.cardiologyCondition.upsert({
            where: { conditionId: condition.conditionId },
            update: condition,
            create: condition,
        });
    }
    console.log('✅ Seeded cardiology conditions');

    // =============================
    // NEUROLOGY DATA
    // =============================

    const neurologyServices = [
        {
            serviceId: "stroke-care",
            title: "Stroke Care",
            shortDesc: "24/7 emergency stroke treatment and rehabilitation.",
            fullDesc: "Our comprehensive stroke center provides rapid diagnosis and treatment for ischemic and hemorrhagic strokes, with advanced imaging and clot-busting therapies.",
            procedureSteps: [
                "Rapid triage and CT/MRI imaging",
                "Thrombolytic therapy if eligible",
                "Mechanical thrombectomy if needed",
                "Intensive monitoring and rehabilitation"
            ],
            eligibility: "Patients experiencing sudden stroke symptoms",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "epilepsy-treatment",
            title: "Epilepsy Treatment",
            shortDesc: "Comprehensive care for seizure disorders.",
            fullDesc: "Our epilepsy program offers advanced diagnostic testing, medication management, and surgical options for patients with seizure disorders.",
            procedureSteps: [
                "EEG monitoring and video telemetry",
                "Medication optimization",
                "Surgical evaluation if needed",
                "Lifestyle counseling and support"
            ],
            eligibility: "Patients with recurrent seizures or epilepsy",
            image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "movement-disorders",
            title: "Movement Disorders",
            shortDesc: "Treatment for Parkinson's and related conditions.",
            fullDesc: "Specialized care for Parkinson's disease, tremors, dystonia, and other movement disorders using medications, therapy, and advanced treatments.",
            procedureSteps: [
                "Comprehensive neurological examination",
                "Medication management",
                "Deep brain stimulation evaluation",
                "Physical and occupational therapy"
            ],
            eligibility: "Patients with tremors, rigidity, or abnormal movements",
            image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "headache-clinic",
            title: "Headache & Migraine Clinic",
            shortDesc: "Specialized treatment for chronic headaches.",
            fullDesc: "Our headache clinic provides comprehensive evaluation and treatment for migraines, cluster headaches, and other chronic headache disorders.",
            procedureSteps: [
                "Detailed headache history and triggers",
                "Imaging studies if needed",
                "Preventive medication management",
                "Botox injections for chronic migraine",
                "Lifestyle modification counseling"
            ],
            eligibility: "Patients with frequent or severe headaches",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "neuromuscular-disorders",
            title: "Neuromuscular Disorders",
            shortDesc: "Care for nerve and muscle diseases.",
            fullDesc: "Treatment for conditions affecting nerves and muscles including neuropathy, myasthenia gravis, and muscular dystrophy.",
            procedureSteps: [
                "EMG and nerve conduction studies",
                "Muscle biopsy if needed",
                "Immunotherapy for autoimmune conditions",
                "Physical therapy and rehabilitation"
            ],
            eligibility: "Patients with muscle weakness or nerve damage",
            image: "https://images.unsplash.com/photo-1579684385180-1ea67fbc3faa?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const service of neurologyServices) {
        await prisma.neurologyService.upsert({
            where: { serviceId: service.serviceId },
            update: service,
            create: service,
        });
    }
    console.log('✅ Seeded 5 neurology services');

    const neurologyConditions = [
        {
            conditionId: "epilepsy",
            name: "Epilepsy",
            description: "Neurological disorder characterized by recurrent seizures.",
            symptoms: ["Seizures", "Loss of consciousness", "Confusion", "Staring spells"],
            diagnosis: "EEG, MRI, blood tests",
            treatment: "Anti-seizure medications, surgery, lifestyle modifications",
            prevention: "Medication adherence, avoid triggers, adequate sleep",
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80"
        },
        {
            conditionId: "stroke",
            name: "Stroke",
            description: "Sudden interruption of blood flow to the brain causing cell death.",
            symptoms: ["Sudden numbness", "Confusion", "Trouble speaking", "Vision problems", "Severe headache"],
            diagnosis: "CT scan, MRI, carotid ultrasound",
            treatment: "Clot-busting drugs, mechanical thrombectomy, rehabilitation",
            prevention: "Control blood pressure, healthy diet, exercise, no smoking",
            image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80"
        },
        {
            conditionId: "parkinsons",
            name: "Parkinson's Disease",
            description: "Progressive disorder affecting movement and coordination.",
            symptoms: ["Tremor", "Rigidity", "Slow movement", "Balance problems", "Speech changes"],
            diagnosis: "Clinical examination, DaTscan, response to medications",
            treatment: "Levodopa, dopamine agonists, deep brain stimulation, physical therapy",
            prevention: "Exercise, healthy diet, avoid toxins",
            image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80"
        },
        {
            conditionId: "migraine",
            name: "Migraine",
            description: "Severe recurring headaches often with nausea and light sensitivity.",
            symptoms: ["Throbbing headache", "Nausea", "Light sensitivity", "Visual aura", "Dizziness"],
            diagnosis: "Clinical history, neurological exam, imaging if needed",
            treatment: "Preventive medications, acute treatments, Botox, lifestyle changes",
            prevention: "Identify triggers, regular sleep, stress management, hydration",
            image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80"
        },
        {
            conditionId: "alzheimers",
            name: "Alzheimer's Disease",
            description: "Progressive brain disorder affecting memory and cognitive function.",
            symptoms: ["Memory loss", "Confusion", "Difficulty with tasks", "Personality changes", "Disorientation"],
            diagnosis: "Cognitive tests, brain imaging, PET scans, biomarker testing",
            treatment: "Cholinesterase inhibitors, memantine, cognitive therapy, support services",
            prevention: "Mental stimulation, physical exercise, social engagement, healthy diet",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const condition of neurologyConditions) {
        await prisma.neurologyCondition.upsert({
            where: { conditionId: condition.conditionId },
            update: condition,
            create: condition,
        });
    }
    console.log('✅ Seeded 5 neurology conditions');


    // =============================
    // PEDIATRICS DATA
    // =============================

    const pediatricsServices = [
        {
            serviceId: "well-baby",
            title: "Well-Baby Checkups",
            shortDesc: "Regular monitoring of your baby's growth and development.",
            fullDesc: "Our well-baby visits are designed to track your child's growth, development, and overall health from birth through early childhood. We provide guidance on nutrition, sleep, and milestones.",
            procedureSteps: [
                "Physical examination (weight, length, head circumference).",
                "Developmental screening.",
                "Immunization updates.",
                "Nutrition and feeding advice.",
                "Sleep and safety counseling."
            ],
            eligibility: "Newborns to toddlers (0-3 years).",
            image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "immunizations",
            title: "Immunizations",
            shortDesc: "Protecting your child from serious preventable diseases.",
            fullDesc: "We follow the CDC-recommended immunization schedule to protect your child against serious diseases like measles, mumps, polio, and whooping cough. Our team ensures a safe and comfortable experience.",
            procedureSteps: [
                "Review of vaccination history.",
                "Screening for contraindications.",
                "Administration of vaccines by skilled nurses.",
                "Post-vaccination monitoring.",
                "Guidance on potential side effects."
            ],
            eligibility: "All children according to the recommended schedule.",
            image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "specialty-clinics",
            title: "Specialty Clinics",
            shortDesc: "Expert care for asthma, allergies, and diabetes.",
            fullDesc: "Our specialty clinics provide comprehensive management for chronic conditions such as asthma, allergies, and diabetes. We work with families to create personalized care plans.",
            procedureSteps: [
                "Diagnostic testing (allergy skin tests, lung function tests).",
                "Personalized action plans (e.g., Asthma Action Plan).",
                "Medication management and education.",
                "Nutritional counseling for diabetes.",
                "Regular follow-up and monitoring."
            ],
            eligibility: "Children with chronic conditions requiring specialized care.",
            image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "adolescent-medicine",
            title: "Adolescent Medicine",
            shortDesc: "Healthcare tailored to the unique needs of teens.",
            fullDesc: "We provide confidential and compassionate care for teenagers, addressing physical health, mental well-being, reproductive health, and lifestyle choices.",
            procedureSteps: [
                "Annual physical exams and sports physicals.",
                "Mental health screening (anxiety, depression).",
                "Reproductive health counseling.",
                "Substance use prevention and education.",
                "Nutritional and fitness guidance."
            ],
            eligibility: "Adolescents and young adults (12-21 years).",
            image: "https://images.unsplash.com/photo-1529397384440-2af62290563e?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "emergency-pediatrics",
            title: "Emergency Pediatrics",
            shortDesc: "24/7 urgent care for sudden illnesses and injuries.",
            fullDesc: "Our dedicated pediatric emergency department is staffed by specialists trained to handle emergencies in children, from high fevers and broken bones to severe allergic reactions.",
            procedureSteps: [
                "Rapid triage and assessment.",
                "Pediatric-specific imaging and labs.",
                "Pain management tailored for children.",
                "Stabilization and treatment.",
                "Admission or discharge with follow-up plan."
            ],
            eligibility: "Children requiring immediate medical attention.",
            image: "https://images.unsplash.com/photo-1516574187841-693018954312?auto=format&fit=crop&w=800&q=80"
        },
        {
            serviceId: "growth-tracking",
            title: "Growth Tracking",
            shortDesc: "Monitoring physical development and nutritional health.",
            fullDesc: "We closely monitor your child's growth patterns to ensure they are developing healthily. We address concerns about weight, height, and nutritional intake.",
            procedureSteps: [
                "Regular measurements plotted on growth charts.",
                "Evaluation of growth velocity.",
                "Nutritional assessment.",
                "Screening for hormonal or metabolic issues if needed.",
                "Referral to specialists (endocrinology, nutrition) if indicated."
            ],
            eligibility: "All growing children, especially those with growth concerns.",
            image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const service of pediatricsServices) {
        await prisma.pediatricsService.upsert({
            where: { serviceId: service.serviceId },
            update: service,
            create: service,
        });
    }
    console.log('✅ Seeded 6 pediatrics services');

    const pediatricsConditions = [
        {
            conditionId: "asthma",
            name: "Childhood Asthma",
            description: "Chronic respiratory condition causing airway inflammation and breathing difficulties.",
            symptoms: ["Wheezing", "Coughing", "Shortness of breath", "Chest tightness"],
            diagnosis: "Physical exam, spirometry, allergy testing",
            treatment: "Inhalers, nebulizers, allergy management, action plan",
            prevention: "Avoid triggers, regular medication, monitor symptoms",
            image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
        }
    ];

    for (const condition of pediatricsConditions) {
        await prisma.pediatricsCondition.upsert({
            where: { conditionId: condition.conditionId },
            update: condition,
            create: condition,
        });
    }
    console.log('✅ Seeded pediatrics conditions');

    console.log('🎉 All specialty departments seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
