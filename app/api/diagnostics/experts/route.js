import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const experts = await prisma.diagnosticExpert.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });

        const formattedExperts = experts.map(expert => ({
            id: expert.expertId,
            name: expert.name,
            role: expert.role,
            specialization: expert.specialization,
            experience: expert.experience,
            certifications: expert.certifications,
            image: expert.image
        }));

        return NextResponse.json(formattedExperts);
    } catch (error) {
        console.error('Error fetching diagnostic experts:', error);
        return NextResponse.json({ error: 'Failed to fetch experts' }, { status: 500 });
    }
}
