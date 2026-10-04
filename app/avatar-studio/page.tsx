import { avatars } from '@/lib/mock-data';

export default function AvatarStudioPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Avatar Studio</p>
          <h1 className="mt-2 text-4xl font-semibold">Create, switch, and customize your visual identity</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
            <h2 className="text-xl font-semibold">Saved avatars</h2>
            <div className="mt-4 space-y-3">
              {avatars.map((avatar) => (
                <button key={avatar.name} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-3 text-left hover:bg-slate-800">
                  <div>
                    <div className="font-medium text-white">{avatar.name}</div>
                    <div className="text-sm text-slate-400">{avatar.type} • {avatar.tone}</div>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 to-cyan-500/10 p-4">
                <div className="mb-4 flex h-64 items-center justify-center rounded-2xl bg-slate-950/60">
                  <div className="h-28 w-28 rounded-full border-4 border-white/80 bg-gradient-to-br from-violet-500 to-pink-500" />
                </div>
                <div className="text-lg font-medium text-white">Professional</div>
                <div className="mt-2 text-sm text-slate-300">Clean, polished, and ideal for work calls.</div>
                <button className="mt-4 rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white">Use during call</button>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-400">Appearance</div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-200">
                    {['Hair', 'Eyes', 'Clothes', 'Accessories', 'Background', 'Skin tone'].map((item) => (
                      <button key={item} className="rounded-xl border border-white/10 bg-slate-800 px-2 py-2 text-left hover:bg-slate-700">{item}</button>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-400">Live transformation</div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-center justify-between"><span>Real face</span><span className="text-white">On</span></div>
                    <div className="flex items-center justify-between"><span>Avatar mode</span><span className="text-white">Ready</span></div>
                    <div className="flex items-center justify-between"><span>Effects</span><span className="text-white">Enabled</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
