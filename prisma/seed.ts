import { PrismaClient } from '@prisma/client';
import { set } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.createMany({
    data: [
      {
        login: 'user1',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'user2',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'user3',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'user4',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'user5',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'user6',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'user7',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'user8',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'user9',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'user10',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'operator1',
        role: 'OPERATOR',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'operator2',
        role: 'OPERATOR',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'operator3',
        role: 'OPERATOR',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'operator4',
        role: 'OPERATOR',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
      {
        login: 'operator5',
        role: 'OPERATOR',
        password:
          '$2a$05$PvuE.XtqVoyODj16FEL87ee7jCKt2mbxuJrpwMkVRxO00PPZ9zFu6',
      },
    ],
  });
  const operators = [11, 12, 13, 14, 15];
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const dat = [].concat(
    ...operators.map((e) => {
      return users.map((i) => {
        return {
          Operator: e,
          User: i,
          Address: true,
          UserName: true,
          Common: true,
          Passport: true,
        };
      });
    }),
  );
  const permissions = await prisma.permission.createMany({
    data: dat,
  });
  console.log(user1);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('seeding done');
    await prisma.$disconnect();
  });
