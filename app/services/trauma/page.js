import EmergencySpecialtyTemplate from '../../components/EmergencySpecialtyTemplate';

const traumaData = {
    specialty: "Trauma & Accident Care",
    hero: {
        badge: "Level 1 Trauma Center",
        title: "Trauma & Accident Care",
        description: "Our Level 1 Trauma Center provides immediate, life-saving care for severe injuries 24/7. With a dedicated team of trauma surgeons, we're equipped to handle the most critical cases.",
        stats: [
            { value: "<10 min", label: "Average Response Time" },
            { value: "98%", label: "Survival Rate" },
            { value: "24/7", label: "Trauma Team Ready" }
        ]
    },
    overview: {
        title: "Comprehensive Trauma Care",
        description: "Our trauma center is staffed by board-certified trauma surgeons, emergency physicians, and specialized nurses trained in advanced trauma life support. We handle everything from motor vehicle accidents to falls, penetrating injuries, and multi-system trauma.",
        features: [
            {
                title: "Golden Hour Protocol",
                description: "Rapid assessment and treatment within the critical first hour"
            },
            {
                title: "Advanced Imaging",
                description: "CT, MRI, and X-ray available 24/7 for immediate diagnosis"
            },
            {
                title: "Surgical Readiness",
                description: "Operating rooms on standby with trauma-trained surgical teams"
            },
            {
                title: "ICU Integration",
                description: "Seamless transfer to intensive care for post-operative monitoring"
            }
        ]
    },
    team: [
        {
            name: "Dr. Rajesh Kumar",
            role: "Chief of Trauma Surgery",
            qualification: "MD, FACS",
            specialty: "Polytrauma & Critical Care"
        },
        {
            name: "Dr. Priya Sharma",
            role: "Trauma Surgeon",
            qualification: "MS, DNB",
            specialty: "Orthopedic Trauma"
        },
        {
            name: "Nurse Anita Desai",
            role: "Trauma Coordinator",
            qualification: "RN, TNCC",
            specialty: "Emergency Nursing"
        }
    ],
    protocols: [
        {
            title: "Primary Survey (ABCDE)",
            description: "Systematic assessment of life-threatening conditions",
            steps: ["Airway", "Breathing", "Circulation", "Disability", "Exposure"]
        },
        {
            title: "Rapid Triage System",
            description: "Color-coded priority system for mass casualties",
            steps: ["Red: Immediate", "Yellow: Urgent", "Green: Delayed", "Black: Deceased"]
        },
        {
            title: "Hemorrhage Control",
            description: "Advanced techniques to stop severe bleeding",
            steps: ["Tourniquet", "Pressure", "Hemostatic Agents", "Surgery"]
        },
        {
            title: "Spinal Immobilization",
            description: "Protecting the spine in suspected injuries",
            steps: ["C-Collar", "Backboard", "Log Roll", "Imaging"]
        }
    ],
    stories: [
        {
            name: "Vikram Malhotra",
            location: "Mumbai",
            quote: "After a severe motorcycle accident, the trauma team saved my life. Their quick response and expert care got me back on my feet."
        },
        {
            name: "Sunita Reddy",
            location: "Bangalore",
            quote: "My husband was in a critical condition after a fall. The trauma surgeons worked miracles. Forever grateful."
        },
        {
            name: "Arjun Patel",
            location: "Delhi",
            quote: "The golden hour protocol saved my son's life. The team's coordination was incredible during our darkest hour."
        }
    ],
    faqs: [
        {
            question: "What qualifies as a trauma emergency?",
            answer: "Trauma emergencies include severe injuries from accidents, falls from height, penetrating injuries (gunshot, stab wounds), major burns, crush injuries, and any life-threatening injury requiring immediate surgical intervention."
        },
        {
            question: "How quickly will I be seen?",
            answer: "Trauma patients are triaged immediately upon arrival. Critical cases are seen within minutes, with the trauma team activated before you even arrive if emergency services notify us in advance."
        },
        {
            question: "Do you accept all insurance?",
            answer: "Yes, we accept all major insurance plans. However, in life-threatening emergencies, treatment begins immediately regardless of insurance status. Our financial counselors will work with you on payment arrangements."
        },
        {
            question: "Can family members stay with the patient?",
            answer: "During initial resuscitation, family members wait in our dedicated trauma family room. Once the patient is stabilized, limited visitation is allowed in the ICU or recovery area."
        }
    ]
};

export default function TraumaPage() {
    return <EmergencySpecialtyTemplate {...traumaData} />;
}
