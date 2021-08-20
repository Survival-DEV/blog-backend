import { Controller, UseGuards, Get, Post, Request } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { LoginUserDto } from './modules/users/dto/login-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: [LoginUserDto] })
  async login(@Request() req): Promise<any> {
    const { email, password } = req.user;
    return this.authService.login({ email, password });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
