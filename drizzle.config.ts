import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load environment variables from .env.local before validation
config({ path: '.env.local' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
