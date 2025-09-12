import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

import getRandomOTP from '@/helpers/getRandomOTP';
import prisma from '@/libs/prismadb';

export async function GET(request: Request) {
  try {
    const body = await request.json();
    const { username } = body;
    if (!username) return new NextResponse('Missing info', { status: 400 });

    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });
    if (!user || !user.email) {
      return new NextResponse('Invalid user', { status: 400 });
    }
    const OTP = getRandomOTP();
    return NextResponse.json(OTP);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, newPassword } = body;
    if (!username) return new NextResponse('Missing info', { status: 400 });
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const user = await prisma.user.update({
      where: {
        username
      },
      data: {
        hashedPassword
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
