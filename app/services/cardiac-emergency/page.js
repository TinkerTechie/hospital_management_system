import EmergencySpecialtyTemplate from '../../components/EmergencySpecialtyTemplate';

const cardiacData = {
    specialty: "Cardiac Emergency",
    hero: {
        badge: "Cardiac Care Excellence",
        title: "Cardiac Emergency Care",
        description: "Immediate, expert care for heart attacks, cardiac arrest, and life-threatening arrhythmias. Our cardiac emergency team provides rapid intervention to save lives and minimize heart damage.",
        stats: [
            { value: "<30 min", label: "Door-to-Balloon Time" },
            { value: "24/7", label: "Cath Lab Availability" },
            { value: "95%", label: "Success Rate" }
        ]
    },
    overview: {
        title: "Advanced Cardiac Emergency Services",
        description: "Our cardiac emergency unit is equipped with state-of-the-art technology including a 24/7 cardiac catheterization lab, advanced ECG monitoring, and a dedicated cardiac ICU. We specialize in rapid diagnosis and treatment of acute myocardial infarction, unstable angina, and cardiac arrhythmias.",
        features: [
            {
                title: "Rapid ECG Analysis",
                description: "12-lead ECG within 10 minutes of arrival for immediate diagnosis"
            },
            {
                title: "24/7 Cath Lab",
                description: "Emergency angioplasty and stenting available round the clock"
            },
            {
                title: "STEMI Protocol",
                description: "Streamlined care pathway for ST-elevation myocardial infarction"
            },
            {
                title: "Cardiac ICU",
                description: "Specialized intensive care for post-procedure monitoring"
            }
        ]
    },
    team: [
        {
            name: "Dr. Anil Mehta",
            role: "Interventional Cardiologist",
            qualification: "DM Cardiology, FSCAI",
            specialty: "Emergency Angioplasty"
        },
        {
            name: "Dr. Kavita Singh",
            role: "Cardiac Electrophysiologist",
            qualification: "DM Cardiology",
            specialty: "Arrhythmia Management"
        },
        {
            name: "Nurse Ramesh Kumar",
            role: "CCU Head Nurse",
            qualification: "RN, ACLS, CCRN",
            specialty: "Critical Cardiac Care"
        }
    ],
    protocols: [
        {
            title: "STEMI Activation",
            description: "Rapid response for ST-elevation heart attacks",
            steps: ["ECG Analysis", "Cath Lab Alert", "Aspirin/Antiplatelet", "Angioplasty"]
        },
        {
            title: "Cardiac Arrest Protocol",
            description: "Advanced cardiac life support procedures",
            steps: ["CPR", "Defibrillation", "Medications", "Post-Resuscitation Care"]
        },
        {
            title: "Arrhythmia Management",
            description: "Treatment for dangerous heart rhythms",
            steps: ["Rhythm Analysis", "Cardioversion", "Antiarrhythmic Drugs", "Monitoring"]
        },
        {
            title: "Acute Heart Failure",
            description: "Stabilization of decompensated heart failure",
            steps: ["Oxygen Therapy", "Diuretics", "Vasodilators", "Hemodynamic Support"]
        }
    ],
    stories: [
        {
            name: "Ramesh Gupta",
            location: "Chennai",
            quote: "I had a massive heart attack. The team performed angioplasty within 20 minutes. They literally gave me a second chance at life."
        },
        {
            name: "Meena Iyer",
            location: "Hyderabad",
            quote: "My father's cardiac arrest was handled with such precision. The doctors and nurses are true heroes."
        },
        {
            name: "Suresh Nair",
            location: "Kochi",
            quote: "The cardiac emergency team saved my life. Their quick action and expertise made all the difference."
        }
    ],
    faqs: [
        {
            question: "What are the warning signs of a heart attack?",
            answer: "Common signs include chest pain or discomfort, shortness of breath, pain radiating to the arm/jaw/back, nausea, cold sweat, and lightheadedness. If you experience these symptoms, call 1066 immediately."
        },
        {
            question: "How quickly should I get to the hospital?",
            answer: "Time is muscle. Every minute counts during a heart attack. Call 1066 immediately - don't drive yourself. Our ambulance team can start treatment en route and alert the cardiac team before arrival."
        },
        {
            question: "What is door-to-balloon time?",
            answer: "It's the time from when you arrive at the hospital to when we open the blocked artery with angioplasty. Our average is under 30 minutes, well below the recommended 90-minute guideline."
        },
        {
            question: "Will I need surgery?",
            answer: "Not all cardiac emergencies require surgery. Many can be treated with medications or minimally invasive procedures like angioplasty. Our cardiologists will determine the best treatment based on your specific condition."
        }
    ]
};

export default function CardiacEmergencyPage() {
    return <EmergencySpecialtyTemplate {...cardiacData} />;
}
