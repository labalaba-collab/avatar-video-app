import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createMockAvatar, listMockAvatars } from '@/lib/mock-store';

export async function GET() {
  if (process.env.DATABASE_URL) {
    const avatars = await prisma.avatar.findMany({ orderBy: { createdAt: 'desc' }, take: 50 });
    return NextResponse.json({ success: true, avatars });
  }

  return NextResponse.json({ success: true, avatars: listMockAvatars() });
}

export async function POST(req: Request) {
  const body = await req.json();
  const avatar = {
    id: body.id || `avatar-${Date.now()}`,
    userId: body.userId || 'demo-user',
    name: body.name || 'Professional',
    type: body.type || 'Business',
    style: body.style || 'Clean',
    skinTone: body.skinTone || 'Warm',
    hairStyle: body.hairStyle || 'Short',
    clothing: body.clothing || 'Blazer',
    accessory: body.accessory || 'Glasses',
    background: body.background || 'Studio',
    colors: body.colors || { primary: '#7c3aed', secondary: '#22d3ee' },
    config: body.config || {},
    isActive: Boolean(body.isActive),
  };

  if (process.env.DATABASE_URL) {
    const created = await prisma.avatar.create({ data: avatar });
    return NextResponse.json({ success: true, avatar: created }, { status: 201 });
  }

  const created = createMockAvatar(avatar);
  return NextResponse.json({ success: true, avatar: created }, { status: 201 });
}
