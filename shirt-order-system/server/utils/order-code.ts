import { eq } from 'drizzle-orm';
import { orders } from '../database/schema';

/** Safe character set – excludes ambiguous chars 0/O, 1/I/L */
const SAFE_CHARS = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const CODE_LENGTH = 5;
const PREFIX = 'SHIRT';
const MAX_RETRIES = 10;

/**
 * Generate a random order code in the format `SHIRT-XXXXX`.
 * Uses only non-ambiguous alphanumeric characters.
 */
export function generateOrderCode(): string {
  let suffix = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * SAFE_CHARS.length);
    suffix += SAFE_CHARS[randomIndex];
  }
  return `${PREFIX}-${suffix}`;
}

/**
 * Generate a unique order code that doesn't collide with existing codes in the database.
 * Retries up to 10 times before throwing.
 */
export async function getUniqueOrderCode(db: ReturnType<typeof import('./db').useDb>): Promise<string> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const code = generateOrderCode();

    const existing = await db
      .select({ id: orders.id })
      .from(orders)
      .where(eq(orders.code, code))
      .limit(1);

    if (existing.length === 0) {
      return code;
    }
  }

  throw createError({
    statusCode: 500,
    statusMessage: `Failed to generate a unique order code after ${MAX_RETRIES} attempts.`,
  });
}
