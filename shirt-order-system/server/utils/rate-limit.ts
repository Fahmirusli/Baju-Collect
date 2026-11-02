import { eq, and, gte, lt, sql } from 'drizzle-orm';
import { createError } from 'h3';
import { rateLimits } from '../database/schema';

export interface RateLimitOptions {
  key: string;
  maxAttempts: number;
  windowMinutes: number;
  errorMessage?: string;
}

/**
 * Check whether a rate-limited action is allowed for the given key.
 * Supports both object options `{ key, maxAttempts, windowMinutes, errorMessage }`
 * and positional parameters `(db, key, maxAttempts, windowMinutes)`.
 */
export async function checkRateLimit(
  db: ReturnType<typeof import('./db').useDb>,
  keyOrOptions: string | RateLimitOptions,
  maxAttemptsArg?: number,
  windowMinutesArg?: number
): Promise<boolean> {
  let key: string;
  let maxAttempts: number;
  let windowMinutes: number;
  let errorMessage: string | undefined;

  if (typeof keyOrOptions === 'object' && keyOrOptions !== null) {
    key = keyOrOptions.key;
    maxAttempts = keyOrOptions.maxAttempts ?? 5;
    windowMinutes = keyOrOptions.windowMinutes ?? 15;
    errorMessage = keyOrOptions.errorMessage;
  } else {
    key = String(keyOrOptions);
    maxAttempts = maxAttemptsArg ?? 5;
    windowMinutes = windowMinutesArg ?? 15;
  }

  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMinutes * 60 * 1000);

  try {
    // Clean up old entries outside the window
    await db
      .delete(rateLimits)
      .where(lt(rateLimits.windowStart, windowStart));

    // Check current count within the window
    const existing = await db
      .select()
      .from(rateLimits)
      .where(
        and(
          eq(rateLimits.key, key),
          gte(rateLimits.windowStart, windowStart)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      const record = existing[0];

      if (record.count >= maxAttempts) {
        if (errorMessage) {
          throw createError({
            statusCode: 429,
            statusMessage: errorMessage,
            message: errorMessage,
          });
        }
        return false; // Blocked
      }

      // Increment count
      await db
        .update(rateLimits)
        .set({ count: sql`${rateLimits.count} + 1` })
        .where(eq(rateLimits.id, record.id));

      return true; // Allowed
    }

    // No existing record — insert a new one
    await db.insert(rateLimits).values({
      key,
      windowStart: now,
      count: 1,
    });

    return true; // Allowed
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'statusCode' in err) {
      throw err;
    }
    console.warn('[rate-limit] Non-fatal rate limit check error, allowing request:', err);
    return true;
  }
}
