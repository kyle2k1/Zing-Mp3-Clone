const nodeEnv = process.env.NODE_ENV || 'development';

function getApiUrl(): string {
  if (nodeEnv === 'development') {
    return 'http://localhost:3000';
  }
  const value = process.env.NEXT_PUBLIC_API_URL;
  if (!value) {
    throw new Error('NEXT_PUBLIC_API_URL is required in production');
  }
  return value;
}

function getNextAuthUrl(): string {
  if (nodeEnv === 'development') {
    return 'http://localhost:3000';
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:3000';
}

function getCloudinaryCloudName(): string {
  const value = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!value && nodeEnv === 'production') {
    throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is required in production');
  }
  return value || '';
}

function getStripePublishableKey(): string {
  const value = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!value && nodeEnv === 'production') {
    throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is required in production');
  }
  return value || '';
}

export const api = {
  url: getApiUrl()
} as const;

export const cloudinary = {
  cloudName: getCloudinaryCloudName()
} as const;

export const nextauth = {
  url: getNextAuthUrl()
} as const;

export const stripe = {
  publishableKey: getStripePublishableKey()
} as const;

export const envClient = {
  nextauth,
  api,
  cloudinary,
  stripe
} as const;
