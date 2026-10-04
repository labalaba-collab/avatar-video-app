import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createMockCall, listMockCalls, mockCalls } from '@/lib/mock-store';

export async function GET() {
  if (process.env.DATABASE_URL) {
    const calls = await prisma.call.findMany({ orderBy: { startTime: 'desc' }, take: 20 });
    return NextResponse.json({ success: true, calls });
  }

  return NextResponse.json({ success: true, calls: listMockCalls() });
}

export async function POST(req: Request) {
  const body = await req.json();
  const call = {
    id: body.id || `call-${Date.now()}`,
    callerId: body.callerId || 'demo-caller',
    recipientId: body.recipientId || 'demo-recipient',
    callType: body.callType || 'video',
    status: body.status || 'connected',
    direction: body.direction || 'outgoing',
    startTime: body.startTime || new Date().toISOString(),
    endTime: body.endTime || new Date().toISOString(),
    duration: Number(body.duration || 0),
    missed: Boolean(body.missed),
  };

  if (process.env.DATABASE_URL) {
    const record = await prisma.call.create({ data: { ...call, callerId: call.callerId, recipientId: call.recipientId } });
    return NextResponse.json({ success: true, call: record });
  }

  const record = createMockCall(call);
  return NextResponse.json({ success: true, call: record });
}
