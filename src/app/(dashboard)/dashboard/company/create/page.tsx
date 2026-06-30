import CompanyCreateForm from '@/app/features/company/components/company-create-form';
import { prisma } from '@/lib/prisma';

export default async function DashboardCompanyCreate() {
  const categories = await prisma.category.findMany();
  return (
    <div className='mx-auto p-6 w-full md:w-3xl'>
      <CompanyCreateForm categories={categories} />
    </div>
  );
}
