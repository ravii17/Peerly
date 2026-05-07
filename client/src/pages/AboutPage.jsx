import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Compass,
  Cpu,
  FileText,
  HeartHandshake,
  MessageSquare,
  Network,
  Sparkles,
  Stars,
  Users,
  Video,
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
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: `${Math.round(Math.random() * 100)}%`,
        top: `${Math.round(Math.random() * 100)}%`,
        size: 2 + Math.round(Math.random() * 3),
        delay: Math.random() * 2,
        duration: 6 + Math.random() * 5,
        opacity: 0.25 + Math.random() * 0.35,
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

function FloatingPill({ label, icon: Icon, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      className={cn(
        'inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl',
        className
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10">
        <Icon className="h-5 w-5 text-indigo-200" />
      </span>
      {label}
    </motion.div>
  );
}

function Timeline() {
  const steps = [
    {
      title: 'Access real-world guidance',
      text: 'Mentorship shouldn’t be locked behind cold outreach or paywalls. We make it discoverable, trusted, and scalable.',
      icon: Compass,
    },
    {
      title: 'Build a credible network',
      text: 'Connect through alumni, founders, recruiters, and working professionals—then keep relationships warm with video and chat.',
      icon: Network,
    },
    {
      title: 'Turn mentorship into momentum',
      text: 'From resume reviews to mock interviews, Peerly helps you move faster—with clarity, confidence, and a plan.',
      icon: Stars,
    },
  ];

  return (
    <div className="relative mt-10">
      <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent sm:block" />
      <div className="grid gap-6">
        {steps.map((s, idx) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.05 }}
            className="relative"
          >
            <GlassCard className="p-7 sm:pl-14">
              <div className="absolute left-3 top-7 hidden h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 backdrop-blur sm:flex">
                <s.icon className="h-5 w-5 text-indigo-200" />
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10 sm:hidden">
                  <s.icon className="h-5 w-5 text-indigo-200" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">{s.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">{s.text}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FeatureGrid() {
  const features = [
    { title: 'Video Calling', desc: 'HD WebRTC sessions with instant joins and smooth quality.', icon: Video },
    { title: 'Real-time Chat', desc: 'Fast 1:1 messaging for questions, feedback, and follow-ups.', icon: MessageSquare },
    { title: 'Mentor Matching', desc: 'Find mentors by role, domain, seniority, and goals.', icon: HeartHandshake },
    { title: 'Company Communities', desc: 'Connect around top companies and alumni networks.', icon: Building2 },
    { title: 'Resume Reviews', desc: 'Actionable feedback tailored to modern hiring signals.', icon: FileText },
    { title: 'Internship Guidance', desc: 'Roadmaps, prep plans, and referral-ready polish.', icon: CalendarClock },
    { title: 'AI Mentor Suggestions', desc: 'Smart recommendations based on your profile and intent.', icon: Wand2 },
  ];

  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((f, idx) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.03 }}
        >
          <GlassCard className="group h-full p-7 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/20">
            <div className="flex items-start gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10">
                <f.icon className="h-6 w-6 text-indigo-200" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.45),transparent_60%)]" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{f.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.desc}</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { title: 'Create Profile', desc: 'Show goals, skills, and what you’re optimizing for.', icon: Users },
    { title: 'Connect With Professionals', desc: 'Match with mentors and alumni from top companies.', icon: BadgeCheck },
    { title: 'Learn & Grow', desc: 'Video sessions, chat follow-ups, and consistent progress.', icon: Cpu },
  ];

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-3">
      {steps.map((s, idx) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.05 }}
          className="relative"
        >
          <GlassCard className="h-full p-7">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <s.icon className="h-6 w-6 text-indigo-200" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">0{idx + 1}</div>
            </div>
            <div className="mt-5 text-lg font-semibold">{s.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{s.desc}</p>
          </GlassCard>

          {idx < steps.length - 1 ? (
            <motion.div
              aria-hidden
              className="hidden lg:block absolute -right-3 top-1/2 translate-x-1/2 -translate-y-1/2"
              animate={{ x: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
            >
              <ArrowRight className="h-6 w-6 text-white/40" />
            </motion.div>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}

function Companies() {
  const companies = ['Google', 'Microsoft', 'Morgan Stanley', 'Amazon', 'Deloitte', 'Goldman Sachs'];
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((c, idx) => (
        <motion.div
          key={c}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
        >
          <GlassCard className="group p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10">
                <Building2 className="h-6 w-6 text-white/70" />
              </div>
              <div className="flex-1">
                <div className="text-base font-semibold text-white">{c}</div>
                <div className="mt-1 text-sm text-white/50">Mentors & alumni community</div>
              </div>
              <div className="h-9 w-9 rounded-xl bg-white/5 ring-1 ring-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-white/70" />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function TestimonialsCarousel() {
  const reduced = useReducedMotion();
  const items = [
    {
      name: 'Aarav Mehta',
      role: 'Student • Computer Science',
      text: 'I got a clear roadmap for interviews and a mentor who actually followed up. The video sessions feel premium and focused.',
    },
    {
      name: 'Priya Nair',
      role: 'Mentor • Product @ Top Tech',
      text: 'Peerly makes giving back easy—high-signal matching and smooth video calls. It’s mentorship without the friction.',
    },
    {
      name: 'Daniel Kim',
      role: 'Student • Finance',
      text: 'Resume reviews and mock interviews helped me land internships faster. The chat feature keeps momentum between sessions.',
    },
  ];

  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 5200);
    return () => clearInterval(t);
  }, [items.length, reduced]);

  const current = items[index];

  return (
    <GlassCard className="mt-12 p-7 sm:p-10">
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          <Stars className="h-4 w-4 text-indigo-300" />
          Testimonials
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="mt-8 grid gap-7 lg:grid-cols-[1fr_auto]"
      >
        <div>
          <p className="text-pretty text-lg leading-relaxed text-white/80 sm:text-xl">“{current.text}”</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-white/10 bg-gradient-to-br from-indigo-500/30 to-purple-500/30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{current.name}</div>
              <div className="text-sm text-white/50">{current.role}</div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-col justify-end">
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-2.5 w-10 rounded-full transition',
                  i === index ? 'bg-white/70' : 'bg-white/10 hover:bg-white/20'
                )}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </GlassCard>
  );
}

function useCountUp(target, { duration = 1200 } = {}) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const from = 0;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, reduced, target]);

  return value;
}

function Stat({ label, value, suffix }) {
  const count = useCountUp(value, { duration: 1300 });
  return (
    <GlassCard className="p-7">
      <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-white/50">{label}</div>
    </GlassCard>
  );
}

function Team() {
  const team = [
    { name: 'Alex Rivera', role: 'Founder & CEO' },
    { name: 'Mina Patel', role: 'Head of Product' },
    { name: 'Jordan Lee', role: 'Engineering Lead' },
    { name: 'Sam Chen', role: 'Community' },
  ];

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {team.map((m, idx) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
        >
          <GlassCard className="group p-7">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl ring-1 ring-white/10 bg-gradient-to-br from-white/10 to-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
            </div>
            <div className="mt-5 text-base font-semibold text-white">{m.name}</div>
            <div className="mt-1 text-sm text-white/50">{m.role}</div>
            <div className="mt-6 flex items-center gap-2">
              {['in', 'x', 'gh'].map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-label={`${m.name} social`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="text-xs font-bold uppercase">{s}</span>
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_55%)]" />
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden pt-28">
      <Particles />

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pt-10 pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_35%_20%,rgba(99,102,241,0.20),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.18),transparent_55%)]" />

        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-indigo-300" />
              Mentorship • Networking • Career guidance
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className="mt-6 text-balance text-5xl font-bold tracking-tight sm:text-7xl"
            >
              Bridging Students With{' '}
              <span
                className="bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', animation: 'gradient 8s linear infinite' }}
              >
                Industry Professionals
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
              className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/60"
            >
              Peerly helps students connect with mentors, alumni, founders, developers, finance professionals, and
              recruiters—through high-quality video interactions, real-time chat, and career-ready guidance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                to="/register/student"
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]"
              >
                Find a Mentor
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/register/mentor"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-lg transition-all hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
              >
                Become a Mentor
              </Link>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.12 }}
              className="relative mx-auto max-w-sm"
            >
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-fuchsia-500/10 blur-2xl" />
              <GlassCard className="p-8">
                <div className="text-sm font-semibold text-white/70">What you unlock</div>
                <div className="mt-6 grid gap-3">
                  {[
                    { label: '1:1 Mentorship', icon: HeartHandshake },
                    { label: 'Career Guidance', icon: Compass },
                    { label: 'Mock Interviews', icon: BadgeCheck },
                    { label: 'Video Networking', icon: Video },
                  ].map((i) => (
                    <div
                      key={i.label}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10">
                        <i.icon className="h-5 w-5 text-indigo-200" />
                      </div>
                      <div className="text-sm font-semibold text-white/80">{i.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute -left-4 -top-6 hidden lg:block"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FloatingPill label="Mock Interviews" icon={BadgeCheck} />
            </motion.div>
            <motion.div
              aria-hidden
              className="absolute -right-6 top-14 hidden lg:block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FloatingPill label="Career Guidance" icon={Compass} />
            </motion.div>
            <motion.div
              aria-hidden
              className="absolute left-10 -bottom-8 hidden lg:block"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FloatingPill label="Video Networking" icon={Video} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Mission"
          title="Mentorship access, reimagined."
          subtitle="We’re building the premium network where students meet working professionals—fast, trusted, and deeply human."
          align="left"
        />
        <Timeline />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Platform"
          title="Modern tools for modern mentorship"
          subtitle="Glass-smooth interactions, intelligent matching, and high-quality video sessions—designed like a best-in-class SaaS."
        />
        <FeatureGrid />
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="How it works"
          title="From profile to progress in three steps"
          subtitle="A frictionless flow designed to get you to high-quality mentorship, fast."
        />
        <HowItWorks />
      </section>

      {/* Companies */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Trusted by"
          title="Communities built around great companies"
          subtitle="Join networks of mentors and alumni across top organizations."
        />
        <Companies />
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Stories"
          title="Built for students. Loved by mentors."
          subtitle="Premium experiences create repeat sessions—and real outcomes."
        />
        <TestimonialsCarousel />
      </section>

      {/* Statistics */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Impact"
          title="Momentum you can measure"
          subtitle="Signals that scale trust—without losing the human layer."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Students" value={10000} suffix="+" />
          <Stat label="Mentors" value={2500} suffix="+" />
          <Stat label="Companies" value={50} suffix="+" />
          <Stat label="Sessions completed" value={25000} suffix="+" />
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Team"
          title="A small team with a big mission"
          subtitle="We’re building the premium mentorship network we wish existed earlier."
        />
        <Team />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-28">
        <GlassCard className="relative overflow-hidden p-10 sm:p-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.18),transparent_55%)]" />
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur">
                <Sparkles className="h-4 w-4 text-indigo-300" />
                Premium mentorship network
              </div>
              <h3 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
                Start Building Your Network Today
              </h3>
              <p className="mt-4 text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
                Join as a student to find mentors—or become a mentor to help the next generation rise faster.
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
                Join as Mentor
              </Link>
            </div>
          </div>
        </GlassCard>
      </section>
    </main>
  );
}

