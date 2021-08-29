import { PartialType } from '@nestjs/mapped-types';
export class JwtPayload {
  firstName: string;
  accessToken: string;
  expiresIn: string;
}

export class TokenParams extends PartialType(JwtPayload) {}
