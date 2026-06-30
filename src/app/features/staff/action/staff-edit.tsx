'use server'

import { prisma } from '@/lib/prisma'
import { sessionUser } from '@/lib/session/session-user'
import { revalidatePath } from 'next/cache'

interface EditStaffProps {
  id?: string
  name: string
  occupation: string
  description?: string
  image?: string
  startTime: string
  endTime: string
}

export async function editStaff(data: EditStaffProps) {
  try {
    const user = await sessionUser()

    const staff = await prisma.staff.findUnique({
      where: {
        id: data.id,
      },
      include: {
        company: {
          select: {
            ownerId: true,
            slug: true,
          },
        },
      },
    })

    if (!staff) {
      return {
        success: false,
        error: 'Сотрудник не найден',
      }
    }

    if (staff.company.ownerId !== user.id) {
      return {
        success: false,
        error: 'Нет доступа',
      }
    }

    const updated = await prisma.$transaction(async (tx) => {
      const staffUpdated = await tx.staff.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          occupation: data.occupation,
          description: data.description,
          image: data.image,
          startTime: data.startTime,
          endTime: data.endTime,
        },
      })
      return staffUpdated
    })

    revalidatePath(`/dashboard`)
    revalidatePath(`/dashboard/${staff.company.slug}/staff`)

    return {
      success: true,
      staff: updated,
      companySlug: staff.company.slug,
    }
  } catch (error) {
    console.error('Ошибка обновления сотрудника:', error)
    return {
      success: false,
      error: 'Ошибка обновления сотрудника',
    }
  }
}
