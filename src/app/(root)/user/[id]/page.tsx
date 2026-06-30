import User from '@/app/features/user/components/user';
import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';
import { redirect } from 'next/navigation';

export default async function UserPage() {
  const requiereUser = await sessionUser();

  if (!requiereUser) {
    redirect('/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: (await requiereUser).id,
    },
    include: {
      bookings: {
        include: {
          company: {
            select: {
              name: true,
              address: true,
              category: {
                select: {
                  label: true,
                  color: true,
                },
              },
            },
          },
          service: {
            select: {
              title: true,
              duration: true,
            },
          },
          staff: {
            select: {
              name: true,
              occupation: true,
              image: true,
            },
          },
        },
      },
    },
  });

  console.log(user);

  return (
    <div className='mx-auto py-16 max-w-3xl px-4'>
      <User user={user} />
    </div>
  );
}
