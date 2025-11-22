import EmergencySpecialtyTemplate from '../../components/EmergencySpecialtyTemplate';

const disasterData = {
    specialty: "Disaster Management",
    hero: {
        badge: "Emergency Preparedness",
        title: "Disaster Management",
        description: "Coordinated response to mass casualty incidents, natural disasters, and public health emergencies. Our disaster management team is trained to handle surge capacity and provide care during crises.",
        stats: [
            { value: "500+", label: "Surge Capacity Beds" },
            { value: "24/7", label: "Command Center Active" },
            { value: "100+", label: "Trained Responders" }
        ]
    },
    overview: {
        title: "Comprehensive Disaster Response",
        description: "Our hospital is designated as a disaster receiving center with specialized protocols for mass casualty incidents, natural disasters, pandemics, and terrorist attacks. We maintain stockpiles of medical supplies, have decontamination facilities, and conduct regular disaster drills to ensure readiness.",
        features: [
            {
                title: "Incident Command System",
                description: "Structured coordination of disaster response efforts"
            },
            {
                title: "Triage System",
                description: "START triage for rapid patient sorting during mass casualties"
            },
            {
                title: "Decontamination",
                description: "Chemical, biological, and radiological decontamination facilities"
            },
            {
                title: "Surge Capacity",
                description: "Ability to expand bed capacity by 300% during emergencies"
            }
        ]
    },
    team: [
        {
            name: "Dr. Ramesh Gupta",
            role: "Disaster Coordinator",
            qualification: "MD, MPH",
            specialty: "Emergency Preparedness"
        },
        {
            name: "Col. Vijay Kumar",
            role: "Incident Commander",
            qualification: "MBBS, Military Medicine",
            specialty: "Mass Casualty Management"
        },
        {
            name: "Nurse Sunita Rao",
            role: "Triage Officer",
            qualification: "RN, TNCC, DISASTER",
            specialty: "Field Triage"
        }
    ],
    protocols: [
        {
            title: "START Triage",
            description: "Simple Triage And Rapid Treatment for mass casualties",
            steps: ["Respirations", "Perfusion", "Mental Status", "Tag Assignment"]
        },
        {
            title: "Incident Command",
            description: "Structured disaster response coordination",
            steps: ["Activation", "Command Post", "Resource Allocation", "Communication"]
        },
        {
            title: "Decontamination",
            description: "Removal of hazardous materials from patients",
            steps: ["Isolation", "Undressing", "Washing", "Medical Treatment"]
        },
        {
            title: "Surge Response",
            description: "Rapid expansion of hospital capacity",
            steps: ["Staff Recall", "Bed Expansion", "Supply Mobilization", "Patient Flow"]
        }
    ],
    stories: [
        {
            name: "Dr. Anil Mehta",
            location: "Mumbai",
            quote: "During the floods, this hospital became a beacon of hope. The disaster team coordinated rescue and treatment for hundreds of patients."
        },
        {
            name: "Paramedic Rajesh Kumar",
            location: "Delhi",
            quote: "I've worked with this disaster team during multiple emergencies. Their preparedness and coordination are world-class."
        },
        {
            name: "Volunteer Neha Sharma",
            location: "Pune",
            quote: "The pandemic response was incredible. They set up isolation wards, managed surge capacity, and saved countless lives."
        }
    ],
    faqs: [
        {
            question: "What types of disasters do you prepare for?",
            answer: "We prepare for natural disasters (earthquakes, floods, cyclones), mass casualty incidents (accidents, building collapses), pandemics, chemical/biological/radiological emergencies, and terrorist attacks. Our plans are all-hazards based."
        },
        {
            question: "How do you handle mass casualties?",
            answer: "We use the START triage system to quickly sort patients by severity. Our incident command system coordinates resources, and we can expand capacity by converting regular wards into emergency treatment areas."
        },
        {
            question: "Do you have decontamination facilities?",
            answer: "Yes, we have dedicated decontamination showers for chemical, biological, and radiological exposures. Contaminated patients are decontaminated before entering the main hospital to protect staff and other patients."
        },
        {
            question: "How can I help during a disaster?",
            answer: "We maintain a volunteer registry for trained medical professionals and community volunteers. During disasters, we activate this registry. You can register through our emergency preparedness office."
        }
    ]
};

export default function DisasterPage() {
    return <EmergencySpecialtyTemplate {...disasterData} />;
}
