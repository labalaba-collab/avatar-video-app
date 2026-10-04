import { AccessToken } from 'livekit-server-sdk';

export function getLiveKitConfig() {
  const url = process.env.LIVEKIT_URL ?? 'ws://localhost:7880';
  const apiKey = process.env.LIVEKIT_API_KEY ?? 'devkey';
  const apiSecret = process.env.LIVEKIT_API_SECRET ?? 'secret';

  return { url, apiKey, apiSecret };
}

export function createRoomToken({
  room,
  identity,
  name,
}: {
  room: string;
  identity: string;
  name?: string;
}) {
  const { apiKey, apiSecret, url } = getLiveKitConfig();

  const token = new AccessToken(apiKey, apiSecret, {
    identity,
    name,
  });

  token.addGrant({
    room,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
    canPublishSources: ['camera', 'microphone', 'screen_share'],
  });

  return {
    token: token.toJwt(),
    url,
  };
}
