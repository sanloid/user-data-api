import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum EPermission {
  FIO = 'UserName',
  ADDRESS = 'Address',
  PASSPORT = 'Passport',
  COMMON = 'Common',
}

export class UpdatePermissionDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  operatorId: number;

  @IsNotEmpty()
  @IsEnum(EPermission)
  @ApiProperty()
  permission: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  value: boolean;
}
