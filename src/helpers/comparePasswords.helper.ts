import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import bcrypt from 'bcrypt';
import { ERRORS } from '../constants';

export const comparePasswords = async (userPassword, currentPassword) => {
  const arePasswordsMatched = await bcrypt.compare(
    currentPassword,
    userPassword,
  );
  if (!arePasswordsMatched) {
    throw new HttpException(
      ERRORS.INVALID_CREDENTIALS,
      HttpStatus.UNAUTHORIZED,
    );
  }
};
