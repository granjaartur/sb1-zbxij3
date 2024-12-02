import { Request, Response } from 'express';
import prisma from '../config/database';
import { z } from 'zod';

const serviceSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  basePrice: z.number(),
  taxPercent: z.number(),
  frequency: z.enum(['WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY']),
  categoryId: z.string(),
  groupId: z.string().optional(),
});

export class ServiceController {
  static async create(req: Request, res: Response) {
    try {
      const data = serviceSchema.parse(req.body);
      const service = await prisma.service.create({ data });
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid request' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = serviceSchema.partial().parse(req.body);
      const service = await prisma.service.update({
        where: { id },
        data,
      });
      res.json(service);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid request' });
    }
  }

  static async getByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const services = await prisma.service.findMany({
        where: { categoryId },
        include: { category: true },
      });
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}