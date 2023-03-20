import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class UpdatePhoneDto {
  @IsPhoneNumber('RU')
  @ApiProperty({ required: false })
  phoneNumber: string;
}
