import SearchInput from '@/components/search-input';
import { prisma } from '@/lib/prisma';
import CompanyCardSmall from '../features/company/components/company-card-small';
import CompanyCardMedium from '../features/company/components/company-card-medium';

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;

  const companies = await prisma.company.findMany({
    where: {
      OR: [
        {
          name: {
            contains: q,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: q,
            mode: 'insensitive',
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      address: true,
      description: true,
      image: true,
      slug: true,
    },
  });

  const oneWeekAgo = new Date();

  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const companyNewset = await prisma.company.findMany({
    where: {
      createdAt: {
        gte: oneWeekAgo,
      },
    },
    select: {
      id: true,
      name: true,
      address: true,
      description: true,
      image: true,
      slug: true,
    },
  });

  return (
    <div className='mx-auto p-6 max-w-3xl md:w-3xl'>
      <h2 className='text-center mb-3 text-display-xs font-semibold text-bg-brand-section'>Онлайн-запись в Ереване</h2>
      <div className='mb-5'>
        <SearchInput />
      </div>
      <div className='flex flex-col gap-2 mb-5'>
        {companies.map((company) => (
          <CompanyCardSmall key={company.id} company={company} />
        ))}
      </div>
      <p className='text-base font-semibold text-bg-brand-section'>Новые компании</p>
      <div className='flex gap-4 overflow-x-auto pb-4 '>
        {companyNewset.map((company) => (
          <CompanyCardMedium key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
