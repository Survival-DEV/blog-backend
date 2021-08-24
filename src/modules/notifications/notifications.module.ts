import { forwardRef, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { config } from 'dotenv';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '@user/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from 'src/constants';
import { NotificationsController } from './notification.controller';

//TODO: handle this like normal human-being,"Fix the undefined apiKey when removing this"
config({ path: process.cwd() + '/.env' });

@Module({
  imports: [
    forwardRef(() => AuthModule),
    SendGridModule.forRoot({
      apikey: process.env.SEND_GRID_ACCESS_KEY,
    }),

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
