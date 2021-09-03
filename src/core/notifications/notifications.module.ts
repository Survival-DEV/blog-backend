import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from '@auth/auth.module';
import { UsersModule } from '@users/users.module';
import { JwtConstants } from '@constants/';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notification.controller';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: JwtConstants.expiresIn },
    }),
    UsersModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
