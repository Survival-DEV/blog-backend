import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';


@Injectable()
export class NotificationsService {
  constructor(private readonly sendGridService: SendGridService) {}

  async sendVerificationEmail({ email, firstName }): Promise<void> {
    try {
      await this.sendGridService.send({
        to: email,
        from: process.env.FROM_EMAIL,
        templateId: process.env.SENDGRID_TEMPLATE_ID,
        dynamicTemplateData: {
          subject: 'Verification Email',
          firstName,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
