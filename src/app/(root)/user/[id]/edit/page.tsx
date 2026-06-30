import UserEditForm from '@/app/features/user/components/user-edit';
import { prisma } from '@/lib/prisma';

export default async function DashboardUserEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      lastName: true,
      image: true,
      phone: true,
    },
  });

  if (!user) return <div>Пользователь не найден</div>;

  return (
    <div className='mx-auto p-6 max-w-3xl md:w-3xl'>
      <UserEditForm user={user} />
    </div>
  );
}
