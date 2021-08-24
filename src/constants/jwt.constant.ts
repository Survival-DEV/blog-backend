export default class JwtConstants {
  //TODO: fix this initialization
  static readonly secret: string =
    process.env.JWT_VERIFICATION_TOKEN_SECRET || '123';
  static readonly expiresIn: string =
    Date.now() + process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME || '60s';
  static readonly redirectURL: string =
    process.env.EMAIL_CONFIRMATION_URL || '/dummy';
}
