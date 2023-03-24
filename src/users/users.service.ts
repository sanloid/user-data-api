import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAdresDto } from './dto/update-user-adress.dto';
import { UpdateFIODto } from './dto/update-user-fio.dto';
import { UpdatePassportDto } from './dto/update-user-passport.dto';
import { UpdateCommonDto } from './dto/update-user-common.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import {
  EPermission,
  UpdatePermissionDto,
} from './dto/update-permission-user.dto';

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

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: {
        login: true,
        role: true,
        Adress: {
          select: {
            city: true,
            country: true,
            area: true,
            mailindex: true,
            street: true,
            houseNum: true,
            flat: true,
          },
        },
        Passport: {
          select: {
            number: true,
            series: true,
            issuedBy: true,
            issuedWhen: true,
          },
        },
        FIO: {
          select: {
            firstName: true,
            secondName: true,
            lastName: true,
          },
        },
        Common: {
          select: {
            phoneNumber: true,
            dateOfBirth: true,
          },
        },
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

  async userIsOperator(id: number) {
    const oper = await this.prisma.user.findUnique({ where: { id } });
    if (!oper)
      throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
    return oper.role === 'OPERATOR';
  }

  async updatePermission(
    userId: number,
    updatePermissionDto: UpdatePermissionDto,
  ) {
    if (!(await this.userIsOperator(updatePermissionDto.operatorId))) {
      throw new HttpException('User is not a OPERATOR', HttpStatus.BAD_REQUEST);
    }
    return await this.prisma.permission.upsert({
      where: {
        Operator_User: {
          Operator: updatePermissionDto.operatorId,
          User: userId,
        },
      },
      create: {
        Operator: updatePermissionDto.operatorId,
        User: userId,
        [updatePermissionDto.permission]: updatePermissionDto.value,
      },
      update: {
        [updatePermissionDto.permission]: updatePermissionDto.value,
      },
    });
  }

  async getAllUserOperators(id: number) {
    const res = await this.prisma.$queryRaw`
    SELECT  
    "public"."User"."id", 
    "public"."User"."login", 
    "public"."Permission"."Adress", 
    "public"."Permission"."Passport", 
    "public"."Permission"."UserName", 
    "public"."Permission"."Common", 
    "public"."UserName"."firstName",
    "public"."UserName"."secondName",
    "public"."UserName"."lastName"
    FROM "public"."User" 
    JOIN "public"."Permission" 
    ON "public"."Permission"."Operator" = "public"."User"."id"
    FULL JOIN "public"."UserName"
    ON "public"."UserName"."userId" = "public"."User"."id"
    WHERE "public"."Permission"."User" = ${id}
    `;
    return res;
  }
}
