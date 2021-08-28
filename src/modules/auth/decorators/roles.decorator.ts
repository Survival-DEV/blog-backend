import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

export const ROLES_KEY = 'roles';
export const Permissions = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
