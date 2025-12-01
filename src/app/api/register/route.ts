import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

import logger from '@/libs/logger';
import prisma from '@/libs/prismadb';

const apiLogger = logger.scope('API:Register');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, username, password, image } = body;
    if (!email || !username || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        hashedPassword,
        image
      }
    });
    return NextResponse.json(user);
  } catch (error) {
    apiLogger.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
