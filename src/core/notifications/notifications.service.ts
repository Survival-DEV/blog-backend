import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/core/users/users.service';
import { sendVerificationEmail } from 'src/helpers';
import { ERRORS, JwtConstants } from '../../constants';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
  ) {}

  public async decodeConfirmationToken(accessToken: any): Promise<string> {
    try {
      const payload = await this.jwtService.verify(accessToken, {
        secret: JwtConstants.secret,
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException(ERRORS.EXPIRED_TOKEN);
      }
      throw new BadRequestException(ERRORS.BAD_TOKEN);
    }
  }

  public async confirmEmail(email: string) {
    const user = await this.usersService.findByEmailOrUsername(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException(ERRORS.USER_EMAIL_ALREADY_CONFIRMED);
    }
    return await this.usersService.markEmailAsConfirmed(email);
  }

  public async resendConfirmationEmail(username: string) {
    try {
      const { email, password, first_name, isEmailConfirmed } =
        await this.usersService.findByEmailOrUsername(username);
      if (isEmailConfirmed) {
        throw new BadRequestException('Email already confirmed');
      }
      await sendVerificationEmail({ email, password, firstName: first_name });
    } catch (error) {
      throw new Error(error);
    }
  }
}
