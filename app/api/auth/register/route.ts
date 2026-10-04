import { NextResponse } from 'next/server';
import { hashPassword, setSessionCookie } from '@/lib/auth';
import { createMockUser, findUserByEmail, findUserByUsername } from '@/lib/mock-store';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();
    const username = String(body.username || '').trim();
    const displayName = String(body.displayName || '').trim();
    const password = String(body.password || '');

    if (!email || !username || !displayName || !password) {
      return NextResponse.json({ error: 'Email, username, display name, and password are required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    if (process.env.DATABASE_URL) {
      const existingEmail = await prisma.user.findUnique({ where: { email } });
      const existingUsername = await prisma.user.findUnique({ where: { username } });

      if (existingEmail || existingUsername) {
        return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
      }

      const passwordHash = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          email,
          username,
          displayName,
          passwordHash,
          profile: {
            create: {
              publicUrl: `https://vanta.app/${username}`,
              onlineStatus: 'online',
              callAvailability: 'available',
              privacyMode: 'real',
            },
          },
        },
        include: { profile: true },
      });

      const session = { userId: user.id, email: user.email, username: user.username, displayName: user.displayName };
      setSessionCookie(session);

      return NextResponse.json({ success: true, user: { ...session, profile: user.profile } }, { status: 201 });
    }

    const existingEmail = findUserByEmail(email);
    const existingUsername = findUserByUsername(username);

    if (existingEmail || existingUsername) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 409 });
    }

    const user = createMockUser({ email, username, displayName, password });
    setSessionCookie({ userId: user.id, email: user.email, username: user.username, displayName: user.displayName });
    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed.', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
