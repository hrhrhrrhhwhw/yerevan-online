'use server';

import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';
import { revalidatePath } from 'next/cache';
import { slugify } from 'transliteration';

interface createCompanyProps {
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

export async function createCompanyProfile(data: createCompanyProps) {
  try {
    const user = await sessionUser();

    const existingCompany = await prisma.company.findFirst({
      where: { ownerId: user.id },
    });

    if (existingCompany) {
      return {
        success: false,
        error: 'Вы уже создали компанию',
      };
    }
    
    let slug = slugify(data.name);

    const existing = await prisma.company.findUnique({
      where: { slug },
    });

    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const createCompany = await prisma.company.create({
      data: {
        name: data.name,
        categoryId: data.category,
        slug,
        description: data.description,
        image: data.image,
        address: data.address,
        phone: data.phone,
        telegram: data.telegram,
        instagram: data.instagram,
        vkontakte: data.vkontakte,

        ownerId: user.id,
      },
    });

    revalidatePath(`/user/${user}/create`);
    revalidatePath(`/user/${user}`);

    return { success: true, company: createCompany };
  } catch (error) {
    console.error('Ошибка создания компании:', error);
    return { success: false, error: 'Ошибка создания компании:' };
  }
}
