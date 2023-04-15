import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAddressDto } from './dto/update-user-address.dto';
import { UpdateFIODto } from './dto/update-user-fio.dto';
import { UpdatePassportDto } from './dto/update-user-passport.dto';
import { UpdateCommonDto } from './dto/update-user-common.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import {
  EPermission,
  UpdatePermissionDto,
} from './dto/update-permission-user.dto';
import { FilesService } from 'src/files/files.service';
import { ResponseToRequestsDTO } from './dto/response-to-request.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly filesService: FilesService,
  ) {}

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
        Address: true,
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

  async updateAddresss(id: number, updateAddressDto: UpdateAddressDto) {
    const resp = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        Address: {
          upsert: {
            create: { ...updateAddressDto },
            update: { ...updateAddressDto },
          },
        },
      },
    });
    console.log(resp);
    return resp;
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

  exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

  async findOne(id: number) {
    const res = await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        Address: {},
        Common: true,
        FIO: true,
        Passport: true,
      },
    });
    this.exclude(res, ['password']);
    if (res.Address) this.exclude(res.Address, ['id', 'userId']);
    if (res.Common) this.exclude(res.Common, ['id', 'userId']);
    if (res.Passport) this.exclude(res.Passport, ['id', 'userId']);
    if (res.FIO) this.exclude(res.FIO, ['id', 'userId']);
    return res;
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
    pu."id", 
    pu."login", 
    pp."Address", 
    pp."Passport", 
    pp."UserName", 
    pp."Common", 
    pun."firstName",
    pun."secondName",
    pun."lastName"
    FROM "public"."User" as pu
    JOIN "public"."Permission" as pp
    ON pp."Operator" = pu."id"
    FULL JOIN "public"."UserName" as pun
    ON pun."userId" = pu."id"
    WHERE pp."User" = ${id}
    `;
    return res;
  }

  async updateUserPhoto(id: number, image: any) {
    const name = `/${id}-user-avatar.jpg`;
    await this.filesService.createFile(image, name);
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        photo: name,
      },
    });
  }

  async getProfile(id: number) {
    const res = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        description: true,
        email: true,
        photo: true,
        FIO: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return res;
  }

  async getRequests(id: number) {
    return await this.prisma.request.findMany({
      where: {
        userId: id,
      },
    });
  }

  async responseToRequests(
    id: number,
    responseToRequests: ResponseToRequestsDTO,
  ) {
    // return await this.prisma.request.upsert({
    //   where : {
    //     use
    //   }
    // });
  }
}
