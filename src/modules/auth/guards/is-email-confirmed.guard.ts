import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@user/users.service';
import RequestWithUser from '../interface/request-user.interface';

@Injectable()
export class EmailConfirmationGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) { }
  
  canActivate(context: ExecutionContext) {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    if (!request.user?.isEmailConfirmed) {
      throw new UnauthorizedException('Confirm your email first');
    }
    return true;
  }
}