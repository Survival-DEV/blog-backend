import { LoginUserDto } from '@user/dto/login-user.dto';

export interface LoginStatus {
  email: string;
  accessToken: string;
  expiresIn: string;
}
