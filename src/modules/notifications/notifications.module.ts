import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { config } from 'dotenv';



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
