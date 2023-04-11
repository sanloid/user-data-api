import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import {
  OperatorSendRequestDTO,
  RequestStatus,
} from './dto/operators-send-request.dto';

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
        Address: false,
        FIO: false,
      },
    });
  }

  async getAllOperatorUsersData(operatorId: number) {
    const res = await this.prisma.$queryRaw`
    SELECT
    u.id,
    u.login,
    CASE WHEN p."UserName" = true THEN json_build_object ('firstName', un."firstName", 'secondName', un."secondName", 'lastName', un."lastName") ELSE null END AS "FIO",
    CASE WHEN p."Address" = true THEN json_build_object ('country', a."country", 'city', a."city", 'area', a."area", 'mailindex', a."mailindex", 'street', a."street", 'houseNum', a."houseNum", 'flat', a."flat") ELSE null END AS "Address",
    CASE WHEN p."Passport" = true THEN json_build_object ('number', pa."number", 'series', pa."series", 'issuedBy', pa."issuedBy", 'issuedWhen', pa."issuedWhen") ELSE null END AS "Passport",
    CASE WHEN p."Common" = true THEN json_build_object ('phoneNumber', c."phoneNumber", 'dateOfBirth', c."dateOfBirth") ELSE null END AS "Common"
    FROM
    "public"."User" AS u
    JOIN "public"."Permission" AS p ON p."User" = u."id"
    LEFT JOIN "public"."UserName" AS un ON un."userId" = u."id"
    LEFT JOIN "public"."Address" AS a ON a."userId" = u."id"
    LEFT JOIN "public"."Passport" AS pa ON pa."userId" = u."id"
    LEFT JOIN "public"."Common" AS c ON c."userId" = u."id"
    WHERE p."Operator" = ${operatorId}
    `;
    return res;
  }

  async operatorSendRequest(id: number, request: OperatorSendRequestDTO) {
    try {
      const res = await this.prisma.request.create({
        data: {
          userId: Number(request.userId),
          operatorId: id,
          dataType: request.datatype,
          status: RequestStatus.PENDING,
        },
      });
      return res;
    } catch {
      throw new HttpException('something went wrong', HttpStatus.CONFLICT);
    }
  }
}
