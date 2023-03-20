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
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateFIODto } from './dto/update-user-fio.dto';
import { UpdateAdresDto } from './dto/update-user-adress.dto';
import { UpdatePassportDto } from './dto/update-user-passport.dto';
import { UpdateCommonDto } from './dto/update-user-common.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnDataGuard } from 'src/auth/guards/owndate.guard';

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
  @UseGuards(OwnDataGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find user with id by query params' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('passport', ParseBoolPipe) passport: boolean,
    @Query('adress', ParseBoolPipe) adress: boolean,
    @Query('fio', ParseBoolPipe) fio: boolean,
    @Query('common', ParseBoolPipe) common: boolean,
  ) {
    return this.usersService.findOne(id, passport, adress, fio, common);
  }

  @Patch(':id')
  @UseGuards(OwnDataGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user with id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(OwnDataGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user with id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }

  @Patch('adress/:id')
  @UseGuards(OwnDataGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user Adress with id' })
  updateAdress(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdresDto: UpdateAdresDto,
  ) {
    return this.usersService.updateAdress(id, updateAdresDto);
  }

  @Patch('fio/:id')
  @UseGuards(OwnDataGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user FIO with id' })
  updateFIO(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFIODto: UpdateFIODto,
  ) {
    return this.usersService.updateFIO(id, updateFIODto);
  }

  @Patch('passport/:id')
  @UseGuards(OwnDataGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user Passport with id' })
  updatePassport(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePassportDto: UpdatePassportDto,
  ) {
    return this.usersService.updatePassport(id, updatePassportDto);
  }

  @Patch('common/:id')
  @UseGuards(OwnDataGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user common data with id' })
  updateCommon(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhoneDto: UpdateCommonDto,
  ) {
    return this.usersService.updateCommon(id, updatePhoneDto);
  }
}
