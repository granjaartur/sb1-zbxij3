import express from 'express';
import cors from 'cors';
import { config } from './config/environment.js';
import { setupRoutes } from './routes/index.js';
import { errorHandler } from './middleware/error.js';
import { prisma } from './config/database.js';

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
setupRoutes(app);

// Error handling
app.use(errorHandler);

const port = config.app.port;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle cleanup
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing HTTP server...');
  await prisma.$disconnect();
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});