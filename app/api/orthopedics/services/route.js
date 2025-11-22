import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const services = await prisma.orthopedicService.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });

        // Transform database format to API format
        const formattedServices = services.map(service => ({
            id: service.serviceId,
            title: service.title,
            shortDesc: service.shortDesc,
            fullDesc: service.fullDesc,
            procedureSteps: service.procedureSteps,
            eligibility: service.eligibility,
            image: service.image
        }));

        return NextResponse.json(formattedServices);
    } catch (error) {
        console.error('Error fetching orthopedic services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}
