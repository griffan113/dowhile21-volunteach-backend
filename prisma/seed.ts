import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const subjectsData: Prisma.SubjectCreateInput[] = [
  {
    name: 'Matemática',
  },
  {
    name: 'Geografica',
  },
  {
    name: 'Português',
  },
  {
    name: 'História',
  },
  {
    name: 'Física',
  },
  {
    name: 'Química',
  },
  {
    name: 'Sociologia',
  },
  {
    name: 'Filosofia',
  },
  {
    name: 'Inglês',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const subject of subjectsData) {
    const createSubject = await prisma.subject.create({
      data: subject,
    });

    console.log(`Created subject with id: ${createSubject.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
