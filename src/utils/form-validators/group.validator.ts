import { z } from 'zod';

export const groupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});