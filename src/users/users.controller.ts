import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateFIODto } from './dto/update-user-fio.dto';
import { UpdateAddressDto } from './dto/update-user-address.dto';
import { UpdatePassportDto } from './dto/update-user-passport.dto';
import { UpdateCommonDto } from './dto/update-user-common.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnDataGuard } from 'src/auth/guards/owndate.guard';
import { UpdatePermissionDto } from './dto/update-permission-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseToRequestsDTO } from './dto/response-to-request.dto';

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
  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find user with id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user with id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user with id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }

  @Patch('address/:id')
  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user Address with id' })
  updateAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.usersService.updateAddresss(id, updateAddressDto);
  }

  @Patch('fio/:id')
  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user FIO with id' })
  updateFIO(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFIODto: UpdateFIODto,
  ) {
    return this.usersService.updateFIO(id, updateFIODto);
  }

  @Patch('passport/:id')
  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user Passport with id' })
  updatePassport(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePassportDto: UpdatePassportDto,
  ) {
    return this.usersService.updatePassport(id, updatePassportDto);
  }

  @Patch('common/:id')
  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user common data with id' })
  updateCommon(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePhoneDto: UpdateCommonDto,
  ) {
    return this.usersService.updateCommon(id, updatePhoneDto);
  }

  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @Patch('permission/:id')
  @ApiOperation({
    summary: 'Updates permissions to receive data by the operator',
  })
  updatePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.usersService.updatePermission(id, updatePermissionDto);
  }

  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @Get('operators/:id')
  @ApiOperation({ summary: 'Return all user operators' })
  getAllUserOperators(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getAllUserOperators(id);
  }

  @Patch('uploadphoto/:id')
  @UseInterceptors(FileInterceptor('photo'))
  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Return all user operators' })
  updateUserPhoto(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() photo,
  ) {
    return this.usersService.updateUserPhoto(id, photo);
  }

  @Get('profile/:id')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getProfile(id);
  }

  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Return all request sended to users' })
  @Get('requests/:id')
  getRequests(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getRequests(id);
  }

  // @UseGuards(OwnDataGuard)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Return all request sended to users' })
  @Get('requests/:id')
  responseToRequests(
    @Param('id', ParseIntPipe) id: number,
    @Body() responseToRequests: ResponseToRequestsDTO,
  ) {
    return this.usersService.responseToRequests(id, responseToRequests);
  }
}
