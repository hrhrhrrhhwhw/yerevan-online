import User from '@/components/user';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/session/session-user';
import { redirect } from 'next/navigation';

export default async function UserPage() {
  const sessionUser = requireUser();

  if (!sessionUser) {
    redirect('/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: (await sessionUser).id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      lastName: true,
      phone: true,
      image: true,
      company: {
        select: {
          slug: true,
        },
      },
    },
  });

  console.log(user)

  return (
    <div className='mx-auto py-16 max-w-3xl px-4'>
      <User user={user} />
    </div>
  );
}
