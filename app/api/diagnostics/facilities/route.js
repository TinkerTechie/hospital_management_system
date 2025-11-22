import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const facilities = await prisma.diagnosticFacility.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });

        const formattedFacilities = facilities.map(facility => ({
            id: facility.facilityId,
            name: facility.name,
            description: facility.description,
            image: facility.image
        }));

        return NextResponse.json(formattedFacilities);
    } catch (error) {
        console.error('Error fetching diagnostic facilities:', error);
        return NextResponse.json({ error: 'Failed to fetch facilities' }, { status: 500 });
    }
}
