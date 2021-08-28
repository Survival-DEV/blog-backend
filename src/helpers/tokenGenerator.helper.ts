import { JwtService } from '@nestjs/jwt';
import { JwtConstants } from 'src/constants';
import { TokenParams } from 'src/core/auth/interface/login-status.interface';
import { LoginCredentialsPayload } from 'src/core/auth/interface/payload.interface';

export const generateAuthToken = async ({
  email,
  password,
}: LoginCredentialsPayload): Promise<TokenParams> => {
  return {
    expiresIn: JwtConstants.expiresIn,
    accessToken: await JwtService.signAsync({ email, password }),
  };
};
