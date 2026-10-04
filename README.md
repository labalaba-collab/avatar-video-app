# LiveKit + real-time media stack

This project now includes a real-time media stack foundation built around LiveKit, which is the correct production path for live video sessions and transformation workflows.

## Required services

- PostgreSQL for the app data model
- LiveKit server for WebRTC media relay
- TURN/STUN credentials for production NAT traversal
- Optional OBS Studio or NDI for streaming/recording workflows

## Start locally

```bash
npm install
cp .env.example .env.local
# Start a LiveKit server locally or point to a hosted instance
npm run dev
```

## Endpoints

- `/api/livekit/token` generates a short-lived room token
- `/livekit-demo` connects to a live room using the token

## Production guidance

- Use a managed LiveKit deployment or self-host a secure LiveKit server
- Set `LIVEKIT_API_KEY` and `LIVEKIT_API_SECRET`
- Use external TURN credentials for public internet connectivity
- For real face transformations, capture `canvas.captureStream()` and send the transformed stream through the media connection
- Keep the transformation pipeline pluggable and identity-safe
