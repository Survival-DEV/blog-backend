import { config } from 'dotenv';
import { ClientResponse, MailService, ResponseError } from '@sendgrid/mail';
import { generateAuthToken } from './tokenGenerator.helper';
import { HttpException, HttpStatus } from '@nestjs/common';

config();
const SendGridService = new MailService();
SendGridService.setApiKey(process.env.SEND_GRID_ACCESS_KEY);

export const sendVerificationEmail = async ({
  email,
  password,
  username,
}): Promise<[ClientResponse, {}]> => {
  try {
    const { accessToken } = await generateAuthToken({
      email,
      password,
    });
    const verification_link = `${process.env.EMAIL_CONFIRMATION_URL}?token=${accessToken}`;

    return await SendGridService.send({
      to: email,
      from: process.env.FROM_EMAIL,
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      dynamicTemplateData: {
        subject: 'Verification Email',
        username,
        verification_link,
      },
    });
  } catch (error) {
    if (error instanceof ResponseError) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
};
