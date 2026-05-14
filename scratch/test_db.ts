import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function test() {
  try {
    console.log('Testing DB connection...');
    const adminCount = await prisma.admin.count();
    console.log('Admin count:', adminCount);
    
    const admin = await prisma.admin.findUnique({
      where: { email: 'admin@luxhome.com' }
    });
    
    if (admin) {
      console.log('Admin found:', admin.email);
      const isMatch = await bcrypt.compare('admin123!', admin.password_hash);
      console.log('Password match:', isMatch);
    } else {
      console.log('Admin NOT found.');
    }
  } catch (e: any) {
    console.error('Test failed:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
