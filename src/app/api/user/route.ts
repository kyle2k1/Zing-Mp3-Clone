import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/libs/prismadb';

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
    console.log('🚀 ~ error:', error);
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
    console.log('🚀 ~ error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
