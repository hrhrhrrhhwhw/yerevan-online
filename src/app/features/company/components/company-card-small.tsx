import { Avatar } from '@/components/base/avatar/avatar';
import { Prisma } from '@/generated/prisma/client';
import Link from 'next/link';

type CompanyCardSmallProps = {
  company: Prisma.CompanyGetPayload<{
    select: {
      name: true;
      address: true;
      description: true;
      image: true;
      slug: true;
    };
  }>;
};

export default function CompanyCardSmall({ company }: CompanyCardSmallProps) {
  return (
    <Link href={`/${company.slug}`} className='flex items-center gap-2 p-2 bg-gray-50 rounded-4xl'>
      <Avatar size='lg' alt={company.image || ''} src={company.image} />
      <div className='flex flex-col'>
        <p className='text-lg font-semibold'>{company.name}</p>
        <span className='text-xs text-tertiary'>{company.address}</span>
      </div>
    </Link>
  );
}
