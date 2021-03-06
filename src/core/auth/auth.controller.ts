import {
  Body,
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import {
  CreateUserDto,
  RegisterUserDto,
} from '../../core/users/dto/create-user.dto';
import { LoginUserDto } from '../../core/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegistrationStatus } from './interface/registeration-status.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: [CreateUserDto] })
  async register(@Body() data: RegisterUserDto): Promise<RegistrationStatus> {
    const result = await this.authService.register(data);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @Redirect('/profile', 303)
  @ApiBody({ type: [LoginUserDto] })
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
