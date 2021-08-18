import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../models/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByLogin({ email, password });

    if (user && user.password === password) {
      const { password, email, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { email: user.email, password: user.password };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
