"use client"
import EmergencySpecialtyTemplate from '../../components/EmergencySpecialtyTemplate';

const burnData = {
    specialty: "Burn Care",
    hero: {
        badge: "Specialized Burn Unit",
        title: "Burn Care Center",
        description: "Comprehensive care for thermal, chemical, and electrical burns. Our specialized burn unit provides immediate treatment, advanced wound care, and long-term rehabilitation for burn patients.",
        stats: [
            { value: "24/7", label: "Burn Team Available" },
            { value: "95%", label: "Healing Success Rate" },
            { value: "<1 hour", label: "Treatment Start Time" }
        ]
    },
    overview: {
        title: "Advanced Burn Treatment",
        description: "Our burn center is equipped with specialized burn beds, hydrotherapy facilities, and a dedicated team of burn surgeons, plastic surgeons, and wound care specialists. We treat all degrees of burns, from minor to life-threatening, with evidence-based protocols designed to minimize scarring and maximize recovery.",
        features: [
            {
                title: "Burn Assessment",
                description: "Accurate calculation of burn percentage using Lund-Browder chart"
            },
            {
                title: "Fluid Resuscitation",
                description: "Parkland formula-based IV fluid therapy to prevent shock"
            },
            {
                title: "Wound Care",
                description: "Advanced dressings, debridement, and infection prevention"
            },
            {
                title: "Skin Grafting",
                description: "Surgical reconstruction for deep burns"
            }
        ]
    },
    team: [
        {
            name: "Dr. Arjun Malhotra",
            role: "Burn Surgeon",
            qualification: "MS, MCh Plastic Surgery",
            specialty: "Burn Reconstruction"
        },
        {
            name: "Dr. Nisha Gupta",
            role: "Wound Care Specialist",
            qualification: "MD, Fellowship in Burn Care",
            specialty: "Advanced Wound Management"
        },
        {
            name: "Nurse Ravi Kumar",
            role: "Burn Unit Coordinator",
            qualification: "RN, CCRN",
            specialty: "Burn Nursing"
        }
    ],
    protocols: [
        {
            title: "Initial Burn Assessment",
            description: "Comprehensive evaluation of burn severity",
            steps: ["Depth Assessment", "Percentage Calculation", "Airway Check", "Fluid Needs"]
        },
        {
            title: "Cooling Protocol",
            description: "Immediate burn cooling to limit damage",
            steps: ["Cool Water", "Remove Jewelry", "Cover Burn", "Pain Management"]
        },
        {
            title: "Escharotomy",
            description: "Emergency procedure for circumferential burns",
            steps: ["Assessment", "Incision", "Pressure Relief", "Dressing"]
        },
        {
            title: "Skin Grafting",
            description: "Surgical coverage of deep burns",
            steps: ["Debridement", "Graft Harvest", "Application", "Immobilization"]
        }
    ],
    stories: [
        {
            name: "Kiran Desai",
            location: "Ahmedabad",
            quote: "I suffered severe burns in a kitchen accident. The burn team's expertise and compassionate care helped me heal with minimal scarring."
        },
        {
            name: "Rajesh Nair",
            location: "Kochi",
            quote: "My son had electrical burns. The plastic surgeons did an amazing job. You can barely see the scars now."
        },
        {
            name: "Sunita Reddy",
            location: "Hyderabad",
            quote: "The burn unit saved my life after a chemical exposure. Their advanced wound care techniques were incredible."
        }
    ],
    faqs: [
        {
            question: "What should I do immediately after a burn?",
            answer: "Cool the burn with cool (not cold) running water for 10-20 minutes. Remove jewelry and tight clothing before swelling starts. Cover with a clean, dry cloth. Do NOT apply ice, butter, or ointments. Seek medical help immediately for large or deep burns."
        },
        {
            question: "How do you classify burn severity?",
            answer: "Burns are classified by depth: First-degree (superficial, red skin), Second-degree (blisters, partial thickness), Third-degree (full thickness, white/charred). We also assess the percentage of body surface area burned."
        },
        {
            question: "Will I need skin grafting?",
            answer: "Skin grafting is typically needed for deep second-degree and third-degree burns that won't heal on their own. Our burn surgeons will assess your specific case and discuss treatment options with you."
        },
        {
            question: "How long is recovery?",
            answer: "Recovery time varies based on burn severity. Minor burns may heal in 1-2 weeks, while major burns requiring grafting can take months. We provide comprehensive rehabilitation including physical therapy and scar management."
        }
    ]
};

export default function BurnCarePage() {
    return <EmergencySpecialtyTemplate {...burnData} />;
}
