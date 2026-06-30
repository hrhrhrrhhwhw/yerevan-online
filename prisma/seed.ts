import { categories } from '@/lib/data';
import { prisma } from '@/lib/prisma';

async function main() {
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.service.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.company.deleteMany();
  await prisma.category.deleteMany();

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
