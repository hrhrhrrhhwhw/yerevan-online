import { z } from 'zod';

export const workTimeSchema = z.object({
  startTime: z.string().min(1, 'Укажите начало рабочего дня'),
  endTime: z.string().min(1, 'Укажите конец рабочего дня'),
});
