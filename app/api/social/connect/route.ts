import { NextResponse } from 'next/server';

const supportedProviders = [
  'Google',
  'Instagram',
  'Facebook',
  'X',
  'TikTok',
  'LinkedIn',
  'Telegram',
  'WhatsApp',
];

export async function GET() {
  return NextResponse.json({
    success: true,
    providers: supportedProviders.map((platform) => ({
      platform,
      enabled: Boolean(process.env[`${platform.toUpperCase()}_CLIENT_ID`]),
      requiresOAuth: true,
    })),
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { action = 'connect', platform } = body;

  if (!platform || !supportedProviders.includes(platform)) {
    return NextResponse.json({ error: 'Unsupported social provider.' }, { status: 400 });
  }

  if (action === 'disconnect') {
    return NextResponse.json({ success: true, message: `${platform} disconnected successfully.` });
  }

  return NextResponse.json({
    success: true,
    message: `OAuth initiation for ${platform} started on the backend.`,
    redirectUrl: `/api/oauth/${platform.toLowerCase()}`,
  });
}
