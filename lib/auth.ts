import { cookies } from 'next/headers';

export type SessionUser = {
  userId: string;
  email: string;
  username: string;
  displayName: string;
};

export function setSessionCookie(session: SessionUser) {
  const cookieStore = cookies();
  cookieStore.set('vanta_session', JSON.stringify(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete('vanta_session');
}

export function readSessionCookie(): SessionUser | null {
  try {
    const cookieStore = cookies();
    const raw = cookieStore.get('vanta_session')?.value;
    if (!raw) return null;
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export async function requireSession() {
  const session = readSessionCookie();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}

export async function comparePassword(password: string, hash: string) {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string) {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 10);
}
