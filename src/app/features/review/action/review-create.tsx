'use server';

import { prisma } from '@/lib/prisma';
import { sessionUser } from '@/lib/session/session-user';
import { revalidatePath } from 'next/cache';

interface CreateReviewProps {
  text: string;
  rating: number;
  companyId: string;
}

export async function createReview(data: CreateReviewProps) {
  try {
    const user = await sessionUser();

    const review = await prisma.review.create({
      data: {
        text: data.text,
        rating: data.rating,
        userId: user.id,
        companyId: data.companyId,
      },
    });

    revalidatePath('/');

    return {
      success: true,
      review,
    };
  } catch (error) {
    console.error('Ошибка создания отзыва:', error);

    return {
      success: false,
      error: 'Ошибка создания отзыва',
    };
  }
}
