import Link from 'next/link';
import { socialPlatforms } from '@/lib/mock-data';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Profile</p>
            <h1 className="mt-2 text-4xl font-semibold">Identity and social presence</h1>
          </div>
          <Link href="/settings" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">Settings</Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-5 flex items-center gap-4">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-2xl font-semibold text-white">A</div>
              <div>
                <div className="text-2xl font-semibold text-white">Ava Chen</div>
                <div className="text-slate-400">@avachen</div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
              Product designer and creator. Building communication tools that feel human and expressive.
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-xl bg-slate-950/70 p-3"><span>Public profile URL</span><span className="text-white">vanta.app/ava</span></div>
              <div className="flex items-center justify-between rounded-xl bg-slate-950/70 p-3"><span>Call availability</span><span className="text-white">Available</span></div>
              <div className="flex items-center justify-between rounded-xl bg-slate-950/70 p-3"><span>Identity mode</span><span className="text-white">Real</span></div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold">Connected social accounts</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {socialPlatforms.map((platform) => (
                <div key={platform} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                  <span className="font-medium text-white">{platform}</span>
                  <button className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">Connect</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
