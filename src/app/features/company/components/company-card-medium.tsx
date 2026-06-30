import { Avatar } from '@/components/base/avatar/avatar';
import { Prisma } from '@/generated/prisma/client';
import Image from 'next/image';
import Link from 'next/link';

type CompanyCardMediumProps = {
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

export default function CompanyCardMedium({ company }: CompanyCardMediumProps) {
  return (
    <Link href={`/${company.slug}`} className='flex shrink-0 flex-col gap-2 p-2'>
      <Image src={company.image ?? ''} width={200} height={100} alt={company.name} className='rounded-lg object-cover' />
      <div className='flex flex-col'>
        <p className='text-lg font-semibold'>{company.name}</p>
        <span className='text-xs text-tertiary'>{company.address}</span>
      </div>
    </Link>
  );
}
