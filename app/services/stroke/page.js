import EmergencySpecialtyTemplate from '../../components/EmergencySpecialtyTemplate';

const strokeData = {
    specialty: "Stroke Care",
    hero: {
        badge: "Certified Stroke Center",
        title: "Stroke Unit",
        description: "Time-critical care for stroke patients. Our certified stroke unit provides rapid diagnosis and treatment to minimize brain damage and maximize recovery potential.",
        stats: [
            { value: "<15 min", label: "Door-to-CT Time" },
            { value: "24/7", label: "Stroke Team Ready" },
            { value: "90%", label: "Recovery Rate" }
        ]
    },
    overview: {
        title: "Comprehensive Stroke Care",
        description: "Our stroke unit is equipped with advanced neuroimaging, a dedicated stroke team available 24/7, and immediate access to clot-busting therapy. We treat both ischemic and hemorrhagic strokes with evidence-based protocols designed to save brain tissue and improve outcomes.",
        features: [
            {
                title: "FAST Assessment",
                description: "Rapid stroke recognition using Face-Arms-Speech-Time protocol"
            },
            {
                title: "Advanced Neuroimaging",
                description: "CT and MRI available 24/7 for immediate stroke diagnosis"
            },
            {
                title: "Thrombolysis Ready",
                description: "tPA clot-busting therapy administered within the golden window"
            },
            {
                title: "Neuro ICU",
                description: "Specialized intensive care for stroke patients"
            }
        ]
    },
    team: [
        {
            name: "Dr. Neha Kapoor",
            role: "Stroke Neurologist",
            qualification: "DM Neurology",
            specialty: "Acute Stroke Management"
        },
        {
            name: "Dr. Vikram Rao",
            role: "Neurosurgeon",
            qualification: "MCh Neurosurgery",
            specialty: "Hemorrhagic Stroke"
        },
        {
            name: "Nurse Lakshmi Nair",
            role: "Stroke Coordinator",
            qualification: "RN, SCRN",
            specialty: "Stroke Rehabilitation"
        }
    ],
    protocols: [
        {
            title: "FAST Protocol",
            description: "Rapid stroke identification and activation",
            steps: ["Face Drooping", "Arm Weakness", "Speech Difficulty", "Time to Call"]
        },
        {
            title: "Thrombolytic Therapy",
            description: "Clot-busting treatment for ischemic stroke",
            steps: ["CT Scan", "Eligibility Check", "tPA Administration", "Monitoring"]
        },
        {
            title: "Hemorrhagic Stroke Care",
            description: "Management of bleeding in the brain",
            steps: ["Blood Pressure Control", "Reversal Agents", "Neurosurgery", "ICU Care"]
        },
        {
            title: "Post-Stroke Rehabilitation",
            description: "Early mobilization and recovery support",
            steps: ["Physical Therapy", "Speech Therapy", "Occupational Therapy", "Follow-up"]
        }
    ],
    stories: [
        {
            name: "Rajiv Malhotra",
            location: "Pune",
            quote: "The stroke team acted so fast. Within minutes of arrival, I was getting treatment. I've made a full recovery thanks to them."
        },
        {
            name: "Anjali Deshmukh",
            location: "Nagpur",
            quote: "My mother had a severe stroke. The neurologists saved her life and helped her regain her speech and movement."
        },
        {
            name: "Karthik Reddy",
            location: "Bangalore",
            quote: "Time is brain - they kept saying that. Their quick action minimized the damage. I'm walking and talking normally now."
        }
    ],
    faqs: [
        {
            question: "What are the signs of a stroke?",
            answer: "Remember FAST: Face drooping on one side, Arm weakness or numbness, Speech difficulty or slurred speech, Time to call 1066 immediately. Other signs include sudden confusion, trouble seeing, severe headache, or loss of balance."
        },
        {
            question: "How quickly must treatment begin?",
            answer: "For ischemic stroke, clot-busting therapy (tPA) must be given within 4.5 hours of symptom onset, ideally within 3 hours. The sooner treatment begins, the better the outcome. That's why we say 'time is brain.'"
        },
        {
            question: "What is the difference between ischemic and hemorrhagic stroke?",
            answer: "Ischemic stroke (80% of cases) is caused by a blood clot blocking an artery. Hemorrhagic stroke is caused by bleeding in the brain. Treatment differs significantly, which is why rapid CT imaging is crucial."
        },
        {
            question: "What happens after emergency treatment?",
            answer: "After stabilization, patients are monitored in our Neuro ICU. We begin rehabilitation early, often within 24 hours. Our multidisciplinary team includes physical, occupational, and speech therapists to maximize recovery."
        }
    ]
};

export default function StrokePage() {
    return <EmergencySpecialtyTemplate {...strokeData} />;
}
