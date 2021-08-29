import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from 'src/constants';
import { TokenParams } from 'src/core/auth/interface/login-status.interface';
import { LoginCredentialsPayload } from 'src/core/auth/interface/payload.interface';

const jwtService = new JwtService({
  secret: JwtConstants.secret,
  signOptions: { expiresIn: JwtConstants.expiresIn },
});

export const generateAuthToken = async ({
  email,
  password,
}: LoginCredentialsPayload): Promise<TokenParams> => {
  return {
    expiresIn: JwtConstants.expiresIn,
    accessToken: await jwtService.signAsync({ email, password }),
  };
};
