import { NextResponse } from 'next/server';

export async function GET() {
    const services = [
        {
            id: 1,
            title: "Trauma & Accident",
            description: "Immediate care for severe injuries, fractures, and road accidents.",
            icon: "Ambulance",
            color: "red"
        },
        {
            id: 2,
            title: "Cardiac Emergency",
            description: "24/7 Cath Lab and expert cardiologists for heart attacks.",
            icon: "HeartPulse",
            color: "rose"
        },
        {
            id: 3,
            title: "Stroke Unit",
            description: "Rapid intervention for stroke patients to minimize brain damage.",
            icon: "Brain",
            color: "purple"
        },
        {
            id: 4,
            title: "Pediatric ER",
            description: "Specialized emergency care for infants and children.",
            icon: "Baby",
            color: "blue"
        },
        {
            id: 5,
            title: "Burn Care",
            description: "Advanced burn unit with sterile isolation and plastic surgery support.",
            icon: "Flame",
            color: "orange"
        },
        {
            id: 6,
            title: "Poisoning & Overdose",
            description: "Immediate toxicology support and antidote administration.",
            icon: "Skull",
            color: "gray"
        },
        {
            id: 7,
            title: "Respiratory Distress",
            description: "Advanced ventilator support for asthma attacks and respiratory failure.",
            icon: "Wind",
            color: "cyan"
        },
        {
            id: 8,
            title: "Disaster Management",
            description: "Preparedness for mass casualty incidents and natural disasters.",
            icon: "Siren",
            color: "slate"
        }
    ];

    return NextResponse.json(services);
}
