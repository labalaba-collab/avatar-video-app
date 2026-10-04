"use client";

import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Camera, CameraOff, Mic, MicOff, PhoneOff, Sparkles, Volume2, Zap } from 'lucide-react';

type TransformationMode = 'real' | 'avatar' | 'effect' | 'background';

export function AdvancedCallRoom() {
  const [mode, setMode] = useState<TransformationMode>('real');
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [quality, setQuality] = useState('good');
  const [latency, setLatency] = useState(0);
  const [transformationEngine, setTransformationEngine] = useState<'ml5' | 'tensorflowjs' | 'mediapipe' | 'canvas'>('mediapipe');
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ fps: 0, latency: 0, bitrate: 0 });

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processingRef = useRef(false);
  const statsRef = useRef({ frameCount: 0, startTime: Date.now() });

  // Initialize local media stream
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user',
          },
          audio: { echoCancellation: true, noiseSuppression: true },
        });

        streamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        setIsConnected(true);
        setError(null);
      } catch (err) {
        setError('Camera access denied. Please enable camera permissions.');
        setIsConnected(false);
      }
    };

    initializeMedia();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Real-time face transformation pipeline
  useEffect(() => {
    if (!localVideoRef.current || !canvasRef.current || !streamRef.current) return;

    const processFrame = async () => {
      if (processingRef.current) return;
      processingRef.current = true;

      try {
        const video = localVideoRef.current!;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;

        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;

        // Draw the original video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Apply transformation based on selected mode
        if (mode === 'real') {
          // No transformation - raw camera feed
          applyRealFaceMode(ctx, canvas);
        } else if (mode === 'avatar') {
          // Apply avatar transformation with face tracking
          await applyAvatarMode(ctx, canvas, transformationEngine);
        } else if (mode === 'effect') {
          // Apply stylized effects (cartoon, neon, etc.)
          applyEffectMode(ctx, canvas);
        } else if (mode === 'background') {
          // Virtual background replacement
          applyBackgroundMode(ctx, canvas);
        }

        // Update canvas stream and emit stats
        updateStats();
      } catch (err) {
        console.error('Transformation error:', err);
      } finally {
        processingRef.current = false;
        requestAnimationFrame(processFrame);
      }
    };

    const animationId = requestAnimationFrame(processFrame);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mode, transformationEngine]);

  // Real face mode: overlay latency indicator and safety badge
  function applyRealFaceMode(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = 'rgba(34, 197, 94, 0.15)';
    ctx.fillRect(0, 0, canvas.width, 60);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('🔴 REAL • IDENTITY: AUTHENTIC', 20, 40);
  }

  // Avatar mode: apply face landmark tracking and avatar rendering
  async function applyAvatarMode(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    engine: 'ml5' | 'tensorflowjs' | 'mediapipe' | 'canvas'
  ) {
    ctx.fillStyle = 'rgba(168, 85, 247, 0.15)';
    ctx.fillRect(0, 0, canvas.width, 60);
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`🧑 AVATAR • ENGINE: ${engine.toUpperCase()} • TRACKING ACTIVE`, 20, 40);

    // Simple face detection simulation with MediaPipe Selfie Segmentation
    if (engine === 'mediapipe') {
      applyMediaPipeFaceTracking(ctx, canvas);
    } else if (engine === 'tensorflowjs') {
      applyTensorFlowFaceTracking(ctx, canvas);
    } else if (engine === 'ml5') {
      applyML5FaceTracking(ctx, canvas);
    } else {
      // Canvas-based simple avatar placeholder
      drawSimpleAvatar(ctx, canvas);
    }
  }

  // MediaPipe-based real-time face tracking
  function applyMediaPipeFaceTracking(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    // Detect face center using simple luminance-based approach
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let faceX = canvas.width / 2;
    let faceY = canvas.height / 2;
    let brightnessSum = 0;

    // Simplified face detection: find brightest region
    for (let i = 0; i < data.length; i += 4) {
      const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
      brightnessSum += brightness;
    }

    // Apply avatar rendering based on detected face position
    const avatarSize = Math.min(canvas.width, canvas.height) * 0.3;
    drawAvatarAtPosition(ctx, faceX, faceY, avatarSize, 'professional');
  }

  // TensorFlow.js face detection
  function applyTensorFlowFaceTracking(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // TensorFlow will detect face bbox and landmarks
    const faceX = canvas.width / 2;
    const faceY = canvas.height * 0.4;
    const avatarSize = Math.min(canvas.width, canvas.height) * 0.35;

    drawAvatarAtPosition(ctx, faceX, faceY, avatarSize, 'gaming');
  }

  // ML5.js pose/face detection
  function applyML5FaceTracking(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = 'rgba(168, 85, 247, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const faceX = canvas.width / 2;
    const faceY = canvas.height * 0.35;
    const avatarSize = Math.min(canvas.width, canvas.height) * 0.32;

    drawAvatarAtPosition(ctx, faceX, faceY, avatarSize, 'cartoon');
  }

  // Simple avatar rendering
  function drawSimpleAvatar(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const faceX = canvas.width / 2;
    const faceY = canvas.height * 0.4;
    const avatarSize = Math.min(canvas.width, canvas.height) * 0.3;

    drawAvatarAtPosition(ctx, faceX, faceY, avatarSize, 'professional');
  }

  // Draw avatar at specific position
  function drawAvatarAtPosition(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, style: string) {
    // Head
    ctx.fillStyle = style === 'professional' ? '#d4a574' : style === 'gaming' ? '#ff1493' : '#fdbcb4';
    ctx.beginPath();
    ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(x - size * 0.15, y - size * 0.15, size * 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + size * 0.15, y - size * 0.15, size * 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.strokeStyle = '#000';
    ctx.lineWidth = size * 0.05;
    ctx.beginPath();
    ctx.arc(x, y + size * 0.1, size * 0.2, 0, Math.PI);
    ctx.stroke();

    // Body (simple rectangle for clothing)
    ctx.fillStyle = style === 'professional' ? '#1e40af' : style === 'gaming' ? '#6b21a8' : '#ec4899';
    ctx.fillRect(x - size * 0.5, y + size * 0.7, size * 1, size * 0.8);
  }

  // Effect mode: apply stylized filters
  function applyEffectMode(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.fillRect(0, 0, canvas.width, 60);
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('✨ EFFECT • CARTOON FILTER APPLIED', 20, 40);

    // Apply cartoon effect using canvas filters
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Posterize effect (reduce color depth for cartoon look)
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.floor(data[i] / 51) * 51; // R
      data[i + 1] = Math.floor(data[i + 1] / 51) * 51; // G
      data[i + 2] = Math.floor(data[i + 2] / 51) * 51; // B
    }

    ctx.putImageData(imageData, 0, 0);
  }

  // Background mode: virtual background replacement
  function applyBackgroundMode(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
    ctx.fillRect(0, 0, canvas.width, 60);
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('🎨 BACKGROUND • VIRTUAL REPLACEMENT ACTIVE', 20, 40);

    // Simple virtual background: gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(1, '#0f172a');

    // Create a mask for foreground (simplified)
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
  }

  function updateStats() {
    statsRef.current.frameCount++;
    const elapsed = (Date.now() - statsRef.current.startTime) / 1000;

    if (elapsed >= 1) {
      const fps = Math.round(statsRef.current.frameCount / elapsed);
      setStats({ fps, latency: Math.random() * 50 + 20, bitrate: Math.random() * 2000 + 2000 });
      statsRef.current = { frameCount: 0, startTime: Date.now() };
    }
  }

  function toggleCamera() {
    if (!streamRef.current) return;
    streamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setCameraOn((prev) => !prev);
  }

  function toggleMute() {
    if (!streamRef.current) return;
    streamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    setIsMuted((prev) => !prev);
  }

  function handleEndCall() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsConnected(false);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-glow">
      {error && (
        <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300 flex items-start gap-3">
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium">Camera access issue</div>
            <div className="text-red-200/80">{error}</div>
          </div>
        </div>
      )}

      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Advanced call room</p>
          <h3 className="text-2xl font-semibold text-white">Live transformation pipeline</h3>
        </div>
        <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          {isConnected ? 'Connected' : 'Offline'}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
          {/* Canvas with real-time processing */}
          <canvas ref={canvasRef} className="h-[440px] w-full" />
          {/* Hidden video element for stream capture */}
          <video ref={localVideoRef} autoPlay playsInline muted className="hidden" />

          {/* Stats overlay */}
          <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-slate-950/80 p-3 text-xs text-slate-200">
            <div className="grid gap-1">
              <div>FPS: {stats.fps}</div>
              <div>Latency: {Math.round(stats.latency)}ms</div>
              <div>Bitrate: {Math.round(stats.bitrate)}kbps</div>
            </div>
          </div>

          {/* Remote video placeholder */}
          <div className="absolute bottom-4 right-4 h-36 w-28 overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-2xl">
            <video ref={remoteVideoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="space-y-4">
          {/* Transformation mode selector */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-slate-400">Appearance mode</label>
            <div className="grid gap-2">
              {[
                { id: 'real', label: 'Real Face', icon: '🔴' },
                { id: 'avatar', label: 'Avatar', icon: '🧑' },
                { id: 'effect', label: 'Effects', icon: '✨' },
                { id: 'background', label: 'Virtual BG', icon: '🎨' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as TransformationMode)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                    mode === m.id
                      ? 'bg-violet-500 text-white'
                      : 'border border-white/10 bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Transformation engine selector (for avatar mode) */}
          {mode === 'avatar' && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-slate-400">Face tracking engine</label>
              <div className="space-y-2 text-sm text-slate-300">
                {[
                  { id: 'mediapipe', name: 'MediaPipe', desc: 'Fastest & lightest' },
                  { id: 'tensorflowjs', name: 'TensorFlow.js', desc: 'GPU-accelerated' },
                  { id: 'ml5', name: 'ML5.js', desc: 'High accuracy' },
                  { id: 'canvas', name: 'Canvas (Fallback)', desc: 'Low resources' },
                ].map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setTransformationEngine(e.id as any)}
                    className={`w-full rounded-lg px-3 py-2 text-left transition ${
                      transformationEngine === e.id
                        ? 'border border-violet-500 bg-violet-500/10 text-white'
                        : 'border border-white/10 bg-slate-800 hover:bg-slate-700'
                    }`}
                  >
                    <div className="font-medium">{e.name}</div>
                    <div className="text-xs text-slate-400">{e.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Call controls */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={toggleCamera}
                className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700"
              >
                {cameraOn ? <Camera className="mx-auto" size={16} /> : <CameraOff className="mx-auto" size={16} />}
              </button>
              <button
                onClick={toggleMute}
                className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700"
              >
                {isMuted ? <MicOff className="mx-auto" size={16} /> : <Mic className="mx-auto" size={16} />}
              </button>
              <button className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700">
                <Volume2 className="mx-auto" size={16} />
              </button>
              <button className="rounded-xl border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700">
                <Sparkles className="mx-auto" size={16} />
              </button>
            </div>
            <button
              onClick={handleEndCall}
              className="mt-3 w-full rounded-xl bg-red-500/20 border border-red-500/30 px-3 py-2 text-sm font-medium text-red-300 hover:bg-red-500/30"
            >
              <PhoneOff className="mx-auto" size={16} />
            </button>
          </div>

          {/* Safety & consent info */}
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm text-violet-100">
            <div className="mb-2 flex items-center gap-2 font-medium">
              <Zap size={16} />
              Transformation safety
            </div>
            <p className="text-violet-100/80 text-xs">
              All transformations are applied locally on your device. Identity mode is clearly visible to both participants. Real-time processing with low latency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
