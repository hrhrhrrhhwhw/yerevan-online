import CompanyDeleteButton from '@/app/features/company/components/company-delete-button';
import { Badge } from '@/components/base/badges/badges';
import { prisma } from '@/lib/prisma';

export default async function DashboardDeleteCompany() {
  const company = await prisma.company.findFirst({
    include: {
      category: true,
    },
  });

  if (!company) return <div>Нет компании</div>;
  return (
    <div className='mx-auto p-6 w-full md:w-3xl'>
      <div className='flex flex-col gap-8'>
        <Badge color='error' size='lg'>
          Удаление компании
        </Badge>

        <p className='mt-4 text-lg text-tertiary md:mt-6 md:text-xl'>Это действие нельзя отменить. Все данные компании будут удалены.</p>

        <CompanyDeleteButton />
      </div>
    </div>
  );
}
