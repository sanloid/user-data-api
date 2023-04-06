import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  city: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  country: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  area: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  mailindex: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  street: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  houseNum: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  flat: string;
}
