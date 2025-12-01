import logger from './libs/logger';

const instrumentationLogger = logger.scope('Instrumentation');

/**
 * Ping the database to ensure connection is working
 * This tests the database connection at application startup
 */
async function pingDatabase() {
  try {
    const prisma = (await import('./libs/prismadb')).default;

    // Prisma manages the connection pool, so we don't need to disconnect
    await prisma.$connect();

    instrumentationLogger.info('Database connection successful');
  } catch (error) {
    instrumentationLogger.error('Database connection failed:', error);
    throw new Error(
      'Failed to connect to database. Please check your DATABASE_URL and ensure the database is accessible.'
    );
  }
}

export async function register() {
  instrumentationLogger.info('Instrumentation register() called');
  instrumentationLogger.info('NEXT_RUNTIME:', process.env.NEXT_RUNTIME);
  instrumentationLogger.info('NODE_ENV:', process.env.NODE_ENV);

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { validateEnv } = await import('./libs/env');
      validateEnv();
      instrumentationLogger.info('Environment variables validated');

      await pingDatabase();
    } catch (error) {
      instrumentationLogger.error('Startup validation failed:', error);
      if (process.env.NODE_ENV === 'production') {
        throw error;
      }
      instrumentationLogger.error('Startup validation warning (non-fatal in development):', error);
    }
  } else {
    instrumentationLogger.info('Not running on Node.js runtime, skipping validation');
  }
}
