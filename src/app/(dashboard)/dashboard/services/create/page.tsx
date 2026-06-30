import ServiceCreateForm from '@/app/features/services/components/service-create-form';
import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';

export default async function DashboardCreateService() {
  const user = await sessionUser();
  const company = await prisma.company.findUnique({
    where: {
      ownerId: user.id,
    },
    include: {
      staff: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!company) {
    return <div>Нет компании</div>;
  }
  return (
    <div className='mx-auto p-6 max-w-3xl md:w-3xl'>
      <ServiceCreateForm staff={company.staff} />
    </div>
  );
}
