import { Express } from 'express';
import authRoutes from './auth.routes.js';
import memberRoutes from './member.routes.js';
import groupRoutes from './group.routes.js';
import serviceRoutes from './service.routes.js';
import paymentRoutes from './payment.routes.js';

export const setupRoutes = (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/members', memberRoutes);
  app.use('/api/groups', groupRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/payments', paymentRoutes);
};