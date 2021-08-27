export class LoginCredentialsPayload {
  email: string;
  //TODO: Back to this optional entry of password
  password: string;
  firstName?: string;
}

export class LoginPayload {
  email: string;
  password: string;
}
