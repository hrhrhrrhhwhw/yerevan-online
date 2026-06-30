'use server';

import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';
import { revalidatePath } from 'next/cache';
import { slugify } from 'transliteration';

interface editCompanyProps {
  name: string;
  category: string;
  description?: string;
  image?: string;
  address: string;
  phone?: string;
  telegram?: string;
  instagram?: string;
  vkontakte?: string;
}

export async function editCompanyProfile(data: editCompanyProps) {
  const user = await sessionUser();

  try {
    const currentCompany = await prisma.company.findUnique({
      where: {
        ownerId: user.id,
      },
    });

    if (!currentCompany) {
      return {
        success: false,
        error: 'Компания не найдена',
      };
    }

    let slug = currentCompany.slug;

    if (currentCompany.name !== data.name) {
      slug = slugify(data.name);

      const existing = await prisma.company.findFirst({
        where: {
          slug,
          NOT: {
            id: currentCompany.id,
          },
        },
      });

      if (existing) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const company = await prisma.company.update({
      where: { ownerId: user.id },
      data: {
        name: data.name,
        slug,
        categoryId: data.category,
        description: data.description,
        image: data.image,
        address: data.address,
        phone: data.phone,
        telegram: data.telegram,
        instagram: data.instagram,
        vkontakte: data.vkontakte,
      },
    });

    revalidatePath('/dashboard');

    return {
      success: true,
      company,
    };
  } catch (error) {
    console.error('Ошибка обновления компании:', error);

    return {
      success: false,
      error: 'Ошибка обновления компании',
    };
  }
}
