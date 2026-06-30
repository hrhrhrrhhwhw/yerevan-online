import ServiceCard from '@/app/features/services/components/service-card';
import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';

export default async function DasboardServices() {
  const user = await sessionUser();
  const company = await prisma.company.findFirst({
    where: {
      ownerId: user.id,
    },
    include: {
      services: {
        select: {
          id: true,
          title: true,
          description: true,
          price: true,
          duration: true,
        },
      },
    },
  });

  console.log(company?.services, 'company?.services');

  if (!company) {
    return <div>Нет компании</div>;
  }
  return (
    <div className='mx-auto p-6 w-full'>
      <ServiceCard services={company.services} />
    </div>
  );
}
