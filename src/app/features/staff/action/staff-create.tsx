'use server';

import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';
import { revalidatePath } from 'next/cache';

interface createStaffProps {
  name: string;
  occupation: string;
  description?: string;
  image?: string;
  startTime: string;
  endTime: string;
}

export async function createStaff(data: createStaffProps) {
  try {
    const user = await sessionUser();

    const company = await prisma.company.findUnique({
      where: {
        ownerId: user.id,
      },

      select: {
        id: true,
        slug: true,
      },
    });

    if (!company) {
      return {
        success: false,
        error: 'Компания не найдена',
      };
    }

    const staff = await prisma.staff.create({
      data: {
        name: data.name,
        occupation: data.occupation,
        description: data.description,
        image: data.image,
        startTime: data.startTime,
        endTime: data.endTime,

        company: {
          connect: {
            id: company.id,
          },
        },
      },
    });

    revalidatePath('/dashboard');

    return {
      success: true,
      staff,
    };
  } catch (error) {
    console.error('Ошибка создания работника:', error);

    return {
      success: false,
      error: 'Ошибка создания работника',
    };
  }
}
