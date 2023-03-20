import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/auth-login.dto';
import { RegistrationDto } from './dto/auth-registration.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin(login);
    if (!user)
      throw new HttpException(
        "User with this name doesn't exist",
        HttpStatus.FORBIDDEN,
      );
    if (bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const payload = await this.validateUser(loginDto.login, loginDto.password);
    console.log('login func');
    console.log(payload);
    return {
      access_token: this.jwtService.sign({ ...payload }),
    };
  }

  async registration(registrationDto: RegistrationDto) {
    const user = await this.usersService.create(registrationDto);
    console.log(user);
    return this.login(user);
  }
}
