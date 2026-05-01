import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function GlassShell({ children }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12">
      <div className="w-full">
        <div className="mx-auto max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-lg">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const { role } = useParams()
  const navigate = useNavigate()
  const normalizedRole = useMemo(() => {
    if (role === 'professional' || role === 'student') return role
    return 'student'
  }, [role])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [org, setOrg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Backend wiring comes next; for now just show UI works.
      await new Promise((r) => setTimeout(r, 600))
      navigate(`/login/${normalizedRole}`, { replace: true })
    } catch (err) {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const orgLabel = normalizedRole === 'professional' ? 'Company' : 'College'
  const orgPlaceholder =
    normalizedRole === 'professional' ? 'e.g., Google' : 'e.g., IIT Bombay'

  return (
    <GlassShell>
      <div className="space-y-1">
        <div className="text-sm text-white/70">Let’s get you started</div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Register as {normalizedRole === 'professional' ? 'Professional' : 'Student'}
        </h2>
      </div>

      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <div className="text-xs font-medium text-white/70">Name</div>
          <input
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none backdrop-blur-lg placeholder:text-white/35 focus:border-white/30"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="block space-y-1">
          <div className="text-xs font-medium text-white/70">Email</div>
          <input
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none backdrop-blur-lg placeholder:text-white/35 focus:border-white/30"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>

        <label className="block space-y-1">
          <div className="text-xs font-medium text-white/70">Password</div>
          <input
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none backdrop-blur-lg placeholder:text-white/35 focus:border-white/30"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={6}
          />
        </label>

        <label className="block space-y-1">
          <div className="text-xs font-medium text-white/70">{orgLabel}</div>
          <input
            className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm outline-none backdrop-blur-lg placeholder:text-white/35 focus:border-white/30"
            placeholder={orgPlaceholder}
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-rose-400/30 bg-rose-500/15 px-4 py-3 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        <button
          className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/90 disabled:opacity-60"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <div className="mt-5 text-sm text-white/70">
        Already have an account?{' '}
        <Link
          className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/60"
          to={`/login/${normalizedRole}`}
        >
          Sign in
        </Link>
      </div>
    </GlassShell>
  )
}

