import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
    try {
        const packages = await prisma.diagnosticPackage.findMany({
            orderBy: {
                popular: 'desc'
            }
        });

        const formattedPackages = packages.map(pkg => ({
            id: pkg.packageId,
            name: pkg.name,
            description: pkg.description,
            tests: pkg.tests,
            price: pkg.price,
            discountPrice: pkg.discountPrice,
            popular: pkg.popular,
            image: pkg.image
        }));

        return NextResponse.json(formattedPackages);
    } catch (error) {
        console.error('Error fetching diagnostic packages:', error);
        return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
    }
}
