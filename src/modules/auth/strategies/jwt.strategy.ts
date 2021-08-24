import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtConstants } from '../../../constants';
import {
  LoginPayload,
} from '../interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.secret,
    });
  }

  async validate(payload: LoginPayload) {
    return { email: payload.email, password: payload.password };
  }
}
