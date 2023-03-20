import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsISO8601, IsOptional, IsString } from 'class-validator';

export class UpdatePassportDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  number: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  series: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  issuedBy: string;

  @IsOptional()
  @IsISO8601()
  @ApiProperty({ required: false })
  issuedWhen: Date;
}
