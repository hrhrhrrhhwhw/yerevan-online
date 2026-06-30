'use server';

import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';

interface CreateBookingProps {
  name: string;
  phone: string;
  staffId: string;
  serviceId: string;
  startAt: Date;
  endAt: Date;
}

export async function createBooking(data: CreateBookingProps) {
  try {
    const user = await sessionUser();
    const staff = await prisma.staff.findUnique({
      where: {
        id: data.staffId,
      },
      include: {
        company: true,
      },
    });

    if (!staff) {
      return {
        success: false,
        error: 'Сотрудник не найден',
      };
    }

    const service = await prisma.service.findUnique({
      where: {
        id: data.serviceId,
      },
    });

    if (!service) {
      return {
        success: false,
        error: 'Услуга не найдена',
      };
    }

    const conflict = await prisma.booking.findFirst({
      where: {
        staffId: data.staffId,
        startAt: {
          lt: data.endAt,
        },
        endAt: {
          gt: data.startAt,
        },
      },
    });

    if (conflict) {
      return {
        success: false,
        error: 'Это время уже занято',
      };
    }

    const booking = await prisma.booking.create({
      data: {
        name: data.name,
        phone: data.phone,
        staffId: data.staffId,
        serviceId: data.serviceId,
        companyId: staff.companyId,
        startAt: data.startAt,
        endAt: data.endAt,
        price: service.price,
        ...(user && {
          userId: user.id,
        }),
      },
    });

    return {
      success: true as const,
      booking,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: 'Ошибка создания записи',
    };
  }
}
