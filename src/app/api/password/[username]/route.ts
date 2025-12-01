import { NextResponse } from 'next/server';

import transporter from '@/helpers/(sendMail)/sendMail';
import getRandomOTP from '@/helpers/getRandomOTP';
import prisma from '@/libs/prismadb';

interface PasswordParams {
  username: string;
}

export async function GET(_: Request, context: { params: PasswordParams }) {
  try {
    const { username } = context.params;
    if (!username) return new NextResponse('Missing info', { status: 400 });

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });
    if (!user || !user?.email) {
      return new NextResponse('Invalid user', { status: 400 });
    }
    const OTP = getRandomOTP();
    await transporter(user.email, OTP).catch((err) => {
      console.log(err);
      return new NextResponse('Fail to send mail', { status: 400 });
    });
    return NextResponse.json(OTP);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
