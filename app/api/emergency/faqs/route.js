import { NextResponse } from 'next/server';

export async function GET() {
    const faqs = [
        {
            id: 1,
            question: "When should I visit the Emergency Room?",
            answer: "You should visit the ER for life-threatening conditions such as chest pain, difficulty breathing, severe bleeding, stroke symptoms, severe burns, or major trauma. For minor issues, consider our outpatient clinics."
        },
        {
            id: 2,
            question: "What documents should I bring?",
            answer: "If possible, bring a valid ID, health insurance card, and any current medication lists. However, in a critical emergency, treatment is our first priority regardless of documentation."
        },
        {
            id: 3,
            question: "Do you accept health insurance?",
            answer: "Yes, we accept all major health insurance providers. Our billing desk will assist you with the cashless hospitalization process once the patient is stabilized."
        },
        {
            id: 4,
            question: "Is the ambulance service available 24/7?",
            answer: "Yes, our Advanced Life Support (ALS) ambulances are available 24/7 with trained paramedics. Call our emergency hotline 1066 for immediate dispatch."
        }
    ];

    return NextResponse.json(faqs);
}
