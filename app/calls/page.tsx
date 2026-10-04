import Link from 'next/link';
import { LiveCallRoom } from '@/components/live-call-room';

export default function CallsPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Calls</p>
            <h1 className="mt-2 text-4xl font-semibold">Live video</h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">Back to dashboard</Link>
        </div>
        <LiveCallRoom />
      </div>
    </main>
  );
}
