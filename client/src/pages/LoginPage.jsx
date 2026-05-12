import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

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

export default function LoginPage() {
  const { role } = useParams()
  const navigate = useNavigate()
  const normalizedRole = useMemo(() => {
    if (role === 'professional' || role === 'student') return role
    return 'student'
  }, [role])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Backend wiring comes next; for now just show UI works.
      await new Promise((r) => setTimeout(r, 500))
      navigate('/', { replace: true })
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GlassShell>
      <div className="space-y-1 mb-8">
        <div className="text-sm text-white/70">Welcome back</div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Sign In
        </h2>
      </div>

      {/* Role Toggle Switch */}
      <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 mb-8 relative">
        <motion.div
          className="absolute top-1 bottom-1 left-1 rounded-xl bg-white shadow-lg"
          initial={false}
          animate={{
            x: normalizedRole === 'student' ? '0%' : '100%',
            width: 'calc(50% - 4px)'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button
          onClick={() => navigate('/login/student')}
          className={`relative z-10 flex-1 py-2.5 text-sm font-bold transition-colors duration-200 ${normalizedRole === 'student' ? 'text-black' : 'text-[#86868B] hover:text-white'}`}
        >
          Student
        </button>
        <button
          onClick={() => navigate('/login/professional')}
          className={`relative z-10 flex-1 py-2.5 text-sm font-bold transition-colors duration-200 ${normalizedRole === 'professional' ? 'text-black' : 'text-[#86868B] hover:text-white'}`}
        >
          Mentor
        </button>
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        <label className="block space-y-2">
          <div className="text-[13px] font-bold text-[#86868B] ml-1">Email ID</div>
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
          <div className="text-[13px] font-bold text-[#86868B] ml-1">Password</div>
          <input
            className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm outline-none transition-all placeholder:text-white/20 focus:border-[#0071E3]/50 focus:bg-white/10"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>

        {error ? (
          <div className="rounded-2xl border border-rose-400/10 bg-rose-500/10 px-5 py-4 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <button
          className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-4 text-sm font-bold text-black transition hover:bg-[#F5F5F7] disabled:opacity-60 shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98]"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              <span>Signing in…</span>
            </div>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-[#86868B] font-medium">
        New here?{' '}
        <Link
          className="font-bold text-white hover:text-[#0071E3] transition-colors"
          to={`/register/${normalizedRole}`}
        >
          Create an account
        </Link>
      </div>
    </GlassShell>
  )
}

