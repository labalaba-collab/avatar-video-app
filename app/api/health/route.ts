import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    features: [
      'webrtc-signaling',
      'live-avatar-switching',
      'security-consent',
      'social-graph',
      'admin-dashboard',
    ],
  });
}
