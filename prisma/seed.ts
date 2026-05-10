import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed product
  await prisma.product.upsert({
    where: { id: 'product-luxglow-001' },
    update: {},
    create: {
      id: 'product-luxglow-001',
      name: 'LuxGlow Signature Lamp',
      description: 'An architectural masterpiece that transforms any room into a sanctuary of warm, golden light.',
      long_description: `
        Crafted with precision-blown borosilicate glass and a hand-finished brass base, the LuxGlow Signature Lamp 
        is more than a light source — it is a statement of refined taste. 
        
        The warm 2700K color temperature recreates the golden hour, morning and evening, within your home.
        Compatible with standard E27 bulbs and dimmable fixtures.
      `,
      price: 2499.00,
      image_url: '/images/hero-lamp.png',
      image_gallery: [
        '/images/hero-lamp.png',
      ],
      stock: 50,
      is_active: true,
    },
  });

  // Seed admin
  const hash = await bcrypt.hash('admin123!', 12);
  await prisma.admin.upsert({
    where: { email: 'admin@luxhome.com' },
    update: {},
    create: {
      email: 'admin@luxhome.com',
      password_hash: hash,
    },
  });

  console.log('✅ Seed complete');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
