import EmergencySpecialtyTemplate from '../../components/EmergencySpecialtyTemplate';

const pediatricData = {
    specialty: "Pediatric Emergency",
    hero: {
        badge: "Child-Friendly ER",
        title: "Pediatric Emergency Care",
        description: "Specialized emergency care for children from newborns to adolescents. Our child-friendly ER is staffed by pediatric emergency physicians trained to handle medical emergencies unique to children.",
        stats: [
            { value: "0-18", label: "Years Age Range" },
            { value: "24/7", label: "Pediatric ER Physicians" },
            { value: "100%", label: "Child-Centered Care" }
        ]
    },
    overview: {
        title: "Expert Care for Young Patients",
        description: "Our Pediatric ER is designed specifically for children, with colorful, welcoming spaces, child-sized equipment, and a team trained in pediatric emergency medicine. We handle everything from high fevers and respiratory distress to injuries and poisonings, all while keeping your child comfortable and calm.",
        features: [
            {
                title: "Child Life Specialists",
                description: "Trained professionals to comfort and distract children during procedures"
            },
            {
                title: "Family-Centered Care",
                description: "Parents can stay with their child throughout treatment"
            },
            {
                title: "Pediatric Equipment",
                description: "Age-appropriate medical devices and child-sized treatment areas"
            },
            {
                title: "Specialized Triage",
                description: "Pediatric-specific assessment protocols and priority systems"
            }
        ]
    },
    team: [
        {
            name: "Dr. Sneha Patel",
            role: "Pediatric ER Director",
            qualification: "MD Pediatrics, FAAP",
            specialty: "Pediatric Emergency Medicine"
        },
        {
            name: "Dr. Rohit Sharma",
            role: "Pediatric Intensivist",
            qualification: "DM Pediatric Critical Care",
            specialty: "PICU Management"
        },
        {
            name: "Nurse Pooja Verma",
            role: "Pediatric Nurse Specialist",
            qualification: "RN, PALS, CPN",
            specialty: "Pediatric Trauma"
        }
    ],
    protocols: [
        {
            title: "Pediatric Assessment Triangle",
            description: "Rapid visual assessment of sick children",
            steps: ["Appearance", "Work of Breathing", "Circulation", "Intervention"]
        },
        {
            title: "Fever Management",
            description: "Evidence-based approach to pediatric fevers",
            steps: ["Temperature Check", "Age Assessment", "Source Identification", "Treatment"]
        },
        {
            title: "Respiratory Distress",
            description: "Management of breathing difficulties in children",
            steps: ["Oxygen Saturation", "Nebulization", "Steroids", "Ventilation Support"]
        },
        {
            title: "Pediatric Trauma",
            description: "Age-appropriate trauma care protocols",
            steps: ["Weight-Based Dosing", "Gentle Handling", "Family Presence", "Pain Management"]
        }
    ],
    stories: [
        {
            name: "Priya Menon",
            location: "Mumbai",
            quote: "My 3-year-old had a severe asthma attack. The pediatric team was so gentle and caring. They made her feel safe while saving her life."
        },
        {
            name: "Amit Kumar",
            location: "Delhi",
            quote: "Our son had a high fever and seizure. The doctors were calm, professional, and explained everything. He's perfectly fine now."
        },
        {
            name: "Deepa Iyer",
            location: "Chennai",
            quote: "The child life specialist made all the difference. My daughter was scared, but they turned it into a positive experience."
        }
    ],
    faqs: [
        {
            question: "When should I bring my child to the ER?",
            answer: "Bring your child immediately for difficulty breathing, severe allergic reactions, high fever in infants under 3 months, severe injuries, poisoning, seizures, severe dehydration, or any condition that concerns you as a parent."
        },
        {
            question: "Can I stay with my child?",
            answer: "Absolutely. We encourage parents to stay with their child throughout the entire visit. Family-centered care is a core principle of our pediatric ER."
        },
        {
            question: "How is pediatric care different from adult care?",
            answer: "Children are not small adults. They have unique physiology, different medication dosing, age-specific diseases, and special emotional needs. Our team is specifically trained in pediatric emergency medicine."
        },
        {
            question: "What if my child needs admission?",
            answer: "If your child needs to be admitted, we have a dedicated Pediatric ICU (PICU) and pediatric wards staffed 24/7 by pediatric specialists. The transition is seamless and coordinated."
        }
    ]
};

export default function PediatricERPage() {
    return <EmergencySpecialtyTemplate {...pediatricData} />;
}
