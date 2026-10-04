export default function AuthPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="grid w-full max-w-5xl gap-6 rounded-[32px] border border-white/10 bg-slate-900/80 p-6 shadow-glow lg:grid-cols-2">
        <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-violet-500/15 to-cyan-500/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Welcome back</p>
          <h1 className="mt-3 text-4xl font-semibold">Secure social video access</h1>
          <p className="mt-4 text-slate-300">Sign in or create an account to start live calls, manage your avatar, and connect your social presence.</p>
          <div className="mt-8 space-y-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Email/password authentication</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Google OAuth-ready flows</div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">Protected authenticated routes</div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
          <div className="mb-5 flex gap-2 rounded-full border border-white/10 bg-slate-900 p-1">
            <button className="flex-1 rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white">Sign in</button>
            <button className="flex-1 rounded-full px-4 py-2 text-sm text-slate-300">Create account</button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Email</label>
              <input className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">Password</label>
              <input type="password" className="w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-white outline-none" placeholder="••••••••" />
            </div>
            <button className="w-full rounded-xl bg-violet-500 px-4 py-3 font-medium text-white">Continue</button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
            <span className="h-px flex-1 bg-white/10" />
            Or continue with
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid gap-2">
            <button className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white">Google</button>
            <button className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white">Instagram</button>
          </div>
        </div>
      </div>
    </main>
  );
}
