import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '@user/dto/create-user.dto';
import { JwtConstants } from 'src/constants';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { TokenParams } from './interface/login-status.interface';
import { LoginCredentialsPayload } from './interface/payload.interface';
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

  //TODO: update that any type
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin({ email, password });

    if (user) {
      const { password, email, ...rest } = user;
      return rest;
    }
    //TODO: handle unsuccessfull login properly, first error cb
    return null;
  }

  async login({ email, password, firstName }: LoginUserDto) {
    const token = this._generateAuthToken({ email, password });

    return {
      firstName,
      ...token,
    };
  }

  private _generateAuthToken({
    email,
    password,
  }: LoginCredentialsPayload): TokenParams {
    return {
      expiresIn: JwtConstants.expiresIn,
      accessToken: this.jwtService.sign({ email, password }),
    };
  }
}
