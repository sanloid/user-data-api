import { PrismaClient } from '@prisma/client';
import { set } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  const user1 = prisma.user.upsert({
    where: { login: 'sanloid' },
    update: {},
    create: {
      login: 'sanloid',
      password: '123456',
      FIO: {
        create: {
          firstName: 'Александр',
          secondName: 'Васильченко',
          lastName: 'Алексеевич',
        },
      },
      Adress: {
        create: {
          city: 'Омск',
          country: 'Россия',
          area: 'Омская область',
        },
      },
      Passport: {
        create: {
          number: '1234',
          series: '1234',
          issuedBy: 'someone',
          issuedWhen: set(new Date(), { hours: 1, minutes: 10 }),
        },
      },
      Common: {
        create: {
          phoneNumber: '12345678',
          dateOfBirth: set(new Date(), { hours: 1, minutes: 10 }),
        },
      },
    },
  });
  console.log(user1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
