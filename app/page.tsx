import Link from 'next/link';
import { ArrowRight, Camera, CheckCircle2, MessageSquareText, Sparkles, UserRound, Users, Video } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <header className="mb-10 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 font-bold text-slate-950">V</div>
            <div>
              <div className="text-sm font-semibold">Vanta</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Live social</div>
            </div>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-200 md:flex">
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/calls">Calls</Link>
            <Link href="/contacts">Contacts</Link>
            <Link href="/avatar-studio">Avatar Studio</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/settings">Settings</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 hover:bg-white/5">Log in</Link>
            <Link href="/calls" className="rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-400">Start call</Link>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-aurora px-6 py-12 shadow-glow md:px-10">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-violet-200">
              Real-time video + avatar transformation
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
              FaceTime meets social avatar life.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              Transform live during calls, customize your identity, build social presence, and stay connected through premium real-time video.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/calls" className="rounded-full bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-400">Launch live call</Link>
              <Link href="/avatar-studio" className="rounded-full border border-white/10 bg-slate-900/40 px-6 py-3 font-medium text-white hover:bg-white/5">Build avatar</Link>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-left text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-3"><div className="text-xl font-semibold text-white">1.2M</div><div className="text-slate-400">Weekly calls</div></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-3"><div className="text-xl font-semibold text-white">4.8/5</div><div className="text-slate-400">Avg rating</div></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-3"><div className="text-xl font-semibold text-white">98ms</div><div className="text-slate-400">Latency target</div></div>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { icon: Video, title: 'Live call infrastructure', copy: 'WebRTC signaling, network-aware connections, screening and call controls.' },
            { icon: Sparkles, title: 'Avatar & effects pipeline', copy: 'Real-time face tracking, avatar switching, and live transformation modes.' },
            { icon: Users, title: 'Connected social graph', copy: 'Contacts, profiles, friend requests, social links, and shareable public profiles.' },
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex rounded-xl bg-violet-500/10 p-3 text-violet-300"><Icon size={20} /></div>
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-slate-300">{copy}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-[32px] border border-white/10 bg-slate-900/80 p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Core product</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Everything needed for premium social video</h2>
            </div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-violet-300">Open dashboard <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Create account', 'Secure registration, profile setup, and identity controls.'],
              ['Live video calls', 'One-to-one real-time calls with audio, video, and full controls.'],
              ['Avatar transformation', 'Switch from real face to avatar or effects during a call.'],
              ['Social graph', 'Add friends, view profiles, share call links, and manage privacy.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <div className="mb-3 inline-flex rounded-lg bg-emerald-500/10 p-2 text-emerald-300"><CheckCircle2 size={18} /></div>
                <h3 className="text-lg font-medium text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
