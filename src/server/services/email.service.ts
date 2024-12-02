import { transporter } from '../config/email';
import prisma from '../config/database';

export class EmailService {
  static async sendPaymentReminder(memberId: string, paymentId: string) {
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: { payments: { where: { id: paymentId }, include: { service: true } } },
    });

    if (!member || !member.email || !member.payments.length) {
      throw new Error('Invalid member or payment data');
    }

    const payment = member.payments[0];
    const template = await prisma.emailTemplate.findUnique({
      where: { name: 'payment_reminder' },
    });

    if (!template) {
      throw new Error('Email template not found');
    }

    const emailBody = template.body
      .replace('{{memberName}}', member.name)
      .replace('{{serviceName}}', payment.service.name)
      .replace('{{amount}}', payment.amount.toString())
      .replace('{{dueDate}}', payment.dueDate.toLocaleDateString());

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: member.email,
      subject: template.subject,
      html: emailBody,
    });
  }

  static async sendBirthdayWish(memberId: string) {
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member || !member.email) {
      throw new Error('Invalid member data');
    }

    const template = await prisma.emailTemplate.findUnique({
      where: { name: 'birthday_wish' },
    });

    if (!template) {
      throw new Error('Email template not found');
    }

    const emailBody = template.body.replace('{{memberName}}', member.name);

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: member.email,
      subject: template.subject,
      html: emailBody,
    });
  }
}