import { render } from '@react-email/render';
import nodemailer from 'nodemailer';

import { email } from '@/libs/env';

import template from './template';

const transporter = async (userEmail: string, otp: number) => {
  const html = await render(template(otp), { pretty: true });
  const nodeConfig = {
    port: 587,
    host: 'smtp.ethereal.email',
    service: 'gmail',
    secure: false,
    auth: {
      user: email.address,
      pass: email.password
    }
  };
  const message = {
    from: email.address,
    to: userEmail,
    subject: 'Signup Successful',
    text: 'Hello',
    html
  };
  return nodemailer.createTransport(nodeConfig).sendMail(message);
};

export default transporter;
