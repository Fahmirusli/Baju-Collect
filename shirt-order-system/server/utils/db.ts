import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../database/schema';

/**
 * Returns a Drizzle ORM database instance connected to Neon PostgreSQL.
 * Retries once on cold-start connection errors.
 */
export function useDb() {
  const config = useRuntimeConfig();
  const databaseUrl = config.databaseUrl as string;

  if (!databaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'DATABASE_URL is not configured. Set NUXT_DATABASE_URL in your environment.',
    });
  }

  try {
    const client = neon(databaseUrl);
    const db = drizzle(client, { schema });
    return db;
  } catch (error: unknown) {
    // Retry once for cold-start / transient connection errors
    console.warn('[db] Initial connection failed, retrying once...', error);

    try {
      const client = neon(databaseUrl);
      const db = drizzle(client, { schema });
      return db;
    } catch (retryError: unknown) {
      console.error('[db] Retry failed:', retryError);
      throw createError({
        statusCode: 503,
        statusMessage: 'Database connection failed. Please try again later.',
      });
    }
  }
}
