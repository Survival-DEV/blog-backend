export default {
  // COMMON ERRORS
  UNIQUE_VIOLATION: 'Another record with the same identifier already exists',

  // USER CUSTOM ERRORS
  USER_NOT_FOUND:
    'A user with the identification document entered does not exist',
  USER_EMAIL_NOT_VERIFIED:
    'It is required to activate the account to be able to enter, please check your email to proceed with the activation',
  USERNAME_ALREADY_EXISTS: 'A user with the entered username already exists',
  USER_EMAIL_ALREADY_EXISTS: 'A user with the entered email already exists',
  USER_EMAIL_ALREADY_CONFIRMED:
    'A user with this email is already confirmed his/her account',
  INVALID_CREDENTIALS: 'password or email are incorrect',
  EXPIRED_TOKEN: 'Email confirmation token expired',
  BAD_TOKEN: 'Bad confirmation token',

  // ROLE CUSTOM ERRORS
  ROLE_USER_DELETION: 'User role cannot be removed',
  ROLE_ADMIN_DELETION: 'Admin role cannot be removed',
};
