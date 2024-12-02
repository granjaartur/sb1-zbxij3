import { z } from 'zod';

export const paymentSchema = z.object({
  memberId: z.string().min(1, 'Member is required'),
  serviceId: z.string().min(1, 'Service is required'),
  amount: z.number().min(0, 'Amount must be positive'),
  status: z.enum(['PENDING', 'PAID', 'OVERDUE', 'CANCELLED']),
  dueDate: z.string().min(1, 'Due date is required'),
  paidDate: z.string().optional(),
  reference: z.string().optional(),
  paymentMethod: z.enum(['MB', 'MBWAY']).optional(),
});