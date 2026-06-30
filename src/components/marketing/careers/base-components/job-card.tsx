'use client';

import { Clock, MarkerPin02 } from '@untitledui/icons';
import { BadgeWithDot } from '@/components/base/badges/badges';
import { Prisma } from '@/generated/prisma/client';
import { BadgeColors } from '@/components/base/badges/badge-types';

type UserBookingInfoProps = Prisma.BookingGetPayload<{
  include: {
    company: {
      select: {
        name: true;
        address: true;
        category: {
          select: {
            label: true;
            color: true;
          };
        };
      };
    };
    service: {
      select: {
        title: true;
        duration: true;
      };
    };
    staff: {
      select: {
        name: true;
        occupation: true;
        image: true;
      };
    };
  };
}>;

export const UserBookingInfo = (booking: UserBookingInfoProps) => {
  const date = booking.startAt.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className='relative flex flex-col rounded-xs py-6 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-4'>
      <div className='absolute top-0 h-px w-full border-t border-secondary'></div>
      <div className='flex flex-col items-start gap-2 md:flex-row md:items-center'>
        <h3 className='text-md font-semibold text-primary'>{booking.company.name}</h3>
        <BadgeWithDot color={booking.company.category.color as BadgeColors} size='md' type='pill-color'>
          {booking.company.category.label}
        </BadgeWithDot>
      </div>
      <p className='mt-4 text-lg text-tertiary md:mt-5 md:text-xl'>{booking.service.title}</p>
      <div className='mt-5 flex gap-4'>
        <div className='flex items-center gap-1.5'>
          <MarkerPin02 size={20} className='text-fg-quaternary' />
          <span className='text-sm font-medium text-tertiary'>{booking.company.address}</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <Clock size={20} className='text-fg-quaternary' />
          <span className='text-sm font-medium text-tertiary'>{date}</span>
        </div>
      </div>
    </div>
  );
};
