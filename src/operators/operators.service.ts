import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OperatorsService {
  constructor(
    private prisma: PrismaService,
    private readonly user: UsersService,
  ) {}

  async getUser(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        Passport: false,
        Common: false,
        Adress: false,
        FIO: false,
      },
    });
  }
}
