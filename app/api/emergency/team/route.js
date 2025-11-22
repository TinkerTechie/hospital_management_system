import { NextResponse } from 'next/server';

export async function GET() {
    const team = [
        {
            id: 1,
            name: "Dr. Rajesh Kumar",
            role: "Head of Emergency Medicine",
            qualification: "MD, FACEM",
            image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&size=400&background=dc2626&color=fff&bold=true",
            specialty: "Trauma Specialist"
        },
        {
            id: 2,
            name: "Dr. Priya Sharma",
            role: "Senior ER Consultant",
            qualification: "MBBS, MEM",
            image: "https://ui-avatars.com/api/?name=Priya+Sharma&size=400&background=dc2626&color=fff&bold=true",
            specialty: "Cardiac Emergencies"
        },
        {
            id: 3,
            name: "Dr. Amit Singh",
            role: "Trauma Surgeon",
            qualification: "MS, MCh",
            image: "https://ui-avatars.com/api/?name=Amit+Singh&size=400&background=dc2626&color=fff&bold=true",
            specialty: "Surgical Critical Care"
        },
        {
            id: 4,
            name: "Nurse Anjali Desai",
            role: "Head Nurse - ER",
            qualification: "BSc Nursing, ACLS Certified",
            image: "https://ui-avatars.com/api/?name=Anjali+Desai&size=400&background=dc2626&color=fff&bold=true",
            specialty: "Triage & Critical Care"
        }
    ];

    return NextResponse.json(team);
}
