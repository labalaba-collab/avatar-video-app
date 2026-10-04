import Link from 'next/link';
import { Bell, Camera, Circle, MessageSquareText, PhoneCall, Sparkles, UserRound, Users } from 'lucide-react';
import { friends, recentCalls, stats } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Dashboard</p>
            <h1 className="mt-2 text-4xl font-semibold">Your social hub</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200"><Bell size={16} /></button>
            <Link href="/calls" className="rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white">Quick call</Link>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <div className="text-sm text-slate-400">{item.label}</div>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-semibold text-white">{item.value}</span>
                <span className="text-sm text-emerald-300">{item.delta}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Online friends</h2>
                <button className="text-sm text-violet-300">View all</button>
              </div>
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 font-semibold text-white">{friend.name[0]}</div>
                      <div>
                        <div className="font-medium text-white">{friend.name}</div>
                        <div className="text-sm text-slate-400">{friend.mood}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${friend.status === 'online' ? 'bg-emerald-400' : friend.status === 'in-call' ? 'bg-amber-400' : 'bg-slate-500'}`} />
                      <Link href="/calls" className="rounded-full bg-violet-500 px-3 py-1.5 text-xs font-medium text-white">Call</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent calls</h2>
                <Link href="/calls" className="text-sm text-violet-300">Call history</Link>
              </div>
              <div className="space-y-3">
                {recentCalls.map((call) => (
                  <div key={`${call.name}-${call.duration}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-3">
                    <div>
                      <div className="font-medium text-white">{call.name}</div>
                      <div className="text-sm text-slate-400">{call.type} • {call.duration}</div>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-xs ${call.direction === 'Missed' ? 'bg-red-500/10 text-red-300' : 'bg-emerald-500/10 text-emerald-300'}`}>{call.direction}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-500/15 to-cyan-500/5 p-5">
              <div className="mb-4 flex items-center gap-2 text-violet-200">
                <Sparkles size={18} />
                <span className="text-sm uppercase tracking-[0.2em]">Current avatar</span>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <div className="mb-4 flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 via-pink-500 to-cyan-400">
                  <div className="h-18 w-18 rounded-full border-4 border-white/70 bg-slate-950/50" />
                </div>
                <div className="text-lg font-medium text-white">Professional avatar</div>
                <div className="mt-2 text-sm text-slate-300">Neutral palette • Business look • Ready for meetings</div>
                <Link href="/avatar-studio" className="mt-4 inline-flex rounded-full bg-white/5 px-3 py-2 text-sm text-white">Customize</Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-4 flex items-center gap-2">
                <Camera size={18} className="text-violet-300" />
                <h2 className="text-xl font-semibold">Status</h2>
              </div>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-xl bg-slate-950/70 p-3"><span>Identity mode</span><span className="font-medium text-white">Real</span></div>
                <div className="flex items-center justify-between rounded-xl bg-slate-950/70 p-3"><span>Appearance</span><span className="font-medium text-white">Professional</span></div>
                <div className="flex items-center justify-between rounded-xl bg-slate-950/70 p-3"><span>Privacy</span><span className="font-medium text-white">Friends only</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
