'use server';

import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';
import { revalidatePath } from 'next/cache';

export async function deleteCompanyProfile() {
  const user = await sessionUser();

  try {
    const company = await prisma.company.findUnique({
      where: {
        ownerId: user.id,
      },
    });

    if (!company) {
      return {
        success: false,
        error: 'Компания не найдена',
      };
    }

    await prisma.company.delete({
      where: {
        id: company.id,
      },
    });

    revalidatePath('/dashboard');
    return {
      success: true,
    };
  } catch (error) {
    console.error('Ошибка удаления компании:', error);

    return {
      success: false,
      error: 'Ошибка удаления компании',
    };
  }
}
