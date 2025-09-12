import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import getArrSinger from '@/helpers/getArrSinger';
import prisma from '@/libs/prismadb';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    const id = currentUser?.updated.concat(currentUser?.liked);
    const songs = await prisma.song.findMany({
      where: {
        id: { in: id }
      }
    });
    const liked: any[] = [];
    const updated = songs
      .filter((song) => {
        if (currentUser?.updated.includes(song.id)) return true;
        liked.push({ ...song, singers: getArrSinger(song.singers) });
        return false;
      })
      .map((song) => ({ ...song, singers: getArrSinger(song.singers) }));
    return NextResponse.json([updated, liked]);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { title, singer, audio, image, link, type, duration } = body;
    if (!title || !singer || !audio) {
      return new NextResponse('Missing info', { status: 400 });
    }

    const song = await prisma.song.create({
      // @ts-ignore
      data: {
        singers: singer,
        songName: title,
        category: type,
        src: audio,
        link,
        image,
        duration,
        userId: currentUser?.id as string
      }
    });
    currentUser?.updated.push(song.id);
    if (!song) return new NextResponse('Error', { status: 400 });
    const user = await prisma.user.update({
      data: {
        updated: currentUser?.updated
      },
      where: {
        id: song.userId
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const songs = await prisma.song.deleteMany({});
    return NextResponse.json(songs);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
