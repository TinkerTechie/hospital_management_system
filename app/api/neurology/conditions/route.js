import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const conditions = await prisma.neurologyCondition.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });

        const formattedConditions = conditions.map(condition => ({
            id: condition.conditionId,
            name: condition.name,
            description: condition.description,
            symptoms: condition.symptoms,
            diagnosis: condition.diagnosis,
            treatment: condition.treatment,
            prevention: condition.prevention,
            image: condition.image
        }));

        return NextResponse.json(formattedConditions);
    } catch (error) {
        console.error('Error fetching neurology conditions:', error);
        return NextResponse.json({ error: 'Failed to fetch conditions' }, { status: 500 });
    }
}
