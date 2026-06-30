'use server';

import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';
import { revalidatePath } from 'next/cache';

interface DeleteStaffProps {
  id: string;
}

export async function deleteStaff({ id }: DeleteStaffProps) {
  try {
    const user = await sessionUser();

    const staff = await prisma.staff.findUnique({
      where: {
        id,
      },
      include: {
        company: {
          select: {
            ownerId: true,
          },
        },
      },
    });

    if (!staff) {
      return {
        success: false,
        error: 'Сотрудник не найден',
      };
    }

    if (staff.company.ownerId !== user.id) {
      return {
        success: false,
        error: 'Нет доступа',
      };
    }

    await prisma.staff.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard/staff');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Ошибка удаления сотрудника:', error);

    return {
      success: false,
      error: 'Ошибка удаления сотрудника',
    };
  }
}
