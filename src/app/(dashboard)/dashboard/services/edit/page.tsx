import ServiceEditForm from '@/app/features/services/components/service-edit-form';
import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';

export default async function DashboardEditService() {
  const user = await sessionUser();

  const company = await prisma.company.findUnique({
    where: {
      ownerId: user.id,
    },
    include: {
      services: {
        include: {
          serviceStaffs: {
            select: {
              staffId: true,
            },
          },
        },
      },
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
    <div className='mx-auto p-6 w-full'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-y-20 gap-x-5'>
        {company.services.map((service) => (
          <ServiceEditForm key={service.id} service={service} staff={company.staff} />
        ))}
      </div>
    </div>
  );
}
