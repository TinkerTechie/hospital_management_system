import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const resources = await prisma.orthopedicResource.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });

        // Transform database format to API format
        const formattedResources = resources.map(resource => ({
            id: resource.resourceId,
            title: resource.title,
            icon: resource.icon,
            color: resource.color,
            description: resource.description,
            content: resource.content,
            videoUrl: resource.videoUrl
        }));

        return NextResponse.json(formattedResources);
    } catch (error) {
        console.error('Error fetching orthopedic resources:', error);
        return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
    }
}
