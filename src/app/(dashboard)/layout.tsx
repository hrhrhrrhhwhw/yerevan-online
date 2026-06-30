import { Dashboard } from '@/components/dashboard';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex flex-col md:flex-row gap-2'>
      <Dashboard />
      {children}
    </main>
  );
}
