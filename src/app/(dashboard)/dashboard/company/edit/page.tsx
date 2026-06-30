import CompanyEditForm from '@/app/features/company/components/company-edit-form';
import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';

export default async function DashboardCompanyEdit() {
  const user = await sessionUser();
  const company = await prisma.company.findFirst({
    where: {
      ownerId: user.id,
    },
    include: {
      category: true,
    },
  });

  const categories = await prisma.category.findMany();

  if (!company) {
    return <div>Нет компании</div>;
  }

  return (
    <div className='mx-auto p-6 w-full md:w-3xl'>
      <CompanyEditForm company={company} categories={categories} />
    </div>
  );
}
