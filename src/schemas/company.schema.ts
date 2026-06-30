import { z } from 'zod';

export const companySchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  category: z.string().min(1, 'Выберите категорию'),
  description: z.string().optional(),
  image: z.string().url().optional().or(z.literal('')),
  address: z.string().min(2),
  phone: z.string().optional(),
  telegram: z.string().optional(),
  instagram: z.string().optional(),
  vkontakte: z.string().optional(),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
