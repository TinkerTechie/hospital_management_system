import EmergencySpecialtyTemplate from '../../components/EmergencySpecialtyTemplate';

const mentalHealthData = {
    specialty: "Mental Health & Psychiatry",
    hero: {
        badge: "Compassionate Mental Health Care",
        title: "Mental Health & Psychiatry",
        description: "Comprehensive mental health services including psychiatry, psychology, and counseling. We provide compassionate, evidence-based care for depression, anxiety, and other mental health conditions in a safe, supportive environment.",
        stats: [
            { value: "24/7", label: "Crisis Helpline" },
            { value: "100%", label: "Confidential Care" },
            { value: "15+", label: "Specialists" }
        ]
    },
    overview: {
        title: "Comprehensive Mental Health Services",
        description: "Our mental health department offers integrated care combining psychiatry, psychology, and therapeutic interventions. We treat a wide range of conditions including depression, anxiety, PTSD, bipolar disorder, schizophrenia, and addiction. Our team provides personalized treatment plans in a stigma-free environment.",
        features: [
            {
                title: "Psychiatric Evaluation",
                description: "Comprehensive assessment and diagnosis by board-certified psychiatrists"
            },
            {
                title: "Psychotherapy",
                description: "Individual, group, and family therapy sessions with licensed psychologists"
            },
            {
                title: "Medication Management",
                description: "Evidence-based pharmacological treatment with regular monitoring"
            },
            {
                title: "Crisis Intervention",
                description: "24/7 crisis support and emergency psychiatric care"
            }
        ]
    },
    team: [
        {
            name: "Dr. Anjali Mehta",
            role: "Chief Psychiatrist",
            qualification: "MD Psychiatry, DPM",
            specialty: "Mood Disorders & Depression"
        },
        {
            name: "Dr. Rahul Verma",
            role: "Clinical Psychologist",
            qualification: "PhD Clinical Psychology",
            specialty: "Anxiety & Trauma Therapy"
        },
        {
            name: "Dr. Sneha Kapoor",
            role: "Child Psychiatrist",
            qualification: "MD, Fellowship Child Psychiatry",
            specialty: "Pediatric Mental Health"
        }
    ],
    protocols: [
        {
            title: "Depression Treatment",
            description: "Comprehensive approach to major depressive disorder",
            steps: ["Assessment", "Therapy (CBT/IPT)", "Medication if needed", "Follow-up"]
        },
        {
            title: "Anxiety Management",
            description: "Evidence-based treatment for anxiety disorders",
            steps: ["Diagnosis", "Cognitive Behavioral Therapy", "Relaxation Techniques", "Medication Support"]
        },
        {
            title: "PTSD Care",
            description: "Trauma-focused therapy for post-traumatic stress",
            steps: ["Trauma Assessment", "EMDR/Exposure Therapy", "Coping Skills", "Long-term Support"]
        },
        {
            title: "Addiction Treatment",
            description: "Integrated substance abuse and mental health care",
            steps: ["Detoxification", "Counseling", "Relapse Prevention", "Support Groups"]
        }
    ],
    stories: [
        {
            name: "Anonymous Patient",
            location: "Mumbai",
            quote: "The psychiatry team helped me overcome severe depression. Their compassionate, non-judgmental approach made all the difference."
        },
        {
            name: "Anonymous Patient",
            location: "Delhi",
            quote: "After years of anxiety, I finally found relief through therapy and medication management. The team truly cares."
        },
        {
            name: "Anonymous Patient",
            location: "Bangalore",
            quote: "The crisis helpline saved my life. The immediate support and follow-up care gave me hope again."
        }
    ],
    faqs: [
        {
            question: "Is mental health treatment confidential?",
            answer: "Absolutely. All mental health consultations are 100% confidential and protected by medical privacy laws. Your information is never shared without your explicit consent."
        },
        {
            question: "Do I need a referral to see a psychiatrist?",
            answer: "No referral is needed. You can directly book an appointment with our psychiatry department. However, if you have insurance, check if they require a referral for coverage."
        },
        {
            question: "What's the difference between a psychiatrist and psychologist?",
            answer: "Psychiatrists are medical doctors who can prescribe medication and provide therapy. Psychologists have doctoral degrees in psychology and specialize in psychotherapy and counseling but cannot prescribe medication."
        },
        {
            question: "Is there a crisis helpline?",
            answer: "Yes, our 24/7 mental health crisis helpline is available at 1800-XXX-XXXX. Trained counselors provide immediate support for mental health emergencies."
        }
    ]
};

export default function MentalHealthPage() {
    return <EmergencySpecialtyTemplate {...mentalHealthData} />;
}
