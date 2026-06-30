import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа').nullable(),
  lastName: z.string().min(2, 'Минимум 2 символа').nullable(),
  image: z.string().url('Некорректный URL').optional().or(z.literal('')).nullable(),
  phone: z.string().optional().nullable(),
});

export type UserFormValues = z.infer<typeof userSchema>;
