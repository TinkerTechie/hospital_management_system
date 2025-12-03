import EmergencyClient from './EmergencyClient';

// Prevent static generation
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function EmergencyPage() {
    return <EmergencyClient />;
}
