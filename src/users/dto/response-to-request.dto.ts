import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { EPermission } from './update-permission-user.dto';

export enum ERequestStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}

export class ResponseToRequestsDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  operatorId: number;

  @IsNotEmpty()
  @IsEnum(EPermission)
  @ApiProperty()
  permission: string;

  @IsNotEmpty()
  @IsEnum(ERequestStatus)
  @ApiProperty()
  status: string;
}
