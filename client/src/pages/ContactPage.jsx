import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
} from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function GlassCard({ className, children }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/10 opacity-70" />
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignCls = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  return (
    <div className={cn('mx-auto flex max-w-3xl flex-col gap-4', alignCls)}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80 backdrop-blur">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="text-pretty text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}

function HeroOrbs() {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="absolute right-[5%] top-[10%] h-80 w-80 rounded-full bg-purple-500/15 blur-[110px]" />
        <div className="absolute bottom-[5%] left-[40%] h-64 w-64 rounded-full bg-indigo-500/12 blur-[90px]" />
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-[18%] h-80 w-80 rounded-full bg-gradient-to-br from-cyan-500/25 to-blue-600/10 blur-[90px]"
        animate={{ x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[0%] top-[8%] h-96 w-96 rounded-full bg-gradient-to-br from-purple-500/25 to-fuchsia-500/10 blur-[100px]"
        animate={{ x: [0, -20, 0], y: [0, 22, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[0%] left-[35%] h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-500/20 to-cyan-400/10 blur-[85px]"
        animate={{ x: [0, 16, 0], y: [0, 14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(ellipse_at_80%_60%,rgba(168,85,247,0.10),transparent_50%)]" />
    </div>
  );
}

function useMouseGlow() {
  const ref = useRef(null);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--glow-x', `${x}%`);
        el.style.setProperty('--glow-y', `${y}%`);
      });
    };

    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mousemove', onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return ref;
}

/** Mentorship / support illustration — layered SVG for a premium “3D” feel */
function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-square max-w-md lg:max-w-none">
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-slate-900/40 to-purple-500/10 blur-xl" />
      <svg
        viewBox="0 0 480 480"
        className="relative z-[1] h-full w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="g2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Back plate */}
        <rect x="72" y="96" width="336" height="288" rx="36" fill="url(#g1)" opacity="0.12" />
        <rect x="88" y="112" width="304" height="256" rx="28" fill="#0f172a" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        {/* Floating cards */}
        <g filter="url(#soft)">
          <rect x="116" y="148" width="132" height="92" rx="18" fill="rgba(15,23,42,0.92)" stroke="rgba(34,211,238,0.35)" />
          <circle cx="152" cy="184" r="16" fill="url(#g2)" opacity="0.9" />
          <rect x="184" y="172" width="48" height="8" rx="4" fill="rgba(255,255,255,0.35)" />
          <rect x="184" y="188" width="36" height="8" rx="4" fill="rgba(255,255,255,0.18)" />
        </g>
        <g filter="url(#soft)">
          <rect x="248" y="168" width="124" height="108" rx="18" fill="rgba(15,23,42,0.92)" stroke="rgba(168,85,247,0.35)" />
          <rect x="268" y="196" width="84" height="10" rx="5" fill="rgba(255,255,255,0.22)" />
          <rect x="268" y="218" width="64" height="10" rx="5" fill="rgba(255,255,255,0.12)" />
          <rect x="268" y="240" width="72" height="10" rx="5" fill="rgba(255,255,255,0.12)" />
        </g>
        {/* Headset / mentor figure abstract */}
        <ellipse cx="240" cy="312" rx="88" ry="52" fill="rgba(99,102,241,0.25)" />
        <circle cx="240" cy="276" r="44" fill="url(#g2)" opacity="0.95" />
        <path
          d="M196 268 Q240 232 284 268"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <rect x="188" y="262" width="104" height="36" rx="18" fill="rgba(15,23,42,0.85)" stroke="rgba(34,211,238,0.4)" />
        {/* Chat bubbles */}
        <g opacity="0.95">
          <rect x="124" y="332" width="112" height="44" rx="14" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.45)" />
          <rect x="268" y="348" width="96" height="36" rx="12" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.45)" />
        </g>
        {/* Orbit ring */}
        <ellipse
          cx="240"
          cy="240"
          rx="200"
          ry="200"
          fill="none"
          stroke="url(#g1)"
          strokeWidth="1.2"
          strokeDasharray="10 14"
          opacity="0.35"
        />
      </svg>
    </div>
  );
}

const SUBJECTS = ['Career Guidance', 'Mentorship', 'Technical Support', 'Partnership', 'Other'];

function FloatingField({ error, children, className }) {
  return (
    <div className={cn('relative', className)}>
      {children}
      <AnimatePresence>
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 text-xs font-medium text-rose-300"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function FloatingLabelInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder = ' ',
  inputMode,
  autoComplete,
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || (value && String(value).length > 0);

  return (
    <FloatingField error={error}>
      <div className="group relative">
        <motion.input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          inputMode={inputMode}
          autoComplete={autoComplete}
          className={cn(
            'peer w-full rounded-2xl border bg-slate-950/50 px-4 pb-3 pt-6 text-sm text-slate-100 outline-none transition-all duration-300',
            'border-white/10 shadow-inner shadow-black/20',
            'focus:border-cyan-400/40 focus:bg-slate-900/60 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12),0_0_40px_rgba(99,102,241,0.08)]',
            error && 'border-rose-400/40 focus:border-rose-400/50 focus:shadow-[0_0_0_4px_rgba(244,63,94,0.12)]'
          )}
        />
        <motion.label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-1/2 z-[1] origin-left text-sm font-medium text-slate-500"
          animate={{
            y: active ? -14 : -2,
            scale: active ? 0.78 : 1,
            color: active ? 'rgba(34, 211, 238, 0.95)' : 'rgba(148, 163, 184, 0.9)',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
        </motion.label>
      </div>
    </FloatingField>
  );
}

function FloatingLabelTextarea({ id, label, value, onChange, onBlur, error }) {
  const [focused, setFocused] = useState(false);
  const active = focused || (value && value.length > 0);

  return (
    <FloatingField error={error}>
      <div className="group relative">
        <motion.textarea
          id={id}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setFocused(true)}
          rows={5}
          placeholder=" "
          className={cn(
            'peer min-h-[150px] w-full resize-none rounded-2xl border bg-slate-950/50 px-4 pb-3 pt-7 text-sm text-slate-100 outline-none transition-all duration-300',
            'border-white/10 shadow-inner shadow-black/20',
            'focus:border-purple-400/40 focus:bg-slate-900/60 focus:shadow-[0_0_0_4px_rgba(168,85,247,0.12),0_0_40px_rgba(34,211,238,0.06)]',
            error && 'border-rose-400/40'
          )}
        />
        <motion.label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-5 z-[1] origin-left text-sm font-medium text-slate-500"
          animate={{
            y: active ? -10 : 0,
            scale: active ? 0.78 : 1,
            color: active ? 'rgba(168, 85, 247, 0.95)' : 'rgba(148, 163, 184, 0.9)',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
        </motion.label>
      </div>
    </FloatingField>
  );
}

function FloatingSelect({ id, label, value, onChange, onBlur, error, children }) {
  const [focused, setFocused] = useState(false);
  const active = focused || (value && value.length > 0);

  return (
    <FloatingField error={error}>
      <div className="relative">
        <motion.select
          id={id}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setFocused(true)}
          className={cn(
            'peer w-full appearance-none rounded-2xl border bg-slate-950/50 px-4 pb-3 pt-6 text-sm text-slate-100 outline-none transition-all duration-300',
            'border-white/10 shadow-inner shadow-black/20',
            'focus:border-cyan-400/40 focus:bg-slate-900/60 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]',
            error && 'border-rose-400/40',
            !value && 'text-slate-500'
          )}
        >
          {children}
        </motion.select>
        <motion.label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-1/2 z-[1] origin-left text-sm font-medium text-slate-500"
          animate={{
            y: active ? -14 : -2,
            scale: active ? 0.78 : 1,
            color: active ? 'rgba(34, 211, 238, 0.95)' : 'rgba(148, 163, 184, 0.9)',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {label}
        </motion.label>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
      </div>
    </FloatingField>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-4 p-1" aria-hidden>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-14 animate-pulse rounded-2xl bg-white/[0.06]" />
        <div className="h-14 animate-pulse rounded-2xl bg-white/[0.06]" />
      </div>
      <div className="h-14 animate-pulse rounded-2xl bg-white/[0.06]" />
      <div className="h-14 animate-pulse rounded-2xl bg-white/[0.06]" />
      <div className="h-40 animate-pulse rounded-2xl bg-white/[0.06]" />
      <div className="h-12 w-40 animate-pulse rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20" />
    </div>
  );
}

function SuccessModal({ open, onClose }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            aria-label="Close"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
            className="relative z-[1] w-full max-w-md overflow-hidden rounded-3xl border border-cyan-400/25 bg-slate-900/90 p-8 shadow-[0_0_80px_rgba(34,211,238,0.15)] backdrop-blur-2xl"
            initial={reduced ? false : { opacity: 0, scale: 0.92, y: 16 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />
            <motion.div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/25 to-purple-500/30 ring-1 ring-cyan-400/30"
              initial={reduced ? false : { scale: 0.6, rotate: -12 }}
              animate={reduced ? {} : { scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 14, stiffness: 260, delay: 0.05 }}
            >
              <CheckCircle2 className="h-9 w-9 text-cyan-300" />
            </motion.div>
            <h3 id="success-title" className="mt-6 text-center text-xl font-bold text-white">
              Message sent
            </h3>
            <p className="mt-2 text-center text-sm leading-relaxed text-slate-400">
              Thanks for reaching out. Our team will respond shortly—usually within one business day.
            </p>
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-[box-shadow] hover:shadow-[0_0_32px_rgba(34,211,238,0.35)]"
            >
              Done
            </motion.button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ContactForm({ loading }) {
  const reduced = useReducedMotion();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle');
  const [shake, setShake] = useState(0);
  const [successOpen, setSuccessOpen] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!values.name.trim()) e.name = 'Please enter your full name.';
    if (!values.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = 'Enter a valid email address.';
    if (values.phone.trim()) {
      const digits = values.phone.replace(/\D/g, '');
      if (digits.length < 10) e.phone = 'Enter a valid phone number (10+ digits).';
    }
    if (!values.subject) e.subject = 'Please choose a subject.';
    if (!values.message.trim() || values.message.trim().length < 12) {
      e.message = 'Message should be at least 12 characters.';
    }
    return e;
  }, [values]);

  const showError = (k) => touched[k] && errors[k];

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    if (Object.keys(errors).length) {
      setShake((s) => s + 1);
      return;
    }
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('idle');
    setSuccessOpen(true);
    setValues({ name: '', email: '', phone: '', subject: '', message: '' });
    setTouched({});
    if (!reduced) {
      setTimeout(() => setSuccessOpen(false), 4500);
    }
  };

  return (
    <>
      <GlassCard className="p-7 sm:p-10">
        <div className="relative z-[1] flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Send a message</h3>
            <p className="mt-1 text-sm text-slate-400">
              Tell us how we can help. We route every note to the right specialist.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-purple-500/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-purple-200/90">
            <Sparkles className="h-3.5 w-3.5" />
            Encrypted in transit
          </div>
        </div>

        <div className="relative z-[1] mt-8">
          {loading ? (
            <FormSkeleton />
          ) : (
            <motion.form
              onSubmit={onSubmit}
              className="grid gap-5"
              animate={shake ? { x: [0, -8, 8, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              key={shake}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FloatingLabelInput
                  id="fullName"
                  label="Full Name"
                  value={values.name}
                  onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  error={showError('name')}
                  autoComplete="name"
                />
                <FloatingLabelInput
                  id="email"
                  label="Email Address"
                  type="email"
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  error={showError('email')}
                  inputMode="email"
                  autoComplete="email"
                />
              </div>
              <FloatingLabelInput
                id="phone"
                label="Phone Number (optional)"
                type="tel"
                value={values.phone}
                onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                error={showError('phone')}
                inputMode="tel"
                autoComplete="tel"
              />
              <FloatingSelect
                id="subject"
                label="Subject"
                value={values.subject}
                onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
                error={showError('subject')}
              >
                <option value="" className="bg-slate-950">
                  Select a topic
                </option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s} className="bg-slate-950">
                    {s}
                  </option>
                ))}
              </FloatingSelect>
              <FloatingLabelTextarea
                id="message"
                label="Message"
                value={values.message}
                onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                error={showError('message')}
              />

              <div className="flex flex-col-reverse items-start justify-between gap-4 pt-1 sm:flex-row sm:items-center">
                <p className="max-w-sm text-xs leading-relaxed text-slate-500">
                  By sending this form, you agree to our respectful communication guidelines. We never sell your data.
                </p>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={status === 'sending' ? {} : { scale: 1.02 }}
                  whileTap={status === 'sending' ? {} : { scale: 0.98 }}
                  className={cn(
                    'group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-8 py-4 text-sm font-semibold text-white transition-[box-shadow]',
                    status === 'sending'
                      ? 'cursor-not-allowed border border-white/10 bg-white/10'
                      : 'border border-cyan-400/30 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 shadow-[0_0_40px_rgba(34,211,238,0.25)] hover:shadow-[0_0_48px_rgba(168,85,247,0.35)]'
                  )}
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                    {status === 'sending' ? null : <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                  </span>
                  <AnimatePresence>
                    {status === 'sending' ? (
                      <motion.span
                        key="loader"
                        className="absolute inset-0 bg-white/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.span
                          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          animate={{ x: ['-120%', '320%'] }}
                          transition={{ duration: 1.15, repeat: Infinity, ease: 'easeInOut' }}
                        />
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.form>
          )}
        </div>
      </GlassCard>
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </>
  );
}

function InfoCards() {
  const items = [
    {
      title: 'Email Support',
      value: 'hello@peerly.com',
      hint: 'We reply within 24 hours.',
      icon: Mail,
      href: 'mailto:hello@peerly.com',
    },
    {
      title: 'Phone',
      value: '+1 (555) 014‑2891',
      hint: 'Mon–Fri, 9am–6pm PT',
      icon: Phone,
      href: 'tel:+15550142891',
    },
    {
      title: 'Office',
      value: '500 Howard St, San Francisco',
      hint: 'Suite 420 · CA 94105',
      icon: MapPin,
      href: 'https://maps.google.com/?q=500+Howard+St+San+Francisco',
    },
    {
      title: 'Working Hours',
      value: '9:00 – 18:00 PT',
      hint: 'Weekend chat: AI + on-call',
      icon: Clock,
      href: '#chat',
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, idx) => (
        <motion.a
          key={item.title}
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: idx * 0.06, ease: 'easeOut' }}
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.99 }}
          className="group relative block outline-none"
        >
          <div
            className={cn(
              'relative h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur-xl transition-all duration-500',
              'shadow-[0_20px_50px_rgba(0,0,0,0.35)]',
              'hover:border-cyan-400/40 hover:shadow-[0_28px_70px_rgba(34,211,238,0.12),0_0_0_1px_rgba(168,85,247,0.25)]'
            )}
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.14),transparent_45%)]" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105">
              <item.icon className="h-6 w-6 text-cyan-200" strokeWidth={1.5} />
            </div>
            <div className="relative mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.title}</div>
            <div className="relative mt-2 text-base font-semibold text-white">{item.value}</div>
            <p className="relative mt-2 text-sm text-slate-400">{item.hint}</p>
            <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.35),inset_0_0_40px_rgba(168,85,247,0.08)]" />
          </div>
        </motion.a>
      ))}
    </div>
  );
}

const FAQ_TAGS = ['How mentorship works?', 'How to join as mentor?', 'Pricing plans', 'Technical issue'];

function LiveChatSection() {
  const reduced = useReducedMotion();
  return (
    <GlassCard id="chat" className="scroll-mt-32 p-7 sm:p-10">
      <div className="relative z-[1] flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200">
            <Bot className="h-4 w-4" />
            AI + human support
          </div>
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">Instant answers. Real people when it matters.</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            Preview our assistant experience—smart routing, context-aware replies, and seamless handoff to mentors or support.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {FAQ_TAGS.map((tag) => (
              <motion.button
                key={tag}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-400/35 hover:bg-cyan-500/10 hover:text-white"
              >
                {tag}
              </motion.button>
            ))}
          </div>
          <motion.a
            href="#send"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-[box-shadow] hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]"
          >
            <MessageSquare className="h-4 w-4" />
            Chat With Support
          </motion.a>
        </div>

        <div className="relative w-full max-w-md lg:max-w-sm">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/15 to-purple-500/15 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-inner shadow-black/40">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-600/30 ring-1 ring-white/10">
                <Bot className="h-6 w-6 text-cyan-200" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Peerly Assistant</div>
                <div className="text-xs text-emerald-400/90">Online · typical reply &lt; 2 min</div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="mr-8 rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                Hi! I can help with mentorship matching, billing, or technical issues. What do you need?
              </div>
              <div className="ml-8 rounded-2xl rounded-tr-sm border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-slate-100">
                I’m curious how sessions are scheduled with my mentor.
              </div>
              <div className="mr-8 rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                You’ll pick times from your mentor’s calendar. We’ll send reminders and a secure video link automatically.
              </div>
            </div>
            {!reduced ? (
              <div className="mt-4 flex items-center gap-1.5 px-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-cyan-400/70"
                    animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12 }}
                  />
                ))}
                <span className="ml-2 text-xs text-slate-500">Assistant is thinking…</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function MapSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <GlassCard className="overflow-hidden p-2 sm:p-3">
        <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950">
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
          <div className="relative aspect-[16/9] min-h-[240px] w-full sm:min-h-[320px]">
            <iframe
              title="Peerly office map"
              className="absolute inset-0 h-full w-full border-0 grayscale contrast-[1.15] invert-[0.92] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-122.3995,37.7875,-122.3945,37.7915&layer=mapnik&marker=37.7895,-122.3970"
            />
          </div>
          <div className="relative z-[2] flex flex-col gap-2 border-t border-white/5 bg-slate-950/90 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <MapPin className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Visit us</div>
                <div className="text-xs text-slate-400">500 Howard St · San Francisco, CA</div>
              </div>
            </div>
            <a
              href="https://www.openstreetmap.org/?mlat=37.7895&mlon=-122.3970#map=17/37.7895/-122.3970"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-500/10"
            >
              Open full map
            </a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={props.className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={props.className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.07-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function IconX(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={props.className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function IconDiscord(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={props.className}>
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
function IconYouTube(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={props.className}>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function SocialSection() {
  const links = [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/', Icon: IconLinkedIn, from: 'from-[#0A66C2]/30', to: 'to-cyan-500/20' },
    { name: 'Instagram', href: 'https://www.instagram.com/', Icon: IconInstagram, from: 'from-fuchsia-500/25', to: 'to-amber-400/15' },
    { name: 'X', href: 'https://x.com/', Icon: IconX, from: 'from-slate-200/20', to: 'to-slate-500/10' },
    { name: 'Discord', href: 'https://discord.com/', Icon: IconDiscord, from: 'from-indigo-500/30', to: 'to-cyan-400/15' },
    { name: 'YouTube', href: 'https://www.youtube.com/', Icon: IconYouTube, from: 'from-red-500/25', to: 'to-rose-400/15' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
      {links.map((s, idx) => (
        <motion.a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.05, duration: 0.4 }}
          whileHover={{ scale: 1.08, y: -4 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            'group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50 text-white shadow-lg transition-[box-shadow] duration-300',
            'hover:border-cyan-400/40 hover:shadow-[0_0_32px_rgba(34,211,238,0.35),0_0_2px_rgba(168,85,247,0.5)]'
          )}
        >
          <span
            className={cn(
              'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
              'bg-gradient-to-br',
              s.from,
              s.to
            )}
          />
          <s.Icon className="relative z-[1] h-7 w-7 text-slate-100 transition-transform duration-300 group-hover:scale-110" />
        </motion.a>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const glowRef = useMouseGlow();
  const [formLoading, setFormLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setFormLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <main
      ref={glowRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617] pt-28 text-white"
    >
      <HeroOrbs />
      <div className="pointer-events-none absolute inset-0 opacity-40 md:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--glow-x,50%)_var(--glow-y,40%),rgba(34,211,238,0.08),transparent_55%)]" />
      </div>

      {/* 1. Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pb-20 pt-8 sm:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="relative z-[1]">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Contact · Mentorship · Support
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-7 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Get In{' '}
              <span
                className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', animation: 'gradient 8s linear infinite' }}
              >
                Touch
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-slate-400"
            >
              Have questions, need guidance, or want to become a mentor? We’d love to hear from you.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#send"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 px-8 py-4 text-sm font-semibold shadow-[0_0_40px_rgba(34,211,238,0.25)] transition hover:shadow-[0_0_48px_rgba(168,85,247,0.3)]"
              >
                Message us
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                to="/register/mentor"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-slate-200 backdrop-blur transition hover:border-cyan-400/25 hover:bg-white/10"
              >
                Become a mentor
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative z-[1]"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <SectionHeading
          eyebrow="We’re here"
          title="Reach us directly"
          subtitle="Human support with clear channels—no maze, no dead ends."
        />
        <div className="mt-12">
          <InfoCards />
        </div>
      </section>

      {/* Form */}
      <section id="send" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Write to us"
          title="A contact form that feels as premium as the product"
          subtitle="Floating labels, tactile focus states, validation that guides—not scolds."
        />
        <div className="mt-12 max-w-3xl">
          <ContactForm loading={formLoading} />
        </div>
      </section>

      {/* Live chat */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <LiveChatSection />
      </section>

      {/* Map */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <SectionHeading
          eyebrow="Location"
          title="Find us on the map"
          subtitle="Dark-styled embed for a cohesive, product-grade experience."
        />
        <div className="mt-12">
          <MapSection />
        </div>
      </section>

      {/* Social */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:pb-24">
        <SectionHeading
          eyebrow="Community"
          title="Stay close to the mentorship network"
          subtitle="Follow product updates, mentor spotlights, and student wins."
        />
        <div className="mt-12">
          <SocialSection />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative mx-auto max-w-6xl px-4 pb-28 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="relative overflow-hidden p-10 sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(34,211,238,0.18),transparent_50%),radial-gradient(circle_at_90%_20%,rgba(168,85,247,0.2),transparent_50%)]" />
            <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">
                  Start today
                </div>
                <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Your Future Starts With The Right Mentor
                </h2>
                <p className="mt-4 text-pretty text-base text-slate-400 sm:text-lg">
                  Book a short call and we’ll match you with guidance that fits your goals—career, skills, or confidence.
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="shrink-0">
                <Link
                  to="/register/student"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-sm font-bold text-slate-900 shadow-[0_0_40px_rgba(255,255,255,0.2)] transition hover:shadow-[0_0_55px_rgba(34,211,238,0.35)]"
                >
                  Book a Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </section>
    </main>
  );
}
