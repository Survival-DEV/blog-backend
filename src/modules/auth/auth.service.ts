import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { RegistrationStatus } from './interface/registeration-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Successfully registered',
    };

    try {
      await this.usersService.create(data);
    } catch (error) {
      status = {
        success: false,
        message: error,
      };
    }

    return status;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin({ email, password });

    if (user) {
      const { password, email, ...rest } = user;
      return rest;
    }
    //TODO: handle unsuccessfull login properly
    return null;
  }

  async login({ email, password, firstName }: LoginUserDto) {
    return {
      user_Name: firstName,
      access_token: this.jwtService.sign({ email, password }),
    };
  }
}
