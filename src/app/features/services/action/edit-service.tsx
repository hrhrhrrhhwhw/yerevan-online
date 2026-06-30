'use server';

import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';
import { revalidatePath } from 'next/cache';

interface EditServiceProps {
  id: string;
  title: string;
  description?: string;
  price: number;
  duration: number;
  staffIds: string[];
}

export async function editService(data: EditServiceProps) {
  try {
    const user = await sessionUser();
    const service = await prisma.service.findUnique({
      where: { id: data.id },
      include: {
        company: true,
      },
    });

    if (!service || service.company.ownerId !== user.id) {
      return {
        success: false,
        error: 'Нет доступа',
      };
    }

    const updated = await prisma.service.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        duration: data.duration,
      },
    });

    await prisma.serviceStaff.deleteMany({
      where: {
        serviceId: data.id,
      },
    });

    if (data.staffIds.length) {
      await prisma.serviceStaff.createMany({
        data: data.staffIds.map((staffId) => ({
          serviceId: data.id,
          staffId,
        })),
      });
    }

    revalidatePath('/dashboard/services');

    return {
      success: true,
      service: updated,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'Ошибка обновления услуги',
    };
  }
}
