import { SendGridService } from '@anchan828/nest-sendgrid';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@user/users.service';
import { ERRORS } from '../../constants';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly sendGridService: SendGridService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
  ) {}

  async sendVerificationEmail({
    email,
    firstName,
    verification_link,
  }): Promise<void> {
    try {
      await this.sendGridService.send({
        to: email,
        from: process.env.FROM_EMAIL,
        templateId: process.env.SENDGRID_TEMPLATE_ID,
        dynamicTemplateData: {
          subject: 'Verification Email',
          firstName,
          verification_link,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async confirmEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException(ERRORS.USER_EMAIL_ALREADY_CONFIRMED);
    }
    await this.usersService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(accessToken: any) {
    try {
      const payload = await this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
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

  async resendConfirmationEmail(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }
    //TODO: Redundunt lines as authService/register
    const { email, password } = user;
    const { accessToken } = await this.authService._generateAuthToken({
      email,
      password,
    });
    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${accessToken}`;
    await this.sendVerificationEmail({
      email: user.email,
      firstName: user.first_name,
      verification_link: url,
    });
  }
}
