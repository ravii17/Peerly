import { Link } from 'react-router-dom'

function GlassCard({ children, className = '' }) {
  return (
    <div
      className={[
        'rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-lg',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

function GlassButton({ to, children, variant = 'primary' }) {
  const base =
    'inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition active:scale-[0.99] sm:w-auto'
  const styles =
    variant === 'ghost'
      ? 'border border-white/25 bg-white/10 hover:bg-white/15'
      : 'bg-white text-slate-900 hover:bg-white/90'
  return (
    <Link className={[base, styles].join(' ')} to={to}>
      {children}
    </Link>
  )
}

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12">
      <div className="grid w-full items-center gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white/90 backdrop-blur-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
            Connect students ↔ professionals in real-time
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            ConnectHub
          </h1>
          <p className="max-w-xl text-pretty text-white/75">
            A modern, glassmorphism-first network where students and working
            professionals can chat and hop on instant video calls.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <GlassButton to="/login/student">Login as Student</GlassButton>
            <GlassButton to="/login/professional">
              Login as Professional
            </GlassButton>
            <GlassButton variant="ghost" to="/register/student">
              Register
            </GlassButton>
          </div>
          <p className="text-xs text-white/60">
            Tip: You can register as student or professional and edit your
            profile later.
          </p>
        </div>

        <GlassCard className="p-7">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">Why ConnectHub?</div>
                <div className="text-xs text-white/60">
                  Designed for mentoring, referrals, and collaboration.
                </div>
              </div>
              <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-xs text-white/80">
                Glass UI
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['1-to-1 Chat', 'Socket.io real-time messaging'],
                ['Presence', 'Online / offline awareness'],
                ['Video Calls', 'WebRTC peer-to-peer'],
                ['Profiles', 'College / company + bio'],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-lg transition hover:bg-white/15"
                >
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="mt-1 text-xs text-white/65">{desc}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4">
              <div className="text-sm font-semibold">Next up</div>
              <div className="mt-1 text-xs text-white/65">
                I’ll add the dashboard, chat UI, and the video call screen after
                auth + API are live.
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  )
}

