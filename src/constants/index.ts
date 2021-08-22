export const PROD_ENV = 'production';
export class JwtConstants {
  //TODO: fix this initialization
  static readonly secret: string = process.env.JWT_SECRET || '123';
  static readonly expiresIn: string = process.env.EXPIRESIN || '60s';
}

export { default as ERRORS } from './errors';
