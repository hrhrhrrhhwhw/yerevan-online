import { z } from 'zod';

export const reviewSchema = z.object({
  text: z.string().min(2, 'Минимум 2 символа'),
  rating: z.number().min(1).max(5),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
