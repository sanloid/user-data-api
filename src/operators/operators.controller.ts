import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnDataGuard } from 'src/auth/guards/owndate.guard';
import { Roles } from './decorators/roles.decorator';
import { PermissionGuard } from './guards/operator-permission.guard';
import { RolesGuard } from './guards/roles.guard';
import { OperatorsService } from './operators.service';
import { OperatorSendRequestDTO } from './dto/operators-send-request.dto';

@Controller('operators')
@ApiTags('operators')
export class OperatorsController {
  constructor(private readonly operatorsService: OperatorsService) {}

  @Get('user/:id')
  @ApiOperation({ summary: 'Select user with id' })
  @UseGuards(PermissionGuard)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles('OPERATOR')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.getUser(id);
  }

  @Get('users/:id')
  @ApiOperation({
    summary:
      'Selects all users data available to the operator. ID - is a operator ID',
  })
  // @UseGuards(RolesGuard)
  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  // @Roles('OPERATOR')
  async getAllOperatorUsersData(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.getAllOperatorUsersData(id);
  }

  @Post('request/:id')
  @ApiOperation({
    summary: 'Send request to user data',
  })
  // @UseGuards(RolesGuard)
  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  // @Roles('OPERATOR')
  async operatorSendRequest(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: OperatorSendRequestDTO,
  ) {
    return this.operatorsService.operatorSendRequest(id, request);
  }
}
