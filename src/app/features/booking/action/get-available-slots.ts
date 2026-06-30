'use server';

import { prisma } from '@/lib/prisma';

interface GetAvailableSlotsProps {
  staffId: string;
  serviceId: string;
  date: Date;
  duration: number;
}

export async function getAvailableSlots({ staffId, serviceId, duration, date }: GetAvailableSlotsProps) {
  const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

  const staff = await prisma.staff.findUnique({
    where: {
      id: staffId,
    },
    select: {
      startTime: true,
      endTime: true,

      staffSchedules: {
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
      },
    },
  });

  if (!staff) {
    return [];
  }

  const daySchedule = staff.staffSchedules[0];

  if (daySchedule?.isDayOff) {
    return [];
  }

  const startTime = daySchedule?.startTime ?? staff.startTime;

  const endTime = daySchedule?.endTime ?? staff.endTime;

  const [startHour, startMinute] = startTime.split(':').map(Number);

  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startOfDay = new Date(date);

  startOfDay.setHours(startHour, startMinute, 0, 0);

  const endOfDay = new Date(date);

  endOfDay.setHours(endHour, endMinute, 0, 0);

  if (startOfDay >= endOfDay) {
    return [];
  }

  const bookings = await prisma.booking.findMany({
    where: {
      staffId,

      startAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },

    select: {
      startAt: true,
      endAt: true,
    },
  });

  const slots: string[] = [];

  let current = new Date(startOfDay);

  while (current.getTime() + duration * 60000 <= endOfDay.getTime()) {
    const slotStart = new Date(current);

    const slotEnd = new Date(current.getTime() + duration * 60000);

    const isBusy = bookings.some((booking) => {
      return slotStart < booking.endAt && slotEnd > booking.startAt;
    });

    if (!isBusy) {
      slots.push(
        slotStart.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
    }

    current = new Date(current.getTime() + 30 * 60000);
  }

  return slots;
}
