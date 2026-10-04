import Link from 'next/link';
import { friends } from '@/lib/mock-data';

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Contacts</p>
            <h1 className="mt-2 text-4xl font-semibold">Friends & connected people</h1>
          </div>
          <button className="rounded-full bg-violet-500 px-4 py-2 text-sm font-medium text-white">Add friend</button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {friends.map((friend) => (
            <div key={friend.name} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 font-semibold text-white">{friend.name[0]}</div>
                  <div>
                    <div className="font-medium text-white">{friend.name}</div>
                    <div className="text-sm text-slate-400">{friend.mood}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${friend.status === 'online' ? 'bg-emerald-400' : friend.status === 'in-call' ? 'bg-amber-400' : 'bg-slate-500'}`} />
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{friend.status}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="/calls" className="flex-1 rounded-xl bg-violet-500 px-3 py-2 text-center text-sm font-medium text-white">Start call</Link>
                <button className="flex-1 rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white">Message</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
