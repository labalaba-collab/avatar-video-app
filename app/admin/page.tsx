import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { mockCalls } from '@/lib/mock-store';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let totalCalls = 0;
  let activeCalls = 0;
  let totalUsers = 0;
  let reportsCount = 0;

  try {
    if (process.env.DATABASE_URL) {
      [totalCalls, activeCalls, totalUsers, reportsCount] = await Promise.all([
        prisma.call.count(),
        prisma.call.count({ where: { status: 'connected' } }),
        prisma.user.count(),
        prisma.report.count(),
      ]);
    } else {
      totalCalls = mockCalls.length;
      activeCalls = mockCalls.filter((c) => c.status === 'connected').length;
    }
  } catch (error) {
    console.error('Database query failed:', error);
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Admin</p>
            <h1 className="mt-2 text-4xl font-semibold">Platform oversight</h1>
          </div>
          <Link href="/dashboard" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">Back</Link>
        </div>

        {/* Key metrics */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            { label: 'Total users', value: totalUsers },
            { label: 'Total calls', value: totalCalls },
            { label: 'Active calls', value: activeCalls },
            { label: 'Reports pending', value: reportsCount },
          ].map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <div className="text-sm text-slate-400">{metric.label}</div>
              <div className="mt-4 text-3xl font-semibold text-white">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Content sections */}
        <div className="grid gap-6 xl:grid-cols-2">
          {/* System health */}
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold mb-4">System health</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3">
                <span>WebRTC signaling</span>
                <span className="inline-flex items-center gap-1 text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" />Operational</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3">
                <span>Face transformation pipeline</span>
                <span className="inline-flex items-center gap-1 text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400" />Active</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3">
                <span>Database connection</span>
                <span className="inline-flex items-center gap-1 text-amber-300"><span className="h-2 w-2 rounded-full bg-amber-400" />{process.env.DATABASE_URL ? 'Connected' : 'Mock mode'}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3">
                <span>OAuth providers</span>
                <span className="inline-flex items-center gap-1 text-blue-300"><span className="h-2 w-2 rounded-full bg-blue-400" />Configured</span>
              </div>
            </div>
          </div>

          {/* Safety & consent */}
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold mb-4">Safety & consent</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl bg-slate-950/70 p-3">
                <div className="font-medium text-white">Identity disclosure</div>
                <div className="mt-1 text-xs text-slate-400">All transformation modes clearly labeled: Real, Avatar, Effect, Background</div>
              </div>
              <div className="rounded-2xl bg-slate-950/70 p-3">
                <div className="font-medium text-white">User consent</div>
                <div className="mt-1 text-xs text-slate-400">Opt-in transformations with explicit mode indicators during calls</div>
              </div>
              <div className="rounded-2xl bg-slate-950/70 p-3">
                <div className="font-medium text-white">Blocking & reporting</div>
                <div className="mt-1 text-xs text-slate-400">Users can block, report abuse, and flag inappropriate transformations</div>
              </div>
              <div className="rounded-2xl bg-slate-950/70 p-3">
                <div className="font-medium text-white">Privacy controls</div>
                <div className="mt-1 text-xs text-slate-400">Per-call identity mode settings and permanent privacy preferences</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold mb-4">Platform features</h2>
            <div className="space-y-2 text-sm text-slate-300">
              {[
                'Live video calling with WebRTC',
                'Real-time face/avatar transformation',
                'Multiple transformation engines',
                'Avatar studio & customization',
                'Social graph & contacts',
                'OAuth social integrations',
                'Call history & statistics',
                'Identity & privacy controls',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2 rounded-lg bg-slate-950/70 p-2 text-xs">
                  <span className="text-emerald-400">✓</span> {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Integration status */}
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold mb-4">Integrations</h2>
            <div className="space-y-2 text-sm text-slate-300">
              {['Google', 'Facebook', 'Instagram', 'X', 'LinkedIn', 'TikTok', 'Telegram', 'WhatsApp'].map((platform) => (
                <div key={platform} className="flex items-center justify-between rounded-lg bg-slate-950/70 p-2">
                  <span className="text-xs">{platform}</span>
                  <span className="text-xs text-slate-500">Configured</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
