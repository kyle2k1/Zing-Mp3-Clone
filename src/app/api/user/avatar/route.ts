import { NextResponse } from 'next/server';

import prisma from '@/libs/prismadb';

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
    console.log('🚀 ~ error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
