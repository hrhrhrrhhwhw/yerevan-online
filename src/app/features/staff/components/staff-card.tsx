import Link from 'next/link';
import { Avatar } from '@/components/base/avatar/avatar';
import { Prisma } from '@/generated/prisma/client';
import { Clock } from '@untitledui/icons/Clock';

type StaffCardProps = {
  staff: Prisma.StaffGetPayload<{
    select: {
      id: true;
      name: true;
      occupation: true;
      image: true;
      startTime: true;
      endTime: true;
    };
  }>;
  href?: string;
};

export default function StaffCard({ staff, href }: StaffCardProps) {
  const content = (
    <>
      <Avatar src={staff.image} alt={staff.name} size='lg' className='size-24 md:size-28' />
      <div className='flex flex-col items-center text-center justify-between'>
        <h3 className='text-lg font-semibold text-primary'>{staff.name}</h3>
        <p className='text-sm text-brand-secondary'>{staff.occupation}</p>
        <div className='flex items-center gap-1.5'>
          <Clock size={12} className='text-fg-quaternary' />
          <span className='text-xs font-medium text-tertiary'>
            {staff.startTime}:{staff.endTime}
          </span>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className='flex flex-col gap-2 items-center'>
        {content}
      </Link>
    );
  }

  return <div className='flex flex-col gap-2 items-center'>{content}</div>;
}
