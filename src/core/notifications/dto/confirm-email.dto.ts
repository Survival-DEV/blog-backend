import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmEmailDto {
  token: string;
}
