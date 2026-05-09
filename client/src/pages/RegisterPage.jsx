import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function GlassShell({ children }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center px-4 pt-32 pb-20">
      <div className="w-full">
        <div className="mx-auto max-w-md p-8 glass-card rounded-[32px] shadow-2xl">
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
  const [isSuccess, setIsSuccess] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setIsSuccess(false)
    setIsLoading(true)

    try {
      // Simulate backend registration call
      await new Promise((r) => setTimeout(r, 800))
      setIsSuccess(true)
      
      // Wait for user to read the success message before redirecting
      setTimeout(() => {
        navigate(`/login/${normalizedRole}`, { replace: true })
      }, 1500)
    } catch (err) {
      setError('Registration failed. Please try again.')
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

      <form className="mt-8 space-y-5" onSubmit={onSubmit}>
        <label className="block space-y-2">
          <div className="text-[13px] font-bold text-[#86868B]">Name</div>
          <input
            className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm outline-none transition-all placeholder:text-white/20 focus:border-[#0071E3]/50 focus:bg-white/10"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="block space-y-2">
          <div className="text-[13px] font-bold text-[#86868B]">Email</div>
          <input
            className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm outline-none transition-all placeholder:text-white/20 focus:border-[#0071E3]/50 focus:bg-white/10"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>

        <label className="block space-y-2">
          <div className="text-[13px] font-bold text-[#86868B]">Password</div>
          <input
            className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm outline-none transition-all placeholder:text-white/20 focus:border-[#0071E3]/50 focus:bg-white/10"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={6}
          />
        </label>

        <label className="block space-y-2">
          <div className="text-[13px] font-bold text-[#86868B]">{orgLabel}</div>
          <input
            className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm outline-none transition-all placeholder:text-white/20 focus:border-[#0071E3]/50 focus:bg-white/10"
            placeholder={orgPlaceholder}
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-rose-400/10 bg-rose-500/10 px-5 py-4 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        {isSuccess ? (
          <div className="rounded-2xl border border-emerald-400/10 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
            Account created successfully! Redirecting to login...
          </div>
        ) : null}

        <button
          className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-4 text-sm font-bold text-black transition hover:bg-[#F5F5F7] disabled:opacity-60 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-[#86868B] font-medium">
        Already have an account?{' '}
        <Link
          className="font-bold text-white hover:text-[#0071E3] transition-colors"
          to={`/login/${normalizedRole}`}
        >
          Sign in
        </Link>
      </div>
    </GlassShell>
  )
}

