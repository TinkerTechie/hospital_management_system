import EmergencySpecialtyTemplate from '../../components/EmergencySpecialtyTemplate';

const poisoningData = {
    specialty: "Poisoning & Overdose",
    hero: {
        badge: "Toxicology Center",
        title: "Poisoning & Overdose Care",
        description: "Expert treatment for poisoning, drug overdoses, and toxic exposures. Our toxicology team provides rapid assessment, antidote administration, and life-saving interventions 24/7.",
        stats: [
            { value: "24/7", label: "Poison Control Access" },
            { value: "<20 min", label: "Antidote Administration" },
            { value: "98%", label: "Recovery Rate" }
        ]
    },
    overview: {
        title: "Comprehensive Toxicology Services",
        description: "Our toxicology center is equipped to handle all types of poisoning including medication overdoses, chemical exposures, snake bites, food poisoning, and carbon monoxide poisoning. We have immediate access to a wide range of antidotes and advanced treatment modalities including hemodialysis and hemoperfusion.",
        features: [
            {
                title: "Rapid Toxicology Screening",
                description: "Quick identification of toxic substances in blood and urine"
            },
            {
                title: "Antidote Availability",
                description: "Comprehensive stock of antidotes for common and rare poisonings"
            },
            {
                title: "Gastric Decontamination",
                description: "Activated charcoal, gastric lavage when indicated"
            },
            {
                title: "Dialysis Ready",
                description: "Emergency hemodialysis for severe toxic ingestions"
            }
        ]
    },
    team: [
        {
            name: "Dr. Sanjay Verma",
            role: "Medical Toxicologist",
            qualification: "MD, Fellowship in Toxicology",
            specialty: "Poison Management"
        },
        {
            name: "Dr. Meera Joshi",
            role: "Emergency Physician",
            qualification: "MD Emergency Medicine",
            specialty: "Overdose Treatment"
        },
        {
            name: "Nurse Arun Patel",
            role: "Toxicology Nurse",
            qualification: "RN, ACLS",
            specialty: "Poison Control"
        }
    ],
    protocols: [
        {
            title: "ABCD Approach",
            description: "Systematic assessment of poisoned patients",
            steps: ["Airway", "Breathing", "Circulation", "Decontamination"]
        },
        {
            title: "Antidote Administration",
            description: "Specific antidotes for common poisonings",
            steps: ["Identify Toxin", "Dose Calculation", "Administration", "Monitoring"]
        },
        {
            title: "Gastric Decontamination",
            description: "Removal of ingested poisons",
            steps: ["Activated Charcoal", "Gastric Lavage", "Whole Bowel Irrigation", "Assessment"]
        },
        {
            title: "Enhanced Elimination",
            description: "Accelerating toxin removal from the body",
            steps: ["Hemodialysis", "Hemoperfusion", "Urinary Alkalinization", "Monitoring"]
        }
    ],
    stories: [
        {
            name: "Kavita Sharma",
            location: "Jaipur",
            quote: "My child accidentally swallowed cleaning solution. The toxicology team acted immediately and saved his life. Forever grateful."
        },
        {
            name: "Rahul Mehta",
            location: "Indore",
            quote: "I had a severe drug overdose. The doctors administered the antidote quickly and monitored me closely. They gave me a second chance."
        },
        {
            name: "Anita Desai",
            location: "Surat",
            quote: "Snake bite in a rural area - they airlifted me here. The anti-venom and expert care saved my leg and my life."
        }
    ],
    faqs: [
        {
            question: "What should I do if someone is poisoned?",
            answer: "Call 1066 immediately. If the person is unconscious or having trouble breathing, start CPR if trained. Do NOT induce vomiting unless instructed by medical professionals. Bring the poison container or substance with you to the hospital."
        },
        {
            question: "How do you identify the poison?",
            answer: "We use a combination of patient history, physical examination, toxicology screening tests, and sometimes analysis of the suspected substance. Bringing the container or knowing the substance name helps tremendously."
        },
        {
            question: "What is activated charcoal?",
            answer: "Activated charcoal is a black powder that binds to many poisons in the stomach, preventing absorption. It's most effective when given within 1-2 hours of ingestion. Not all poisons can be treated with charcoal."
        },
        {
            question: "Will I need dialysis?",
            answer: "Dialysis is reserved for severe poisonings with certain substances like methanol, ethylene glycol, lithium, or salicylates. Our toxicologists will determine if it's necessary based on your specific case."
        }
    ]
};

export default function PoisoningPage() {
    return <EmergencySpecialtyTemplate {...poisoningData} />;
}
