import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { generateAuthToken, sendVerificationEmail } from '../../helpers';
import { RegisterUserDto } from '../../core/users/dto/create-user.dto';
import { LoginCredentialsPayload, RegistrationStatus } from './interface';
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
        await this.usersService.save(user);
        user.password = undefined;
        const { email, password, username } = user;

        await sendVerificationEmail({ email, password, username });
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
      const { password, email, ...rest } = user;
      return rest;
    }
    throw new HttpException(ERRORS.BAD_TOKEN, HttpStatus.UNAUTHORIZED);
  }

  async login(user: LoginCredentialsPayload) {
    const { email, password, first_name, last_name } = user;
    const token = await generateAuthToken({ email, password });

    return {
      first_name,
      last_name,
      ...token,
    };
  }
}
