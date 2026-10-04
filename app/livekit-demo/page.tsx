'use client';

import { useEffect, useState } from 'react';
import {
  ControlBar,
  LiveKitRoom,
  VideoConference,
} from '@livekit/components-react';
import '@livekit/components-styles';

export default function LiveKitDemoPage() {
  const [token, setToken] = useState('');
  const [roomName, setRoomName] = useState('demo-room');
  const [identity, setIdentity] = useState(`user-${Math.random().toString(36).slice(2, 8)}`);
  const [connected, setConnected] = useState(false);

  async function generateToken() {
    const response = await fetch('/api/livekit/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room: roomName, identity, name: identity }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error(data.error || 'Failed to generate token');
      return;
    }

    setToken(data.token);
    setConnected(true);
  }

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">LiveKit</p>
            <h1 className="mt-2 text-4xl font-semibold">Real-time media session</h1>
          </div>
          <button
            onClick={generateToken}
            className="rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white"
          >
            Refresh token
          </button>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <label className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Room</div>
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white outline-none"
            />
          </label>

          <label className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Identity</div>
            <input
              value={identity}
              onChange={(e) => setIdentity(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-white outline-none"
            />
          </label>
        </div>

        {token ? (
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/80">
            <LiveKitRoom
              video={true}
              audio={true}
              token={token}
              serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL || 'ws://localhost:7880'}
              connect={connected}
              onConnected={() => setConnected(true)}
              onDisconnected={() => setConnected(false)}
              style={{ height: '600px' }}
            >
              <VideoConference />
              <ControlBar variation="verbose" />
            </LiveKitRoom>
          </div>
        ) : (
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-10 text-center text-slate-300">
            Generating a LiveKit token...
          </div>
        )}
      </div>
    </main>
  );
}
