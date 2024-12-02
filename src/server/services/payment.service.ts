import prisma from '../config/database';
import { EmailService } from './email.service';
import { PaymentStatus, PaymentMethod } from '@prisma/client';
import { IfThenPayService } from '../../services/ifthenpay.service';

interface CreatePaymentData {
  memberId: string;
  serviceId: string;
  amount: number;
  dueDate: Date;
}

interface ProcessPaymentData {
  paymentId: string;
  method: PaymentMethod;
  amount: number;
  email: string;
  phone?: string;
  description: string;
}

export class PaymentService {
  static async createPayment(data: CreatePaymentData) {
    const payment = await prisma.payment.create({
      data: {
        memberId: data.memberId,
        serviceId: data.serviceId,
        amount: data.amount,
        dueDate: data.dueDate,
        status: PaymentStatus.PENDING,
      },
      include: {
        member: true,
        service: true,
      },
    });

    await EmailService.sendPaymentReminder(data.memberId, payment.id);
    return payment;
  }

  static async processPayment(data: ProcessPaymentData) {
    const payment = await prisma.payment.findUnique({
      where: { id: data.paymentId },
      include: { member: true },
    });

    if (!payment) {
      throw new Error('Payment not found');
    }

    try {
      const result = data.method === PaymentMethod.MB
        ? await IfThenPayService.generateMBReference({
            amount: data.amount,
            email: data.email,
            description: data.description,
            reference: payment.id,
          })
        : await IfThenPayService.generateMBWayPayment({
            amount: data.amount,
            email: data.email,
            phone: data.phone!,
            description: data.description,
            reference: payment.id,
          });

      if (!result.success) {
        throw new Error(result.error);
      }

      // Create payment transaction record
      await prisma.paymentTransaction.create({
        data: {
          paymentId: payment.id,
          method: data.method,
          reference: result.reference!,
          amount: data.amount,
          status: PaymentStatus.PENDING,
          sourcePhone: data.phone,
        },
      });

      return result;
    } catch (error) {
      // Create failed transaction record
      await prisma.paymentTransaction.create({
        data: {
          paymentId: payment.id,
          method: data.method,
          reference: payment.id,
          amount: data.amount,
          status: PaymentStatus.CANCELLED,
          sourcePhone: data.phone,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      throw error;
    }
  }

  static async processIfThenPayCallback(reference: string, status: string) {
    const transaction = await prisma.paymentTransaction.findUnique({
      where: { reference },
      include: { payment: true },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const newStatus = status === 'paid' ? PaymentStatus.PAID : PaymentStatus.PENDING;

    // Update transaction
    await prisma.paymentTransaction.update({
      where: { id: transaction.id },
      data: {
        status: newStatus,
        completedAt: status === 'paid' ? new Date() : null,
      },
    });

    // Update payment if transaction is successful
    if (status === 'paid') {
      await prisma.payment.update({
        where: { id: transaction.paymentId },
        data: {
          status: PaymentStatus.PAID,
          paidDate: new Date(),
        },
      });
    }
  }

  static async getPaymentTransactions(paymentId: string) {
    return prisma.paymentTransaction.findMany({
      where: { paymentId },
      orderBy: { createdAt: 'desc' },
    });
  }
}