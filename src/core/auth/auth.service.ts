import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { generateAuthToken, sendVerificationEmail } from '../../helpers';
import { RegisterUserDto } from 'src/core/users/dto/create-user.dto';
import { LoginCredentialsPayload, RegistrationStatus } from './interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(data: RegisterUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Successfully registered',
    };

    try {
      const user = await this.usersService.createUser(data);
      if (user) {
        user.password = undefined;
        const { email, password, first_name: firstName } = user;
        await sendVerificationEmail({ email, password, firstName });
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
    const token = await generateAuthToken({ email, password });

    return {
      firstName,
      ...token,
    };
  }
}
