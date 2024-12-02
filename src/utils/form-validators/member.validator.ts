import { z } from 'zod';

export const memberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional().nullable(),
  documentId: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional().nullable(),
  maritalStatus: z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'OTHER']).optional().nullable(),
  birthDate: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  academicDegree: z.string().optional().nullable(),
  school: z.string().optional().nullable(),
  fieldOfStudy: z.string().optional().nullable(),
  profession: z.string().optional().nullable(),
  training: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
});