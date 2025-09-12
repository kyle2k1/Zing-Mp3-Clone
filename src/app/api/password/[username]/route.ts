import { NextResponse } from 'next/server';

import transporter from '@/helpers/(sendMail)/sendMail';
import getRandomOTP from '@/helpers/getRandomOTP';
import prisma from '@/libs/prismadb';

export async function GET(request: Request, response: Response) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
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
