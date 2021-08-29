import { Request } from 'express';
import { UserEntity } from '../../../models/entities/user.entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}
