import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty()
  login: string;

  @IsString()
  @IsNotEmpty()
  // @MinLength(8)
  // @MaxLength(20)
  // @ApiProperty()
  // @IsStrongPassword()
  password: string;
}
