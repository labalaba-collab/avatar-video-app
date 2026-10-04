"use client";

import { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { io, Socket } from 'socket.io-client';
import { Camera, CameraOff, Mic, MicOff, PhoneOff, ShieldCheck, Sparkles, Video, Volume2 } from 'lucide-react';

export function LiveCallRoom() {
  const [roomId, setRoomId] = useState('demo-room');
  const [userId, setUserId] = useState(`user-${Math.random().toString(36).slice(2, 8)}`);
  const [remoteUserId, setRemoteUserId] = useState('user-remote');
  const [status, setStatus] = useState('Ready to connect');
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    const socket = io({ path: '/socket.io' });
    socketRef.current = socket;

    socket.on('connect', () => {
      setStatus('Connected to signaling server');
    });

    socket.on('peer-joined', ({ userId: joinedId }) => {
      if (joinedId !== userId) {
        setRemoteUserId(joinedId);
        setStatus(`${joinedId} joined the room`);
        if (peerRef.current) {
          return;
        }
        startPeer(false);
      }
    });

    socket.on('signal', ({ from, signal }) => {
      if (from === userId) return;
      if (!peerRef.current) {
        startPeer(false);
      }
      peerRef.current?.signal(signal);
    });

    socket.on('user-left', () => {
      setStatus('Remote user disconnected');
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
      peerRef.current?.destroy();
    };
  }, [userId]);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  async function startLocalStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setStatus('Camera and microphone ready');
      return stream;
    } catch (error) {
      setStatus('Camera permission unavailable — avatar fallback active');
      return null;
    }
  }

  function startPeer(initiator: boolean) {
    if (!localStream) return;

    const peer = new Peer({
      initiator,
      trickle: false,
      stream: localStream,
    });

    peer.on('signal', (signal) => {
      if (!socketRef.current) return;
      socketRef.current.emit('signal', {
        roomId,
        from: userId,
        to: remoteUserId,
        signal,
      });
    });

    peer.on('stream', (stream) => {
      setRemoteStream(stream);
      setIsConnected(true);
      setStatus('Live connection established');
    });

    peer.on('connect', () => {
      setIsConnected(true);
      setStatus('Secure media connection active');
    });

    peer.on('close', () => {
      setIsConnected(false);
      setStatus('Call closed');
    });

    peerRef.current = peer;
  }

  async function handleStartCall() {
    const stream = await startLocalStream();
    if (!stream) return;
    socketRef.current?.emit('join-room', { roomId, userId });
    setStatus('Dialing remote participant...');
    setTimeout(() => startPeer(true), 350);
  }

  function toggleCamera() {
    if (!localStream) return;
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setCameraOn((prev) => !prev);
  }

  function toggleMute() {
    if (!localStream) return;
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMuted((prev) => !prev);
  }

  function handleEndCall() {
    socketRef.current?.emit('leave-room', { roomId, userId });
    peerRef.current?.destroy();
    setIsConnected(false);
    setStatus('Call ended');
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-glow">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Live call</p>
          <h3 className="text-2xl font-semibold text-white">Room {roomId}</h3>
        </div>
        <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          {isConnected ? 'Connected' : 'Standby'}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
          <div className="absolute left-4 top-4 z-10 rounded-full bg-slate-950/70 px-3 py-1 text-xs text-slate-100">
            {status}
          </div>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            muted
            className="h-[440px] w-full object-cover"
          />
          <div className="absolute bottom-4 right-4 h-36 w-28 overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-2xl">
            <video ref={localVideoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Room</label>
            <input
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white outline-none ring-0"
            />
            <label className="mt-4 mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Peer ID</label>
            <input
              value={remoteUserId}
              onChange={(e) => setRemoteUserId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white outline-none ring-0"
            />
            <div className="mt-4 flex items-center gap-2">
              <button onClick={handleStartCall} className="flex-1 rounded-xl bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-400">
                Start call
              </button>
              <button onClick={handleEndCall} className="rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-300">
                <PhoneOff size={18} />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <div className="grid grid-cols-2 gap-3">
              <button onClick={toggleCamera} className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700">
                {cameraOn ? <Camera className="mx-auto" size={16} /> : <CameraOff className="mx-auto" size={16} />}
              </button>
              <button onClick={toggleMute} className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700">
                {isMuted ? <MicOff className="mx-auto" size={16} /> : <Mic className="mx-auto" size={16} />}
              </button>
              <button className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700">
                <Volume2 className="mx-auto" size={16} />
              </button>
              <button className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700">
                <Sparkles className="mx-auto" size={16} />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm text-violet-100">
            <div className="mb-2 flex items-center gap-2 font-medium">
              <ShieldCheck size={16} />
              Safety & consent
            </div>
            <p className="text-violet-100/80">Identity status: Real Face. Transformations are opt-in and clearly labeled, with safety tools built in.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
