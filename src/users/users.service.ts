import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAdresDto } from './dto/update-user-adress.dto';
import { UpdateFIODto } from './dto/update-user-fio.dto';
import { UpdatePassportDto } from './dto/update-user-passport.dto';
import { UpdateCommonDto } from './dto/update-user-common.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 5);

    if (
      await this.prisma.user.findUnique({
        where: { login: createUserDto.login },
      })
    )
      throw new HttpException(
        'user with the same name already exist',
        HttpStatus.FORBIDDEN,
      );
    const user = this.prisma.user.create({
      data: { ...createUserDto, password: hashPassword },
    });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        Adress: true,
        Passport: true,
        FIO: true,
        Common: true,
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

  updateCommon(id: number, updateCommonDto: UpdateCommonDto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        Common: {
          upsert: {
            create: { ...updateCommonDto },
            update: { ...updateCommonDto },
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
    common: boolean,
  ) {
    return this.prisma.user.findUnique({
      where: { id: id },
      include: {
        Adress: adress,
        Passport: passport,
        FIO: fio,
        Common: common,
      },
    });
  }

  async findByLogin(login: string) {
    return await this.prisma.user.findUnique({
      where: { login: login },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
