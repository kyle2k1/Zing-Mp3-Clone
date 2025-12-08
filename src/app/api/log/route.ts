import { NextResponse } from 'next/server';

import logger from '@/libs/logger';

const apiLogger = logger.scope('API:Log');

interface LogRequest {
  level: 'info' | 'error';
  message: string;
  context?: unknown;
}

export async function POST(request: Request) {
  try {
    const body: LogRequest = await request.json();
    const { level, message, context } = body;

    // Transfer to store using server-side logger
    logger.transferToStore({
      level,
      message,
      context,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    apiLogger.error('Error logging to store:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

