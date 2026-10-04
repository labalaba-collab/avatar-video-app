import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Vanta platform is healthy.',
    timestamp: new Date().toISOString(),
  });
}
