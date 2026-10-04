"use client";

import Link from 'next/link';
import { AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { AdvancedCallRoom } from '@/components/advanced-call-room';

export default function AdvancedCallPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Advanced Calls</p>
            <h1 className="mt-2 text-4xl font-semibold">Real-time face transformation</h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">Back</Link>
        </div>

        {/* Architecture info */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="mb-2 flex items-center gap-2 font-semibold text-emerald-300">
              <CheckCircle2 size={18} />
              Built-in transformation engines
            </div>
            <ul className="space-y-1 text-sm text-emerald-100/80">
              <li>✓ MediaPipe (ultra-fast, GPU-optimized)</li>
              <li>✓ TensorFlow.js (high-accuracy landmarks)</li>
              <li>✓ ML5.js (pose + face detection)</li>
              <li>✓ Canvas fallback (no dependencies)</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
            <div className="mb-2 flex items-center gap-2 font-semibold text-violet-300">
              <Zap size={18} />
              Real-time processing
            </div>
            <ul className="space-y-1 text-sm text-violet-100/80">
              <li>✓ 30-60 FPS local processing</li>
              <li>✓ Sub-50ms latency target</li>
              <li>✓ GPU acceleration when available</li>
              <li>✓ Graceful degradation on weak devices</li>
            </ul>
          </div>
        </div>

        {/* Main call room */}
        <AdvancedCallRoom />

        {/* Implementation notes */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Implementation architecture</h2>
          <div className="space-y-4 text-sm text-slate-300">
            <div>
              <div className="mb-2 font-medium text-white">Local transformation pipeline</div>
              <div className="rounded-lg bg-slate-950/70 p-3 font-mono text-xs text-slate-400">
                Camera Input → Face/Pose Detection → Transformation Engine → Canvas → WebRTC Stream → Remote Participant
              </div>
            </div>
            <div>
              <div className="mb-2 font-medium text-white">Supported transformation modes</div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3">
                  <div className="font-semibold text-emerald-300">🔴 Real Face</div>
                  <div className="mt-1 text-xs text-slate-400">Raw camera feed with safety badge overlay</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3">
                  <div className="font-semibold text-violet-300">🧑 Avatar</div>
                  <div className="mt-1 text-xs text-slate-400">Digital avatar animated by face landmarks</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3">
                  <div className="font-semibold text-amber-300">✨ Effects</div>
                  <div className="mt-1 text-xs text-slate-400">Cartoon filters, overlays, and stylizations</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3">
                  <div className="font-semibold text-cyan-300">🎨 Virtual Background</div>
                  <div className="mt-1 text-xs text-slate-400">AI-segmented background replacement</div>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2 font-medium text-white">WebRTC + OBS Studio integration</div>
              <div className="rounded-lg bg-slate-950/70 p-3 text-xs text-slate-400">
                Canvas stream can be consumed by WebRTC as a source, or exported to OBS Studio via NDI protocol for advanced streaming and recording workflows.
              </div>
            </div>
          </div>
        </div>

        {/* Deployment notes */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Setup & deployment</h2>
          <div className="space-y-3 text-sm text-slate-300">
            <div>
              <div className="font-mono text-xs text-slate-400 bg-slate-950/70 rounded p-3 mb-2">
                npm install @mediapipe/selfie-segmentation @tensorflow/tfjs @tensorflow/tfjs-backend-webgl
              </div>
              <p>Install face tracking dependencies as needed based on transformation engine choice.</p>
            </div>
            <div>
              <p className="font-medium text-white mb-1">For production streaming:</p>
              <p>Export canvas stream to <span className="font-semibold text-cyan-300">OBS Studio</span> via WebRTC or NDI for professional recording, RTMP streaming to platforms like Twitch/YouTube, and advanced effects chains.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
