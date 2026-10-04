import Link from 'next/link';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Settings</p>
            <h1 className="mt-2 text-4xl font-semibold">Privacy, security, and account controls</h1>
          </div>
          <Link href="/profile" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200">Profile</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold">Identity & consent</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3"><span>Mode</span><span className="text-white">Real</span></div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3"><span>Transformation consent</span><span className="text-white">Required</span></div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3"><span>Avatar disclosure</span><span className="text-white">Visible</span></div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3"><span>Block/report</span><span className="text-white">Enabled</span></div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold">Security</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3"><span>Two-factor auth</span><span className="text-white">Enabled</span></div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3"><span>Session protection</span><span className="text-white">Secure</span></div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3"><span>OAuth tokens</span><span className="text-white">Encrypted</span></div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-950/70 p-3"><span>Account deletion</span><span className="text-white">Available</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
