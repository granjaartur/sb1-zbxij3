import express, { Express } from 'express';
import cors from 'cors';

export const setupMiddleware = (app: Express) => {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  app.use(express.json());
};