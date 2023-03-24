import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      throw new UnauthorizedException({
        message: "User with this name doesn't exist",
      });
    const passEqual = await bcrypt.compare(password, user.password);
    if (user && passEqual) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong username or password' });
  }

  async login(loginDto: LoginDto) {
    const { password, ...payload } = await this.validateUser(
      loginDto.login,
      loginDto.password,
    );
    return {
      access_token: this.jwtService.sign({ ...payload }),
    };
  }

  async registration(registrationDto: RegistrationDto) {
    const user = await this.usersService.create(registrationDto);
    return await this.login(user);
  }
}
