import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAdresDto } from './dto/update-user-adress.dto';
import { UpdateFIODto } from './dto/update-user-fio.dto';
import { UpdatePassportDto } from './dto/update-user-passport.dto';
import { UpdatePhoneDto } from './dto/update-user-pnohe.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        Adress: true,
        Passport: true,
        FIO: true,
        PhoneNumber: true,
      },
    });
  }

  updatePassport(id: number, updatePassportDto: UpdatePassportDto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        Passport: {
          upsert: {
            create: { ...updatePassportDto },
            update: { ...updatePassportDto },
          },
        },
      },
    });
  }

  updateAdress(id: number, updateAdresDto: UpdateAdresDto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        Adress: {
          upsert: {
            create: { ...updateAdresDto },
            update: { ...updateAdresDto },
          },
        },
      },
    });
  }

  updateFIO(id: number, updateFIODto: UpdateFIODto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        FIO: {
          upsert: {
            create: { ...updateFIODto },
            update: { ...updateFIODto },
          },
        },
      },
    });
  }

  updatePhone(id: number, updatePhoneDto: UpdatePhoneDto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        PhoneNumber: {
          upsert: {
            create: { ...updatePhoneDto },
            update: { ...updatePhoneDto },
          },
        },
      },
    });
  }

  findOne(
    id: number,
    passport: boolean,
    adress: boolean,
    fio: boolean,
    phone: boolean,
  ) {
    return this.prisma.user.findUnique({
      where: { id: id },
      include: {
        Adress: adress,
        Passport: passport,
        FIO: fio,
        PhoneNumber: phone,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
