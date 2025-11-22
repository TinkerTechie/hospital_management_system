import { NextResponse } from 'next/server';

export async function GET() {
    const testimonials = [
        {
            id: 1,
            name: "Vikram Malhotra",
            location: "Mumbai",
            quote: "The speed at which the ER team responded to my father's heart attack was incredible. They saved his life.",
            image: "https://placehold.co/100x100/111827/FFFFFF?text=VM"
        },
        {
            id: 2,
            name: "Sneha Patel",
            location: "Pune",
            quote: "I was rushed in after a severe road accident. The trauma care was world-class, and the nurses were so supportive.",
            image: "https://placehold.co/100x100/111827/FFFFFF?text=SP"
        },
        {
            id: 3,
            name: "Rahul Gupta",
            location: "Delhi",
            quote: "Pediatric ER handled my son's asthma attack with such care. They kept us calm and acted fast.",
            image: "https://placehold.co/100x100/111827/FFFFFF?text=RG"
        }
    ];

    return NextResponse.json(testimonials);
}
