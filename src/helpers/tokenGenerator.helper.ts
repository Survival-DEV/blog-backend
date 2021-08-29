import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from '../constants';
import { TokenParams } from '../core/auth/interface/login-status.interface';
import { TokenPayload } from '../core/auth/interface/payload.interface';

const jwtService = new JwtService({
  secret: JwtConstants.secret,
  signOptions: { expiresIn: JwtConstants.expiresIn },
});

export const generateAuthToken = async ({
  id,
  username,
  email,
}: TokenPayload): Promise<TokenParams> => {
  return {
    expiresIn: JwtConstants.expiresIn,
    accessToken: await jwtService.sign({
      id,
      username,
      email,
    }),
  };
};
