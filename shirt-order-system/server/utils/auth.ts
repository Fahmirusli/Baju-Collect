import { type H3Event, createError } from 'h3';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Require an authenticated admin session.
 * Throws a 401 error if the user is not logged in or is not an admin.
 */
export async function requireAdminSession(event: H3Event): Promise<void> {
  const session = await getUserSession(event);

  if (!session?.user || (session.user as Record<string, unknown>).role !== 'admin') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized. Admin access required.',
    });
  }
}

/**
 * Hash a plaintext password using bcryptjs.
 */
export async function hashBcryptPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a plaintext password against a bcryptjs hash.
 */
export async function verifyBcryptPassword(password: string, hash: string): Promise<boolean> {
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
}

// Backwards-compatible aliases
export const hashPassword = hashBcryptPassword;
export const verifyPassword = verifyBcryptPassword;
