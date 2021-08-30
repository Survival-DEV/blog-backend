import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { generateAuthToken, sendVerificationEmail } from '../../helpers';
import { RegisterUserDto } from '../../core/users/dto/create-user.dto';
import { RegistrationStatus } from './interface';
import { ERRORS } from '../../constants';

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
        await this.usersService.saveUser(user);
        user.password = undefined;
        const { id, email, username } = user;
        await sendVerificationEmail({ id, username, email });
      }
    } catch (error) {
      return (status = {
        success: false,
        message: error.detail,
      });
    }
    return status;
  }

  //TODO: update that any type
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin({ email, password });

    if (user) {
      const { password, ...rest } = user;
      return rest;
    }
    throw new HttpException(ERRORS.BAD_TOKEN, HttpStatus.UNAUTHORIZED);
  }

  async login(user: any) {
    const { id, email, username, first_name, last_name } = user;
    const token = await generateAuthToken({ id, username, email });

    return {
      first_name,
      last_name,
      ...token,
    };
  }
}
