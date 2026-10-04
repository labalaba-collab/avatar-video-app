import { NextResponse } from 'next/server';
import { createRoomToken } from '@/lib/livekit';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const room = String(body.room || 'demo-room').trim();
    const identity = String(body.identity || `user-${Date.now()}`).trim();
    const name = String(body.name || 'Participant').trim();

    if (!room || !identity) {
      return NextResponse.json({ error: 'room and identity are required.' }, { status: 400 });
    }

    const data = createRoomToken({ room, identity, name });
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to generate LiveKit token.', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
