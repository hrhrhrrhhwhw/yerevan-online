import { z } from 'zod';

export const serviceSchema = z.object({
  title: z.string().min(2, 'Минимум 2 символа').max(100, 'Максимум 100 символов'),

  description: z.string().optional(),

  price: z.number().int('Цена должна быть целым числом').min(0, 'Цена не может быть отрицательной'),

  duration: z.number().int('Длительность должна быть целым числом').min(1, 'Минимум 1 минута').max(1440, 'Максимум 1440 минут'),

  staffIds: z.array(z.string()).min(1, 'Выберите хотя бы одного сотрудника'),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
