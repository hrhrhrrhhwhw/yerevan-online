import CompanyCard from '@/app/features/company/components/company-card';
import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';

export default async function DashboardCompany() {
  const user = await sessionUser();

  const company = await prisma.company.findUnique({
    where: {
      ownerId: user.id,
    },
    include: {
      category: true,
    },
  });

  if (!company) {
    return <div>Нет компании</div>;
  }

  return (
    <div className='mx-auto p-6 max-w-3xl md:w-3xl'>
      <CompanyCard company={company} />
    </div>
  );
}
