import { z } from 'zod';

export const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  basePrice: z.number().min(0, 'Price must be positive'),
  taxPercent: z.number().min(0, 'Tax percentage must be positive'),
  frequency: z.enum(['WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY']),
  categoryId: z.string().min(1, 'Category is required'),
  groupId: z.string().optional(),
});

export const serviceCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});