'use server';

import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';
import { revalidatePath } from 'next/cache';

interface DeleteServiceProps {
  id: string;
}

export async function deleteService(data: DeleteServiceProps) {
  try {
    const user = await sessionUser();

    const service = await prisma.service.findUnique({
      where: {
        id: data.id,
      },
      include: {
        company: true,
      },
    });

    if (!service) {
      return {
        success: false,
        error: 'Услуга не найдена',
      };
    }

    if (service.company.ownerId !== user.id) {
      return {
        success: false,
        error: 'Нет доступа',
      };
    }

    await prisma.serviceStaff.deleteMany({
      where: {
        serviceId: data.id,
      },
    });

    const deletedService = await prisma.service.delete({
      where: {
        id: data.id,
      },
    });

    revalidatePath('/dashboard/services');

    return {
      success: true,
      service: deletedService,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: 'Ошибка удаления услуги',
    };
  }
}
