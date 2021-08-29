import { config } from 'dotenv';

config();
export default class JwtConstants {
  static readonly secret: string = process.env.JWT_VERIFICATION_TOKEN_SECRET;
  static readonly expiresIn: string =
    Date.now() + process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME;
  static readonly redirectURL: string = process.env.EMAIL_CONFIRMATION_URL;
}
