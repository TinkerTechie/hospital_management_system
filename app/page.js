import HomeClient from './HomeClient';

// Prevent static generation
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return <HomeClient />;
}
