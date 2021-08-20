export const PROD_ENV = 'production';
export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.EXPIRESIN,
};

export { default as ERRORS } from './errors';
