import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create admin user
    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: '$2a$10$K8ZpdrjwzUWE1QJ9kVNyP.vQtgJz7qKx0AZxJtDfwQQ4mnAzqv5rW', // password: admin123
        role: 'ADMIN',
      },
    });

    // Create service categories
    const category1 = await prisma.serviceCategory.create({
      data: {
        name: 'Monthly Services',
        description: 'Regular monthly services',
      },
    });

    const category2 = await prisma.serviceCategory.create({
      data: {
        name: 'Annual Services',
        description: 'Annual membership services',
      },
    });

    // Create services
    await prisma.service.createMany({
      data: [
        {
          name: 'Basic Membership',
          description: 'Basic monthly membership',
          basePrice: 29.99,
          taxPercent: 23,
          frequency: 'MONTHLY',
          categoryId: category1.id,
        },
        {
          name: 'Premium Membership',
          description: 'Premium annual membership',
          basePrice: 299.99,
          taxPercent: 23,
          frequency: 'YEARLY',
          categoryId: category2.id,
        },
      ],
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();