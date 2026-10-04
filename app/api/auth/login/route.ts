import { NextResponse } from 'next/server';
import { comparePassword, setSessionCookie } from '@/lib/auth';
import { createMockUser, findUserByEmail, findUserByUsername } from '@/lib/mock-store';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    if (process.env.DATABASE_URL) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.passwordHash) {
        return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
      }

      const valid = await comparePassword(password, user.passwordHash);
      if (!valid) {
        return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
      }

      const session = { userId: user.id, email: user.email, username: user.username, displayName: user.displayName };
      setSessionCookie(session);
      return NextResponse.json({ success: true, user: session });
    }

    const user = findUserByEmail(email) || findUserByUsername(email);
    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    const valid = await comparePassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
    }

    setSessionCookie({ userId: user.id, email: user.email, username: user.username, displayName: user.displayName });
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed.', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
