import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from '../constants';
import { TokenParams } from '../core/auth/interface/login-status.interface';
import { LoginPayload } from '../core/auth/interface/payload.interface';

const jwtService = new JwtService({
  secret: JwtConstants.secret,
  signOptions: { expiresIn: JwtConstants.expiresIn },
});

export const generateAuthToken = async ({
  email,
  password,
}: LoginPayload): Promise<TokenParams> => {
  return {
    expiresIn: JwtConstants.expiresIn,
    accessToken: await jwtService.sign({ email, password }),
  };
};
