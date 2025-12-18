import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { env } from '@/env.mjs';

const getBaseURL = () => {
  // Production: custom domain (set BETTER_AUTH_URL in Vercel production env)
  if (env.BETTER_AUTH_URL) {
    return env.BETTER_AUTH_URL;
  }
  // Vercel PR previews: auto-generated URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Local development
  return 'http://localhost:3000';
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: env.BETTER_AUTH_SECRET,
  baseURL: getBaseURL(),
  basePath: '/api/auth',
});

export type Session = typeof auth.$Infer.Session;
