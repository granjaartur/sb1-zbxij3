import { Request, Response } from 'express';
import prisma from '../config/database';
import { z } from 'zod';

const groupSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

const memberGroupSchema = z.object({
  memberIds: z.array(z.string()),
});

export class GroupController {
  static async create(req: Request, res: Response) {
    try {
      const data = groupSchema.parse(req.body);
      const group = await prisma.group.create({ data });
      res.json(group);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid request' });
    }
  }

  static async addMembers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { memberIds } = memberGroupSchema.parse(req.body);
      
      const memberGroups = await prisma.$transaction(
        memberIds.map((memberId) =>
          prisma.memberGroup.create({
            data: { memberId, groupId: id },
          })
        )
      );
      
      res.json(memberGroups);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid request' });
    }
  }

  static async removeMembers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { memberIds } = memberGroupSchema.parse(req.body);
      
      await prisma.memberGroup.deleteMany({
        where: {
          groupId: id,
          memberId: { in: memberIds },
        },
      });
      
      res.json({ message: 'Members removed successfully' });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Invalid request' });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const groups = await prisma.group.findMany({
        include: {
          members: { include: { member: true } },
          services: true,
        },
      });
      res.json(groups);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}