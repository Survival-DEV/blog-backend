import { Request } from 'express';
import { UserEntity } from '../../../models/entities/user.entity';

interface RequestWithUser extends Request {
  user: UserEntity;
}

export default RequestWithUser;
