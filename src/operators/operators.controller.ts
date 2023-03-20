import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { PermissionGuard } from './guards/operator-permission.guard';
import { RolesGuard } from './guards/roles.guard';
import { OperatorsService } from './operators.service';

@Controller('operators')
@ApiTags('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Get('user/:id')
  @UseGuards(PermissionGuard)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles('OPERATOR')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.getUser(id);
  }
}
