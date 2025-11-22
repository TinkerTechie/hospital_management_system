import EmergencySpecialtyTemplate from '../../components/EmergencySpecialtyTemplate';

const respiratoryData = {
    specialty: "Respiratory Emergency",
    hero: {
        badge: "Pulmonary Critical Care",
        title: "Respiratory Distress Care",
        description: "Immediate treatment for breathing emergencies including asthma attacks, COPD exacerbations, pneumonia, and respiratory failure. Our pulmonary team provides life-saving respiratory support 24/7.",
        stats: [
            { value: "<5 min", label: "Oxygen Therapy Start" },
            { value: "24/7", label: "Ventilator Support" },
            { value: "96%", label: "Stabilization Rate" }
        ]
    },
    overview: {
        title: "Advanced Respiratory Care",
        description: "Our respiratory emergency unit is equipped with advanced ventilators, high-flow oxygen systems, and a team of pulmonologists and respiratory therapists available around the clock. We treat all types of breathing emergencies from asthma and COPD to pneumonia, pulmonary embolism, and acute respiratory distress syndrome (ARDS).",
        features: [
            {
                title: "Oxygen Therapy",
                description: "Multiple delivery systems from nasal cannula to high-flow oxygen"
            },
            {
                title: "Nebulization",
                description: "Bronchodilator and steroid treatments for airway obstruction"
            },
            {
                title: "Non-Invasive Ventilation",
                description: "BiPAP and CPAP to support breathing without intubation"
            },
            {
                title: "Mechanical Ventilation",
                description: "Advanced ventilator support for respiratory failure"
            }
        ]
    },
    team: [
        {
            name: "Dr. Ashok Kumar",
            role: "Pulmonologist",
            qualification: "DM Pulmonary Medicine",
            specialty: "Respiratory Critical Care"
        },
        {
            name: "Dr. Priya Nair",
            role: "Intensivist",
            qualification: "MD, FCCP",
            specialty: "Mechanical Ventilation"
        },
        {
            name: "Therapist Ravi Shankar",
            role: "Senior Respiratory Therapist",
            qualification: "RRT, CPFT",
            specialty: "Airway Management"
        }
    ],
    protocols: [
        {
            title: "Asthma Exacerbation",
            description: "Rapid treatment for severe asthma attacks",
            steps: ["Oxygen", "Bronchodilators", "Steroids", "Monitoring"]
        },
        {
            title: "COPD Crisis",
            description: "Management of acute COPD exacerbations",
            steps: ["Oxygen Titration", "Nebulization", "Antibiotics", "NIV Support"]
        },
        {
            title: "Respiratory Failure",
            description: "Advanced support for failing lungs",
            steps: ["Assessment", "Non-Invasive Ventilation", "Intubation", "Mechanical Ventilation"]
        },
        {
            title: "Pulmonary Embolism",
            description: "Emergency treatment for blood clots in lungs",
            steps: ["Oxygen", "Anticoagulation", "Thrombolysis", "Monitoring"]
        }
    ],
    stories: [
        {
            name: "Suresh Iyer",
            location: "Bangalore",
            quote: "I couldn't breathe during a severe asthma attack. The respiratory team got me breathing normally within minutes. They saved my life."
        },
        {
            name: "Lakshmi Reddy",
            location: "Visakhapatnam",
            quote: "My father has COPD. During a crisis, they put him on BiPAP and avoided intubation. The care was exceptional."
        },
        {
            name: "Vikram Singh",
            location: "Chandigarh",
            quote: "Pneumonia left me gasping for air. The pulmonologists and respiratory therapists were incredible. I'm breathing easy now."
        }
    ],
    faqs: [
        {
            question: "When is shortness of breath an emergency?",
            answer: "Seek immediate help if you have severe difficulty breathing, chest pain with breathing, blue lips or fingernails, confusion, or if you can't speak in full sentences. For known asthma/COPD patients, come in if your rescue inhaler isn't helping."
        },
        {
            question: "What is non-invasive ventilation?",
            answer: "Non-invasive ventilation (NIV) like BiPAP or CPAP delivers pressurized air through a mask to help you breathe without inserting a tube in your throat. It's often used for COPD, heart failure, and sleep apnea emergencies."
        },
        {
            question: "Will I need a breathing tube?",
            answer: "We try to avoid intubation when possible using oxygen therapy and non-invasive ventilation. However, if your breathing is severely compromised or you're unconscious, mechanical ventilation with a breathing tube may be necessary to save your life."
        },
        {
            question: "How long will I need oxygen?",
            answer: "The duration depends on your condition. Some patients need oxygen only during the acute phase, while others with chronic lung disease may need long-term oxygen therapy. Our pulmonologists will assess your specific needs."
        }
    ]
};

export default function RespiratoryPage() {
    return <EmergencySpecialtyTemplate {...respiratoryData} />;
}
