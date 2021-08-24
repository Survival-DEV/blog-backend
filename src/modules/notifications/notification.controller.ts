import {
  Controller,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer/class-serializer.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-user.interface';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { NotificationsService } from './notifications.service';

@Controller('confirm-email')
@UseInterceptors(ClassSerializerInterceptor)
export class NotificationsController {
  constructor(private notification: NotificationsService) {}

  @Post()
  async confirm(@Query('token') token: ConfirmEmailDto) {
    const email = await this.notification.decodeConfirmationToken(token);
    await this.notification.confirmEmail(email);
  }

  @Post('resend')
  @UseGuards(JwtAuthGuard)
  async resendConfirmationLink(@Req() req: RequestWithUser) {
    await this.notification.resendConfirmationEmail(req.user.id);
  }
}
