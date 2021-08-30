export class LoginCredentialsPayload {
  email: string;
  password: string;
  username: string;
  first_name: string;
  last_name: string;
}

export class LoginPayload {
  email: string;
  password: string;
}

export class TokenPayload {
  id: string;
  username: string;
  email: string;
  sub?: string;
  name?: string;
}
