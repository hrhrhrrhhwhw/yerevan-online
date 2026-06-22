import { Header } from '@/components/marketing/header-navigation/header';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let user = null;
  let company = null;

  if (session?.user) {
    user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        company: {
          select: {
            slug: true,
          },
        },
      },
    });

    company = user?.company ?? null;
  }


  return (
    <main>
      <Header user={user} company={company} />
      {children}
    </main>
  );
}
