import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateFIODto } from './dto/update-user-fio.dto';
import { UpdateAdresDto } from './dto/update-user-adress.dto';
import { UpdatePassportDto } from './dto/update-user-passport.dto';
import { UpdatePhoneDto } from './dto/update-user-pnohe.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Return all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user with id by query params' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('passport', ParseBoolPipe) passport: boolean,
    @Query('adress', ParseBoolPipe) adress: boolean,
    @Query('fio', ParseBoolPipe) fio: boolean,
    @Query('phone', ParseBoolPipe) phone: boolean,
  ) {
    return this.usersService.findOne(id, passport, adress, fio, phone);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user with id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user with id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }

  @Patch('adress/:id')
  @ApiOperation({ summary: 'Update user Adress with id' })
  updateAdress(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdresDto: UpdateAdresDto,
  ) {
    return this.usersService.updateAdress(id, updateAdresDto);
  }

  @Patch('fio/:id')
  @ApiOperation({ summary: 'Update user FIO with id' })
  updateFIO(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFIODto: UpdateFIODto,
  ) {
    return this.usersService.updateFIO(id, updateFIODto);
  }

  @Patch('passport/:id')
  @ApiOperation({ summary: 'Update user Passport with id' })
  updatePassport(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePassportDto: UpdatePassportDto,
  ) {
    return this.usersService.updatePassport(id, updatePassportDto);
  }

  @Patch('phone/:id')
  @ApiOperation({ summary: 'Update user Passport with id' })
  updatePhone(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    return this.usersService.updatePhone(id, updatePhoneDto);
  }
}
