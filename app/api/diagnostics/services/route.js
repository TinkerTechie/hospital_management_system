import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const services = await prisma.diagnosticService.findMany({
            orderBy: {
                category: 'asc'
            }
        });

        const formattedServices = services.map(service => ({
            id: service.serviceId,
            name: service.name,
            category: service.category,
            description: service.description,
            price: service.price,
            duration: service.duration,
            preparation: service.preparation,
            image: service.image
        }));

        return NextResponse.json(formattedServices);
    } catch (error) {
        console.error('Error fetching diagnostic services:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}
