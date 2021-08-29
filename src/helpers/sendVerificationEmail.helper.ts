import { config } from 'dotenv';
import { Client } from '@sendgrid/client';
import { MailService } from '@sendgrid/mail';
import { generateAuthToken } from './tokenGenerator.helper';

config();
const SendGridService = new MailService();
SendGridService.setApiKey(process.env.SEND_GRID_ACCESS_KEY);
SendGridService.setClient(new Client());
SendGridService.setSubstitutionWrappers('{{', '}}');

export const sendVerificationEmail = async ({
  email,
  password,
  firstName,
}): Promise<void> => {
  try {
    const { accessToken } = await generateAuthToken({
      email,
      password,
    });
    const verification_link = `${process.env.EMAIL_CONFIRMATION_URL}?token=${accessToken}`;

    await SendGridService.send({
      to: email,
      from: process.env.FROM_EMAIL,
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      dynamicTemplateData: {
        subject: 'Verification Email',
        firstName,
        verification_link,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};
