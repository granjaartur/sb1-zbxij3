import { Request, Response } from 'express';
import prisma from '../config/database';
import { z } from 'zod';

const memberSchema = z.object({
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
  responsibleId: z.string().optional().nullable(),
});

export class MemberController {
  static async create(req: Request, res: Response) {
    try {
      const data = memberSchema.parse(req.body);
      
      // Convert empty strings to null
      const cleanedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value === '' ? null : value
        ])
      );

      const member = await prisma.member.create({
        data: cleanedData,
      });

      res.status(201).json(member);
    } catch (error) {
      console.error('Error creating member:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: error instanceof Error ? error.message : 'Failed to create member'
        });
      }
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = memberSchema.partial().parse(req.body);
      
      // Convert empty strings to null
      const cleanedData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value === '' ? null : value
        ])
      );

      const member = await prisma.member.update({
        where: { id },
        data: cleanedData,
      });

      res.json(member);
    } catch (error) {
      console.error('Error updating member:', error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: 'Validation error', 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          message: error instanceof Error ? error.message : 'Failed to update member'
        });
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.member.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting member:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Failed to delete member'
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const members = await prisma.member.findMany({
        orderBy: { name: 'asc' },
      });
      res.json(members);
    } catch (error) {
      console.error('Error fetching members:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Failed to fetch members'
      });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const member = await prisma.member.findUnique({
        where: { id },
        include: {
          responsibleFor: true,
          groups: { include: { group: true } },
          payments: { include: { service: true } },
        },
      });
      
      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }
      
      res.json(member);
    } catch (error) {
      console.error('Error fetching member:', error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : 'Failed to fetch member'
      });
    }
  }
}