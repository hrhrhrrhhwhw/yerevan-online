'use server';

import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';
import { revalidatePath } from 'next/cache';

interface CreateServiceProps {
  title: string;
  description?: string;
  price: number;
  duration: number;
  staffIds: Array<string>;
}

export async function createService(data: CreateServiceProps) {
  try {
    const user = await sessionUser();

    const company = await prisma.company.findUnique({
      where: {
        ownerId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!company) {
      return {
        success: false,
        error: 'Компания не найдена',
      };
    }

    const service = await prisma.$transaction(async (tx) => {
      const service = await tx.service.create({
        data: {
          title: data.title,
          description: data.description,
          price: data.price,
          duration: data.duration,
          companyId: company.id,
        },
      });

      if (data.staffIds?.length) {
        await tx.serviceStaff.createMany({
          data: data.staffIds.map((staffId) => ({
            serviceId: service.id,
            staffId,
          })),
        });
      }

      return service;
    });

    revalidatePath('/dashboard/services');

    return {
      success: true,
      service,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Ошибка создания услуги',
    };
  }
}
