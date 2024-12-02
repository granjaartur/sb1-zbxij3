import { PrismaClient } from '@prisma/client';
import { config } from './environment.js';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.database.url,
    },
  },
  log: config.app.nodeEnv === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});