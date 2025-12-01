import { NextResponse } from 'next/server';

import logger from '@/libs/logger';
import prisma from '@/libs/prismadb';

const apiLogger = logger.scope('API:User:Avatar');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, image } = body;
    if (!userId || !image) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        image
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    apiLogger.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
