import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Mail, Lock, User, Briefcase, GraduationCap, Sparkles, ChevronRight } from 'lucide-react'

function GlassShell({ children }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#007AFF]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="w-full max-w-[480px] relative z-10">
        <div className="glass-card p-10 rounded-[40px] shadow-2xl border-white/10">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage({ onLogin }) {
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
      await new Promise((r) => setTimeout(r, 1200))
      setIsSuccess(true)
      onLogin() // Set global state
      
      setTimeout(() => {
        navigate(`/dashboard`, { replace: true })
      }, 1500)
    } catch (err) {
      setError('Registration failed. Please try again.')
      setIsLoading(false)
    }
  }

  const orgLabel = normalizedRole === 'professional' ? 'Company / Expertise' : 'University / College'
  const orgPlaceholder =
    normalizedRole === 'professional' ? 'e.g., Senior Engineer at Stripe' : 'e.g., Stanford University'

  return (
    <GlassShell>
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
          <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-wider">Join Mentor Connect</span>
        </div>
        <h2 className="text-4xl font-black tracking-tight text-white mb-2">
          Create Account
        </h2>
        <p className="text-zinc-500 text-sm font-medium">Start your journey with us today.</p>
      </div>

      {/* Role Toggle Switch */}
      <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10 mb-10 relative">
        <motion.div
          className="absolute top-1.5 bottom-1.5 left-1.5 rounded-xl bg-white shadow-lg"
          initial={false}
          animate={{
            x: normalizedRole === 'student' ? '0%' : '100%',
            width: 'calc(50% - 6px)'
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button
          onClick={() => navigate('/register/student')}
          className={`relative z-10 flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors duration-200 ${normalizedRole === 'student' ? 'text-black' : 'text-zinc-500 hover:text-white'}`}
        >
          Student
        </button>
        <button
          onClick={() => navigate('/register/professional')}
          className={`relative z-10 flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors duration-200 ${normalizedRole === 'professional' ? 'text-black' : 'text-zinc-500 hover:text-white'}`}
        >
          Mentor
        </button>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-500 ml-1">
            <User className="w-3 h-3" /> Full Name
          </div>
          <input
            className="w-full rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-sm text-white outline-none transition-all placeholder:text-zinc-700 focus:border-[#007AFF]/50 focus:bg-white/10"
            placeholder="Ravi Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-500 ml-1">
            <Mail className="w-3 h-3" /> Email Address
          </div>
          <input
            className="w-full rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-sm text-white outline-none transition-all placeholder:text-zinc-700 focus:border-[#007AFF]/50 focus:bg-white/10"
            placeholder="ravi@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-500 ml-1">
            <Lock className="w-3 h-3" /> Password
          </div>
          <input
            className="w-full rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-sm text-white outline-none transition-all placeholder:text-zinc-700 focus:border-[#007AFF]/50 focus:bg-white/10"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={6}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-zinc-500 ml-1">
            {normalizedRole === 'professional' ? <Briefcase className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
            {orgLabel}
          </div>
          <input
            className="w-full rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-sm text-white outline-none transition-all placeholder:text-zinc-700 focus:border-[#007AFF]/50 focus:bg-white/10"
            placeholder={orgPlaceholder}
            value={org}
            onChange={(e) => setOrg(e.target.value)}
          />
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-5 py-4 text-xs font-bold text-rose-400">
            {error}
          </div>
        )}

        {isSuccess && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-xs font-bold text-emerald-400">
            Welcome to Mentor Connect! Redirecting...
          </div>
        )}

        <button
          className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-black text-black transition hover:bg-zinc-200 disabled:opacity-60 shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-[0.98] group"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              <span>Creating account…</span>
            </div>
          ) : (
            <span className="flex items-center gap-2">Create Account <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          )}
        </button>
      </form>

      <div className="mt-10 text-center text-xs font-bold">
        <span className="text-zinc-500">Already have an account?</span>{' '}
        <Link
          className="text-white hover:text-[#007AFF] transition-colors underline underline-offset-4"
          to={`/login/${normalizedRole}`}
        >
          Sign in
        </Link>
      </div>
    </GlassShell>
  )
}

