import { eq, and, gte, lt, sql } from 'drizzle-orm';
import { rateLimits } from '../database/schema';

/**
 * Check whether a rate-limited action is allowed for the given key.
 *
 * @param db       Drizzle database instance
 * @param key      Identifier for the rate limit (e.g., IP hash, action name)
 * @param maxAttempts  Maximum number of attempts allowed within the window
 * @param windowMinutes  Duration of the sliding window in minutes
 * @returns `true` if the action is allowed, `false` if blocked
 */
export async function checkRateLimit(
  db: ReturnType<typeof import('./db').useDb>,
  key: string,
  maxAttempts: number,
  windowMinutes: number
): Promise<boolean> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMinutes * 60 * 1000);

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
}
