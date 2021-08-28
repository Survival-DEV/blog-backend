import { Request } from 'express';
import { UserEntity } from '../../../models/entities/user.entity';

export class RequestWithUser extends Request {
  user: UserEntity;
}
