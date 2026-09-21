
import { cookies } from 'next/headers';
import crypto from 'crypto';
import { UserSession } from '@/types';

const SESSION_COOKIE_NAME = 'mw_carbon_session';
const SECRET_KEY = process.env.APP_SECRET || 'manila-wine-champagne-carbon-secret-2026';

export function signSessionToken(payload: object): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifySessionToken<T = unknown>(token: string): T | null {
  try {
    const [data, sig] = token.split('.');
    if (!data || !sig) return null;
    const expectedSig = crypto.createHmac('sha256', SECRET_KEY).update(data).digest('base64url');
    if (sig !== expectedSig) return null;
    const jsonStr = Buffer.from(data, 'base64url').toString('utf-8');
    return JSON.parse(jsonStr) as T;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    const decoded = verifySessionToken<{ userId: string; email: string; role: 'admin' | 'user' }>(token);
    if (!decoded || decoded.role !== 'admin') return null;

    return {
      id: decoded.userId,
      email: decoded.email,
      display_name: 'Administrator',
      role: 'admin',
    };
  } catch {
    return null;
  }
}
