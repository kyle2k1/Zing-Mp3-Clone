import * as client from './client';
import * as server from './server';

export const nodeEnv = (process.env.NODE_ENV || 'development') as 'development' | 'production';

// Server-only configs
export const { google, github, nextauth, database, email, stripe, api, validateEnv } = server;

// Client-safe configs
export const { cloudinary, envClient } = client;
