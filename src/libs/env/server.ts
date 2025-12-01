const isServer = typeof window === 'undefined';
const nodeEnv = process.env.NODE_ENV || 'development';

function getEnv(key: string, required = true): string {
  if (!isServer) {
    return '';
  }
  const value = process.env[key];
  if (!value || value.trim() === '') {
    if (required && nodeEnv === 'production') {
      throw new Error(`Required environment variable ${key} is not set`);
    }
    return '';
  }
  return value;
}

function getNextAuthUrl(): string {
  if (nodeEnv === 'development') {
    return 'http://localhost:3000';
  }
  return getEnv('NEXTAUTH_URL');
}

function getApiUrl(): string {
  if (nodeEnv === 'development') {
    return 'http://localhost:3000';
  }
  return getEnv('NEXT_PUBLIC_API_URL');
}

// =========================
// SERVER-ONLY CONFIGS
// =========================

export const google = isServer
  ? {
      clientId: getEnv('GOOGLE_CLIENT_ID'),
      clientSecret: getEnv('GOOGLE_CLIENT_SECRET')
    }
  : { clientId: '', clientSecret: '' };

export const github = isServer
  ? {
      clientId: getEnv('GITHUB_ID'),
      clientSecret: getEnv('GITHUB_SECRET')
    }
  : { clientId: '', clientSecret: '' };

export const nextauth = {
  secret: getEnv('NEXTAUTH_SECRET'),
  url: getNextAuthUrl()
} as const;

export const database = isServer ? { url: getEnv('DATABASE_URL') } : { url: '' };

export const email = isServer
  ? {
      address: getEnv('EMAIL_ADDRESS'),
      password: getEnv('EMAIL_PASSWORD')
    }
  : { address: '', password: '' };

export const stripe = {
  webhookSecret: getEnv('STRIPE_WEBHOOK_SECRET'),
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  apiKey: getEnv('STRIPE_API_KEY')
} as const;

// =========================
// SHARED CONFIGS (for server usage)
// =========================

export const api = {
  url: getApiUrl()
} as const;

export function validateEnv(): void {
  if (!isServer) return;

  const required = [
    'NEXT_PUBLIC_API_URL',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_API_KEY',
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'GITHUB_ID',
    'GITHUB_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'DATABASE_URL',
    'EMAIL_ADDRESS',
    'EMAIL_PASSWORD'
  ];

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Required environment variable ${key} is not set`);
    }
  }
}
