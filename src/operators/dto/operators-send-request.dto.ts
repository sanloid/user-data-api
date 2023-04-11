import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum DataType {
  ADDRESS = 'ADDRESS',
  COMMON = 'COMMON',
  USERNAME = 'USERNAME',
  PASSPORT = 'PASSPORT',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}

export class OperatorSendRequestDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(DataType)
  @ApiProperty()
  datatype: DataType;
}
