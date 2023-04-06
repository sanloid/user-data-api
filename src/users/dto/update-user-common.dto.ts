import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsPhoneNumber, Matches } from 'class-validator';

export class UpdateCommonDto {
  @IsPhoneNumber('RU')
  @ApiProperty({ required: false })
  phoneNumber: string;

  @IsISO8601()
  @ApiProperty({ required: false })
  dateOfBirth: Date;
}
