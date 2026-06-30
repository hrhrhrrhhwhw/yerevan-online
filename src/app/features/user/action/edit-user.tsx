'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface UpdateUserData {
  name: string | null;
  lastName: string | null;
  image: string | null;
  phone?: string | null;
}

export async function updateUserProfile(userId: string, data: UpdateUserData) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name || null,
        lastName: data.lastName || null,
        image: data.image || null,
        phone: data.phone || null,
      },
    });

    revalidatePath(`/user/${userId}/edit`);
    revalidatePath(`/user/${userId}`);

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: 'Failed to update profile', userId };
  }
}
