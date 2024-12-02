import { Request, Response } from 'express';
import prisma from '../config/database';
import { PaymentService } from '../services/payment.service';
import { EmailService } from '../services/email.service';
import { z } from 'zod';

const paymentSchema = z.object({
  memberId: z.string(),
  serviceId: z.string(),
  amount: z.number(),
  dueDate: z.string(),
  paymentMethod: z.enum(['MB', 'MBWAY']).optional(),
});

const callbackSchema = z.object({
  reference: z.string(),
  status: z.string(),
  anti_phishing_key: z.string(),
});

export class PaymentController {
  static async create(req: Request, res: Response) {
    try {
      const data = paymentSchema.parse(req.body);
      const payment = await PaymentService.createPayment(data);
      res.json(payment);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid request' });
    }
  }

  static async processCallback(req: Request, res: Response) {
    try {
      const data = callbackSchema.parse(req.body);
      await PaymentService.processIfThenPayCallback(data.reference, data.status);
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid request' });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const payments = await prisma.payment.findMany({
        include: {
          member: true,
          service: true,
        },
      });
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await prisma.payment.findUnique({
        where: { id },
        include: {
          member: true,
          service: true,
        },
      });
      
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}