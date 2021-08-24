import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { config } from 'dotenv';

//TODO: handle this like normal human-being,"Fix the undefined apiKey when removing this"
config({ path: process.cwd() + '/.env' });

@Module({
  imports: [
    SendGridModule.forRoot({
      apikey: process.env.SEND_GRID_ACCESS_KEY,
    }),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
