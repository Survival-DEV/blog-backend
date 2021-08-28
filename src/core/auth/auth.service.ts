import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RegisterUserDto } from 'src/core/users/dto/create-user.dto';
import { JwtConstants } from 'src/constants';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';
import { TokenParams } from './interface/login-status.interface';
import { LoginCredentialsPayload } from './interface/payload.interface';
import { RegistrationStatus } from './interface/registeration-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly notificationService: NotificationsService,
  ) {}

  async register(data: RegisterUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Successfully registered',
    };

    try {
      const user = await this.usersService.create(data);

      if (user) {
        user.password = undefined;
        const { email, password, first_name: firstName } = user;
        const { accessToken } = await this._generateAuthToken({
          email,
          password,
        });

        const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${accessToken}`;
        await this.notificationService.sendVerificationEmail({
          email,
          firstName,
          verification_link: url,
        });
      }
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

  async login({ email, password, firstName }: LoginCredentialsPayload) {
    const token = this._generateAuthToken({ email, password });

    return {
      firstName,
      ...token,
    };
  }

  //TODO: this has to be private
  async _generateAuthToken({
    email,
    password,
  }: LoginCredentialsPayload): Promise<TokenParams> {
    return {
      expiresIn: JwtConstants.expiresIn,
      accessToken: await this.jwtService.signAsync({ email, password }),
    };
  }
}
