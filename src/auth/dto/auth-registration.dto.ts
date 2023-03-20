import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
} from 'class-validator';

export class RegistrationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @ApiProperty()
  //   @IsStrongPassword()
  password: string;
}
