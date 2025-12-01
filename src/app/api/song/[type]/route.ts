import { NextResponse } from 'next/server';

import getCurrentUser from '@/actions/getCurrentUser';
import getArrSinger from '@/helpers/getArrSinger';
import logger from '@/libs/logger';
import prisma from '@/libs/prismadb';
import { User } from '@prisma/client';

const apiLogger = logger.scope('API:Song:Type');

interface SongParams {
  type: string;
}

export async function GET(_: Request, context: { params: SongParams }) {
  try {
    const { type } = context.params;
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('Unauthorized');
    const array = currentUser[type as keyof User];
    const typeQuery = type === 'liked' ? 'src' : 'id';
    const songs = await prisma.song.findMany({
      where: {
        userId: currentUser?.id,
        [typeQuery]: { in: array }
      }
    });
    const data = songs.map((song) => ({
      ...song,
      singers: getArrSinger(song.singers)
    }));
    return NextResponse.json(data);
  } catch (error) {
    apiLogger.error('Error:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
