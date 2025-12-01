namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;

    STRIPE_WEBHOOK_SECRET: string;
    STRIPE_API_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    
    GITHUB_ID: string;
    GITHUB_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;

    DATABASE_URL: string;
    
    EMAIL_ADDRESS: string;
    EMAIL_PASSWORD: string;

    NODE_ENV: string;
  }
}
