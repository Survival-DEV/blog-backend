import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';

import { NotificationsService } from './notifications.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../../core/users/users.module';
import { JwtConstants } from '../../constants';
import { NotificationsController } from './notification.controller';

//TODO: handle this like normal human-being,"Fix the undefined apiKey when removing this"
config({ path: process.cwd() + '/.env' });

@Module({
  imports: [
    forwardRef(() => AuthModule),
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
