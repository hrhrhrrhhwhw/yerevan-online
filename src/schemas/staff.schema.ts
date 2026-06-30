import { z } from 'zod';

export const staffSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  occupation: z.string().min(2),
  description: z.string().optional(),
  image: z.string().optional(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Введите время в формате HH:mm'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Введите время в формате HH:mm'),
});

export type StaffFormValues = z.infer<typeof staffSchema>;
