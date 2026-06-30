import { UserBookingInfo } from '@/components/marketing/careers/base-components/job-card';
import { Prisma } from '@/generated/prisma/client';

type UserBookingsTabsProps = {
  bookings: Prisma.BookingGetPayload<{
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
  }>[];
};

export default function UserBookingsTabs({ bookings }: UserBookingsTabsProps) {
  return (
    <div className='mt-6'>
      <p className='text-sm font-semibold text-brand-secondary md:text-md mb-6'>Мои записи</p>

      <div className='flex flex-col'>
        {bookings.map((booking) => (
          <UserBookingInfo key={booking.id} {...booking} />
        ))}
      </div>
    </div>
  );
}
