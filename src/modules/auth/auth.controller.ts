import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegistrationStatus } from './interface/registeration-status.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationsService,
  ) {}

  @Post('signup')
  @ApiBody({ type: [CreateUserDto] })
  async register(@Body() data: CreateUserDto): Promise<RegistrationStatus> {
    const result = await this.authService.register(data);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    if (result.success) {
      try {
        const { email, first_name } = data;
        await this.notificationService.sendVerificationEmail({
          email,
          firstName: first_name,
        });
      } catch (error) {
        throw new Error(error);
      }
    }
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: [LoginUserDto] })
  async login(@Request() req): Promise<any> {
    const { email, password, first_name: firstName } = req.user;
    return this.authService.login({ email, password, firstName });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}