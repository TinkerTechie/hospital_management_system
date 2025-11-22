import { NextResponse } from 'next/server';

export async function GET() {
    const categories = [
        { id: 'cpr', title: 'CPR & Heart', icon: 'HeartPulse', color: 'rose' },
        { id: 'bleeding', title: 'Bleeding', icon: 'Droplet', color: 'red' },
        { id: 'burns', title: 'Burns', icon: 'Flame', color: 'orange' },
        { id: 'choking', title: 'Choking', icon: 'Wind', color: 'blue' },
        { id: 'fracture', title: 'Fractures', icon: 'Activity', color: 'slate' },
        { id: 'snakebite', title: 'Bites & Stings', icon: 'Bug', color: 'green' },
        { id: 'seizure', title: 'Seizures', icon: 'Zap', color: 'purple' },
        { id: 'heatstroke', title: 'Heat Stroke', icon: 'Flame', color: 'orange' },
        { id: 'shock', title: 'Shock', icon: 'AlertTriangle', color: 'yellow' },
    ];

    return NextResponse.json(categories);
}
