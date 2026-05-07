import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Globe2,
  HeartHandshake,
  HelpCircle,
  LifeBuoy,
  Link2,
  Code2,
  Camera,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wand2,
} from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function GlassCard({ className, children }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60" />
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignCls = align === 'left' ? 'text-left items-start' : 'text-center items-center';
  return (
    <div className={cn('mx-auto flex max-w-3xl flex-col gap-4', alignCls)}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur">
          <Sparkles className="h-4 w-4 text-indigo-300" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {subtitle ? <p className="text-pretty text-base leading-relaxed text-white/60 sm:text-lg">{subtitle}</p> : null}
    </div>
  );
}

function Particles() {
  const reduced = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: `${Math.round(Math.random() * 100)}%`,
        top: `${Math.round(Math.random() * 100)}%`,
        size: 2 + Math.round(Math.random() * 3),
        delay: Math.random() * 2,
        duration: 6 + Math.random() * 5,
        opacity: 0.22 + Math.random() * 0.35,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {!reduced &&
        items.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size, opacity: p.opacity }}
            animate={{ y: [0, -18, 0], opacity: [p.opacity, Math.min(0.8, p.opacity + 0.25), p.opacity] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(99,102,241,0.22),transparent_45%),radial-gradient(circle_at_80%_25%,rgba(168,85,247,0.20),transparent_45%),radial-gradient(circle_at_55%_85%,rgba(236,72,153,0.12),transparent_50%)]" />
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

function FloatingPill({ icon: Icon, title, className }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl',
        className
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10">
        <Icon className="h-5 w-5 text-indigo-200" />
      </span>
      {title}
    </div>
  );
}

function ContactCards() {
  const cards = [
    {
      title: 'Email Support',
      desc: 'Help with accounts, sessions, and platform questions.',
      icon: Mail,
      action: { label: 'Email', href: 'mailto:support@peerly.com' },
    },
    {
      title: 'Business Inquiries',
      desc: 'Hiring partnerships, campus programs, and company plans.',
      icon: Building2,
      action: { label: 'Reach out', href: 'mailto:business@peerly.com' },
    },
    {
      title: 'Partnerships',
      desc: 'Mentor communities, events, and ecosystem collaborations.',
      icon: HeartHandshake,
      action: { label: 'Partner', href: 'mailto:partners@peerly.com' },
    },
    {
      title: 'Technical Support',
      desc: 'Video call help, bugs, and performance issues.',
      icon: Terminal,
      action: { label: 'Report', href: 'mailto:tech@peerly.com' },
    },
    {
      title: 'Community Help',
      desc: 'Moderation, safety, and reporting concerns.',
      icon: LifeBuoy,
      action: { label: 'Contact', href: 'mailto:community@peerly.com' },
    },
  ];

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, idx) => (
        <motion.a
          key={c.title}
          href={c.action.href}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.03 }}
          className="block outline-none"
        >
          <GlassCard className="group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
            <div className="flex items-start gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10">
                <c.icon className="h-6 w-6 text-indigo-200" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.45),transparent_60%)]" />
              </div>
              <div className="flex-1">
                <div className="text-base font-semibold text-white">{c.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{c.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors group-hover:text-white">
                  {c.action.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--glow-x,50%)_var(--glow-y,40%),rgba(168,85,247,0.22),transparent_45%)]" />
          </GlassCard>
        </motion.a>
      ))}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute left-3 top-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/35">
        {label}
      </div>
      <AnimatePresence>
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-2 text-xs font-medium text-rose-300"
          >
            {error}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ContactForm() {
  const reduced = useReducedMotion();
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const [shake, setShake] = useState(0);

  const errors = useMemo(() => {
    const e = {};
    if (!values.name.trim()) e.name = 'Name is required.';
    if (!values.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = 'Enter a valid email.';
    if (!values.subject) e.subject = 'Pick a subject.';
    if (!values.message.trim() || values.message.trim().length < 12) e.message = 'Message should be at least 12 characters.';
    return e;
  }, [values]);

  const showError = (k) => touched[k] && errors[k];

  const onSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errors).length) {
      setShake((s) => s + 1);
      return;
    }
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1100));
    setStatus('success');
    if (!reduced) {
      setTimeout(() => setStatus('idle'), 2400);
    }
    setValues({ name: '', email: '', subject: '', message: '' });
    setTouched({});
  };

  return (
    <GlassCard className="p-7 sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-lg font-semibold text-white">Send a message</div>
          <div className="mt-1 text-sm text-white/50">We typically reply within a few minutes during active hours.</div>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60">
          <Wand2 className="h-4 w-4 text-indigo-300" />
          Smart routing
        </div>
      </div>

      <motion.form
        onSubmit={onSubmit}
        className="mt-8 grid gap-4"
        animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : {}}
        transition={{ duration: 0.35 }}
        key={shake}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" error={showError('name')}>
            <input
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 pb-3 pt-7 text-sm text-white/80 outline-none transition focus:border-white/20 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]"
              placeholder="Your name"
            />
          </Field>
          <Field label="Email" error={showError('email')}>
            <input
              value={values.email}
              onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 pb-3 pt-7 text-sm text-white/80 outline-none transition focus:border-white/20 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(168,85,247,0.10)]"
              placeholder="you@domain.com"
              inputMode="email"
            />
          </Field>
        </div>

        <Field label="Subject" error={showError('subject')}>
          <div className="relative">
            <select
              value={values.subject}
              onChange={(e) => setValues((v) => ({ ...v, subject: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
              className="w-full appearance-none rounded-2xl border border-white/10 bg-white/5 px-4 pb-3 pt-7 text-sm text-white/80 outline-none transition focus:border-white/20 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]"
            >
              <option value="" className="bg-[#070A12]">Select a subject</option>
              <option value="Mentorship" className="bg-[#070A12]">Mentorship</option>
              <option value="Recruiting" className="bg-[#070A12]">Recruiting</option>
              <option value="Partnerships" className="bg-[#070A12]">Partnerships</option>
              <option value="Technical Support" className="bg-[#070A12]">Technical Support</option>
              <option value="Community" className="bg-[#070A12]">Community & Safety</option>
              <option value="Other" className="bg-[#070A12]">Other</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
          </div>
        </Field>

        <Field label="Message" error={showError('message')}>
          <textarea
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
            className="min-h-[140px] w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 pb-3 pt-7 text-sm text-white/80 outline-none transition focus:border-white/20 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(168,85,247,0.10)]"
            placeholder="Tell us what you’re trying to build, solve, or explore…"
          />
        </Field>

        <div className="mt-2 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="text-xs text-white/45">
            By sending, you agree to respectful communication. We never share your details.
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'sending'}
            className={cn(
              'group relative inline-flex items-center justify-center rounded-xl px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all',
              status === 'sending'
                ? 'bg-white/10 border border-white/10 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-indigo-500/25 hover:shadow-indigo-500/40'
            )}
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent' : 'Send'}
              {status === 'success' ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </span>
            <AnimatePresence>
              {status === 'sending' ? (
                <motion.span
                  key="loader"
                  className="absolute inset-0 rounded-xl bg-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="absolute inset-y-0 left-0 w-1/3 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-120%', '320%'] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.span>
              ) : null}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200"
            >
              Message sent successfully. We’ll get back to you shortly.
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.form>
    </GlassCard>
  );
}

function LiveSupportMock() {
  const reduced = useReducedMotion();
  return (
    <GlassCard className="p-7 sm:p-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60">
            <Wand2 className="h-4 w-4 text-indigo-300" />
            AI Support
          </div>
          <div className="mt-4 text-lg font-semibold text-white">Live help, anytime</div>
          <div className="mt-1 text-sm text-white/50">Average response time: &lt; 5 mins</div>
        </div>
        <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
          <MessageSquare className="h-6 w-6 text-indigo-200" />
        </div>
      </div>

      <div className="mt-7 rounded-3xl border border-white/10 bg-black/25 p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500/25 to-purple-500/25 ring-1 ring-white/10" />
          <div>
            <div className="text-sm font-semibold text-white/80">Peerly Assistant</div>
            <div className="text-xs text-white/45">Typing…</div>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <div className="w-fit max-w-[90%] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
            Tell me what you’re trying to do—mentorship, recruiting, or partnerships—and I’ll route you instantly.
          </div>
          <div className="ml-auto w-fit max-w-[90%] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            I’m having trouble joining a video session.
          </div>
          <div className="w-fit max-w-[90%] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
            Got it. Try refreshing the page, then rejoin from Sessions. If it persists, I’ll open a ticket.
          </div>
        </div>

        {!reduced ? (
          <div className="mt-5 flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-white/40"
                animate={{ y: [0, -4, 0], opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </GlassCard>
  );
}

function GlobalCommunity() {
  const nodes = [
    { x: 20, y: 35, label: 'San Francisco' },
    { x: 45, y: 28, label: 'London' },
    { x: 62, y: 42, label: 'Dubai' },
    { x: 74, y: 54, label: 'Bengaluru' },
    { x: 82, y: 36, label: 'Singapore' },
  ];

  return (
    <GlassCard className="relative overflow-hidden p-7 sm:p-10">
      <div className="flex items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60">
            <Globe2 className="h-4 w-4 text-indigo-300" />
            Global community
          </div>
          <div className="mt-4 text-lg font-semibold text-white">Mentors and students, worldwide</div>
          <div className="mt-1 text-sm text-white/50">Connected nodes, local clusters, and global reach.</div>
        </div>
      </div>

      <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-black/25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.16),transparent_55%),radial-gradient(circle_at_80%_45%,rgba(168,85,247,0.14),transparent_55%)]" />

        <div className="relative aspect-[16/9] p-6">
          {/* Connection lines */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none">
            {nodes.slice(0, -1).map((n, i) => {
              const next = nodes[i + 1];
              return (
                <line
                  key={i}
                  x1={n.x}
                  y1={n.y}
                  x2={next.x}
                  y2={next.y}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.6"
                />
              );
            })}
          </svg>

          {nodes.map((n, idx) => (
            <motion.div
              key={n.label}
              className="absolute"
              style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: idx * 0.05 }}
            >
              <div className="relative">
                <div className="h-3.5 w-3.5 rounded-full bg-white/70 shadow-[0_0_20px_rgba(168,85,247,0.35)]" />
                <div className="absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-2xl" />
              </div>
              <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 backdrop-blur">
                {n.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

function FAQ() {
  const items = [
    { q: 'How mentorship works', a: 'Create a profile, get recommendations, and book sessions with mentors. Use chat and notes to keep momentum between calls.' },
    { q: 'How to become a mentor', a: 'Sign up as a mentor, verify your profile, set availability, and accept session requests from students aligned to your expertise.' },
    { q: 'Account verification', a: 'Verification helps improve trust. We use signals like email, social profiles, and community checks (varies by region).' },
    { q: 'Video session support', a: 'If a session fails to join, refresh, rejoin from Sessions, and check permissions. Our support team can troubleshoot quickly.' },
    { q: 'Privacy & security', a: 'We prioritize privacy with secure auth and safety controls. You control what you share and who can contact you.' },
    { q: 'Reporting issues', a: 'Use our reporting tools for safety concerns. We respond quickly and take action to keep the community safe.' },
  ];

  const [open, setOpen] = useState(0);

  return (
    <div className="mt-12 grid gap-4">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <GlassCard key={it.q} className="p-0">
            <button
              type="button"
              onClick={() => setOpen((o) => (o === idx ? -1 : idx))}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                  <HelpCircle className="h-5 w-5 text-indigo-200" />
                </div>
                <div className="text-sm font-semibold text-white/80 sm:text-base">{it.q}</div>
              </div>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="h-5 w-5 text-white/50" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden px-6 pb-6"
                >
                  <p className="text-sm leading-relaxed text-white/60 sm:text-base">{it.a}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </GlassCard>
        );
      })}
    </div>
  );
}

function Socials() {
  const socials = [
    { name: 'LinkedIn', icon: Link2, href: 'https://www.linkedin.com/' },
    { name: 'Discord', icon: MessageSquare, href: 'https://discord.com/' },
    { name: 'Twitter / X', icon: Link2, href: 'https://x.com/' },
    { name: 'GitHub', icon: Code2, href: 'https://github.com/' },
    { name: 'Instagram', icon: Camera, href: 'https://www.instagram.com/' },
  ];
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {socials.map((s, idx) => (
        <motion.a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.03 }}
          className="block"
        >
          <GlassCard className="group p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
              <s.icon className="h-6 w-6 text-indigo-200" />
            </div>
            <div className="mt-4 text-sm font-semibold text-white/75">{s.name}</div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.22),transparent_55%)]" />
          </GlassCard>
        </motion.a>
      ))}
    </div>
  );
}

function Newsletter() {
  const reduced = useReducedMotion();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
    if (!reduced) setTimeout(() => setStatus('idle'), 2000);
    setEmail('');
  };

  return (
    <GlassCard className="p-7 sm:p-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-lg font-semibold text-white">Stay Updated With Opportunities</div>
          <div className="mt-1 text-sm text-white/50">New mentors, events, communities, and career resources.</div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60">
          <Mail className="h-4 w-4 text-indigo-300" />
          Newsletter
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@domain.com"
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80 outline-none transition focus:border-white/20 focus:bg-white/[0.06] focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)]"
          inputMode="email"
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40"
        >
          {status === 'loading' ? 'Subscribing…' : status === 'success' ? 'Subscribed' : 'Subscribe'}
        </motion.button>
      </form>
    </GlassCard>
  );
}

export default function ContactPage() {
  const glowRef = useMouseGlow();

  return (
    <main ref={glowRef} className="relative overflow-hidden pt-28">
      <Particles />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pt-10 pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_35%_20%,rgba(99,102,241,0.20),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.18),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 md:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--glow-x,50%)_var(--glow-y,45%),rgba(168,85,247,0.20),transparent_55%)]" />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-indigo-300" />
              Contact • Partnerships • Support
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className="mt-6 text-balance text-5xl font-bold tracking-tight sm:text-7xl"
            >
              Let’s Connect & Build{' '}
              <span
                className="bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', animation: 'gradient 8s linear infinite' }}
              >
                Opportunities Together
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
              className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/60"
            >
              Students, mentors, recruiters, and companies—reach out for partnerships, platform support, mentorship
              opportunities, or community collaborations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#send"
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]"
              >
                Send a Message
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                to="/register/student"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-lg transition-all hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-fuchsia-500/10 blur-2xl" />
            <GlassCard className="p-8">
              <div className="text-sm font-semibold text-white/70">Fast paths</div>
              <div className="mt-6 grid gap-3">
                {[
                  { t: 'Support', i: LifeBuoy },
                  { t: 'Partnerships', i: HeartHandshake },
                  { t: 'Security', i: ShieldCheck },
                  { t: 'Community', i: Users },
                ].map((x) => (
                  <div key={x.t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10">
                      <x.i className="h-5 w-5 text-indigo-200" />
                    </div>
                    <div className="text-sm font-semibold text-white/80">{x.t}</div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <motion.div
              aria-hidden
              className="absolute -left-4 -top-6 hidden lg:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FloatingPill icon={Mail} title="Email Support" />
            </motion.div>
            <motion.div
              aria-hidden
              className="absolute -right-6 top-14 hidden lg:block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FloatingPill icon={HeartHandshake} title="Partnerships" />
            </motion.div>
            <motion.div
              aria-hidden
              className="absolute left-10 -bottom-8 hidden lg:block"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FloatingPill icon={Wand2} title="AI Support" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact information */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Contact paths"
          title="Reach the right team instantly"
          subtitle="Premium support routes for mentors, students, recruiters, and partners."
        />
        <ContactCards />
      </section>

      {/* Form + Live support */}
      <section id="send" className="mx-auto max-w-6xl px-4 py-24 scroll-mt-32">
        <SectionHeading
          eyebrow="Message"
          title="A modern contact form"
          subtitle="Floating labels, focus glow, real-time validation, and a polished success state."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <ContactForm />
          <LiveSupportMock />
        </div>
      </section>

      {/* Global */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Worldwide"
          title="Built for a global mentorship network"
          subtitle="Mentors and students connect across timezones—with high trust and low friction."
        />
        <div className="mt-12">
          <GlobalCommunity />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Quick help"
          title="FAQ"
          subtitle="Fast answers for mentorship, verification, sessions, and safety."
        />
        <FAQ />
      </section>

      {/* Social */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Community"
          title="Follow and join the conversation"
          subtitle="Connect with us across social channels and communities."
        />
        <Socials />
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Updates"
          title="Stay in the loop"
          subtitle="Get new opportunities and platform updates—without spam."
        />
        <div className="mt-12">
          <Newsletter />
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-28">
        <GlassCard className="relative overflow-hidden p-10 sm:p-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.18),transparent_55%)]" />
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur">
                <Sparkles className="h-4 w-4 text-indigo-300" />
                Ready To Start Your Networking Journey?
              </div>
              <h3 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
                Ready To Start Your Networking Journey?
              </h3>
              <p className="mt-4 text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
                Join as a student to grow faster—or become a mentor and help the next generation win.
              </p>
            </div>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link
                to="/register/student"
                className="group inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-sm font-bold text-slate-900 shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,255,255,0.35)] active:scale-[0.98]"
              >
                Join as Student
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/register/mentor"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-lg transition-all hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
              >
                Become a Mentor
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>
    </main>
  );
}

