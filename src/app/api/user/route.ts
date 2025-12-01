import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import logger from '@/libs/logger';
import prisma from '@/libs/prismadb';

const apiLogger = logger.scope('API:User');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, liked, songSrc } = body;
    if (!userId || !songSrc) {
      return new NextResponse('Missing info', { status: 400 });
    }
    const include = liked.includes(songSrc);
    let newLiked;
    if (liked.length === 0) {
      newLiked = [songSrc];
    } else if (include) {
      newLiked = liked.filter((prev: string) => prev !== songSrc);
    } else {
      liked.push(songSrc);
      newLiked = liked;
    }
    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        liked: newLiked
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    apiLogger.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(_: Request) {
  try {
    const currentUser = await getCurrentUser();
    const songs = await prisma.user.update({
      where: {
        id: currentUser?.id
      },
      data: {
        liked: {}
      }
    });
    return NextResponse.json(songs);
  } catch (error) {
    apiLogger.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
