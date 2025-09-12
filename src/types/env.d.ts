namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;

    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;

    GITHUB_ID: string;
    GITHUB_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;

    DATABASE_URL: string;

    EMAIL_ADDRESS: string;
    EMAIL_PASSWORD: string;

    STRIPE_API_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
  }
}
