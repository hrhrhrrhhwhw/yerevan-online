import { Prisma } from '@/generated/prisma/client';

export type UserBooking = Prisma.BookingGetPayload<{
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
