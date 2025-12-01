/**
 * Ping the database to ensure connection is working
 * This tests the database connection at application startup
 */
async function pingDatabase() {
  try {
    const prisma = (await import('./libs/prismadb')).default;

    // Prisma manages the connection pool, so we don't need to disconnect
    await prisma.$connect();

    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw new Error(
      'Failed to connect to database. Please check your DATABASE_URL and ensure the database is accessible.'
    );
  }
}

export async function register() {
  console.log('🚀 Instrumentation register() called');
  console.log('NEXT_RUNTIME:', process.env.NEXT_RUNTIME);
  console.log('NODE_ENV:', process.env.NODE_ENV);

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { validateEnv } = await import('./libs/env');
      validateEnv();
      console.log('✅ Environment variables validated');

      await pingDatabase();
    } catch (error) {
      console.error('❌ Startup validation failed:', error);
      if (process.env.NODE_ENV === 'production') {
        throw error;
      }
      console.warn('⚠️ Startup validation warning (non-fatal in development):', error);
    }
  } else {
    console.log('⚠️ Not running on Node.js runtime, skipping validation');
  }
}
