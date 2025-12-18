import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { DashboardHeader, ListingsSection } from '@/components/admin/dashboard';

export default async function AdminDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <ListingsSection />
    </div>
  );
}
