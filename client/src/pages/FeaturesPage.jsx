import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  Cpu,
  FileText,
  GraduationCap,
  HeartHandshake,
  Lock,
  MessageSquare,
  Network,
  ShieldCheck,
  Sparkles,
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
      Array.from({ length: 26 }).map((_, i) => ({
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

function FloatingCard({ icon: Icon, title, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      className={cn(
        'inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl',
        className
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10">
        <Icon className="h-5 w-5 text-indigo-200" />
      </span>
      {title}
    </motion.div>
  );
}

function FeatureGrid() {
  const features = [
    { title: '1:1 Mentorship Sessions', desc: 'High-signal sessions with professionals you can trust.', icon: HeartHandshake },
    { title: 'HD Video Calling', desc: 'Premium WebRTC experience with crisp audio/video.', icon: Video },
    { title: 'Real-time Messaging', desc: 'Fast chat for feedback, follow-ups, and momentum.', icon: MessageSquare },
    { title: 'AI Mentor Recommendations', desc: 'Smart suggestions based on goals and intent.', icon: Wand2 },
    { title: 'Resume Review System', desc: 'Actionable edits aligned to modern hiring signals.', icon: FileText },
    { title: 'Internship & Referral Support', desc: 'Strategy + prep + network—built into the flow.', icon: Network },
    { title: 'Mock Interviews', desc: 'Practice with mentors and sharpen your story.', icon: BadgeCheck },
    { title: 'Skill-based Matching', desc: 'Filter mentors by skills, domain, and seniority.', icon: Cpu },
    { title: 'Community Discussion Rooms', desc: 'Ask, learn, and share across focused communities.', icon: Users },
    { title: 'Company-specific Networking Spaces', desc: 'Alumni + mentors, organized by company.', icon: Building2 },
    { title: 'Session Scheduling Calendar', desc: 'Schedule across timezones with less back-and-forth.', icon: CalendarClock },
    { title: 'Progress Tracking Dashboard', desc: 'Measure growth with goals, notes, and milestones.', icon: Activity },
  ];

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, idx) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.02 }}
        >
          <GlassCard className="group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
            <div className="flex items-start gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10">
                <f.icon className="h-6 w-6 text-indigo-200" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.45),transparent_60%)]" />
              </div>
              <div>
                <div className="text-base font-semibold text-white">{f.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.desc}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--glow-x,50%)_var(--glow-y,40%),rgba(168,85,247,0.25),transparent_45%)]" />
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function AiMatching() {
  const reduced = useReducedMotion();
  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <GlassCard className="p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Wand2 className="h-6 w-6 text-indigo-200" />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">AI-based mentor recommendations</div>
            <div className="mt-1 text-sm text-white/50">Profile → intent → matching signals</div>
          </div>
        </div>
        <ul className="mt-6 grid gap-3 text-sm text-white/60">
          {[
            'Reads your goals, skills, and target roles',
            'Surfaces mentors with relevant experience and availability',
            'Explains why a mentor is a fit—so you can choose confidently',
          ].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-indigo-300" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard className="relative overflow-hidden p-8">
        <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.22),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(168,85,247,0.18),transparent_55%)]" />
        <div className="relative grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Student profile</div>
            <div className="mt-3 text-sm font-semibold text-white/80">Target: SDE Intern</div>
            <div className="mt-2 text-xs text-white/55">Skills: DSA, React, Node</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">AI analysis</div>
            <div className="mt-3 text-sm font-semibold text-white/80">Signal score</div>
            <div className="mt-2 text-xs text-white/55">Role fit, timeline, domain</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Recommendation</div>
            <div className="mt-3 text-sm font-semibold text-white/80">Mentor: Priya</div>
            <div className="mt-2 text-xs text-white/55">SDE @ Top Tech</div>
          </div>
        </div>

        <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { k: 'Match confidence', v: '92%' },
            { k: 'Response likelihood', v: 'High' },
            { k: 'Domain overlap', v: 'Web + DSA' },
            { k: 'Session availability', v: 'This week' },
          ].map((a, idx) => (
            <motion.div
              key={a.k}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: idx * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">{a.k}</div>
              <div className="mt-2 text-base font-semibold text-white/85">{a.v}</div>
            </motion.div>
          ))}
        </div>

        {!reduced ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="absolute left-[14%] top-[35%] h-px w-[72%] bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent" />
            <div className="absolute left-[14%] top-[65%] h-px w-[72%] bg-gradient-to-r from-transparent via-purple-300/35 to-transparent" />
          </motion.div>
        ) : null}
      </GlassCard>
    </div>
  );
}

function VideoExperience() {
  const reduced = useReducedMotion();
  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <GlassCard className="relative overflow-hidden p-8">
        <div className="pointer-events-none absolute inset-0 opacity-75 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(99,102,241,0.18),transparent_55%)]" />
        <div className="relative rounded-3xl border border-white/10 bg-black/30 p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Live session</div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60">
              <Video className="h-4 w-4 text-indigo-300" />
              HD
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.22),transparent_60%)]" />
              {!reduced ? (
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3.1, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-2xl" />
                </motion.div>
              ) : null}
            </div>

            <div className="grid gap-3">
              {[
                { label: 'Screen sharing', icon: Cpu },
                { label: 'Live chat', icon: MessageSquare },
                { label: 'Session notes', icon: FileText },
                { label: 'Recording support', icon: Activity },
              ].map((i) => (
                <div key={i.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                    <i.icon className="h-5 w-5 text-indigo-200" />
                  </div>
                  <div className="text-sm font-semibold text-white/75">{i.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Video className="h-6 w-6 text-indigo-200" />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">Video-first networking</div>
            <div className="mt-1 text-sm text-white/50">Fast joins, crisp audio, and notes built in</div>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-white/60">
          Turn mentorship into momentum with a premium session interface—so you can focus on clarity, confidence, and
          outcomes.
        </p>
        <div className="mt-6 grid gap-3">
          {['Low-latency sessions', 'Built-in notes + follow-ups', 'Frictionless scheduling and reminders'].map((t) => (
            <div key={t} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-indigo-300" />
              <div className="text-sm text-white/70">{t}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function Communities() {
  const cards = [
    { title: 'Companies', desc: 'Find alumni and mentors by organization.', icon: Building2 },
    { title: 'Domains', desc: 'Product, engineering, finance, data, design.', icon: GraduationCap },
    { title: 'Skills', desc: 'DSA, system design, web, analytics, more.', icon: Cpu },
    { title: 'Interests', desc: 'Startups, scholarships, referrals, learning.', icon: Sparkles },
  ];

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c, idx) => (
        <motion.div
          key={c.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.04 }}
        >
          <GlassCard className="group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 ring-1 ring-white/10">
              <c.icon className="h-6 w-6 text-indigo-200" />
            </div>
            <div className="mt-5 text-base font-semibold text-white">{c.title}</div>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{c.desc}</p>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.25),transparent_55%)]" />
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function Security() {
  const items = [
    { title: 'End-to-end encrypted chat', desc: 'Sensitive conversations stay private.', icon: Lock },
    { title: 'Secure authentication', desc: 'Modern auth flows built for safety.', icon: ShieldCheck },
    { title: 'Verified mentors', desc: 'Signals that increase trust and quality.', icon: BadgeCheck },
    { title: 'Privacy controls', desc: 'Control your visibility and outreach.', icon: Users },
    { title: 'Safe reporting system', desc: 'Community-first safety tooling.', icon: CheckCircle2 },
  ];
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((i, idx) => (
        <motion.div
          key={i.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.03 }}
        >
          <GlassCard className="group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
                <i.icon className="h-6 w-6 text-indigo-200" />
              </div>
              <div>
                <div className="text-base font-semibold text-white">{i.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{i.desc}</p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.20),transparent_55%)]" />
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function AnalyticsPreview() {
  const reduced = useReducedMotion();
  const metrics = [
    { label: 'Mentor activity', value: '↑ 24%' },
    { label: 'Session completion', value: '92%' },
    { label: 'Match quality', value: 'High' },
    { label: 'Weekly engagement', value: '↑ 18%' },
  ];

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <GlassCard className="relative overflow-hidden p-8">
        <div className="pointer-events-none absolute inset-0 opacity-65 bg-[radial-gradient(circle_at_20%_25%,rgba(99,102,241,0.20),transparent_55%),radial-gradient(circle_at_80%_45%,rgba(168,85,247,0.18),transparent_55%)]" />
        <div className="relative rounded-3xl border border-white/10 bg-black/25 p-6">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Dashboard</div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60">
              <Activity className="h-4 w-4 text-indigo-300" />
              Live
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">{m.label}</div>
                <div className="mt-2 text-base font-semibold text-white/80">{m.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            {[62, 78, 54, 90, 74, 96, 82].map((h, idx) => (
              <div key={idx} className="h-2.5 w-full rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-400/80 to-purple-400/80"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: idx * 0.05 }}
                />
              </div>
            ))}
          </div>
        </div>

        {!reduced ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl"
            animate={{ y: [0, 18, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : null}
      </GlassCard>

      <GlassCard className="p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Activity className="h-6 w-6 text-indigo-200" />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">Platform analytics</div>
            <div className="mt-1 text-sm text-white/50">Engagement, sessions, growth, and activity</div>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-white/60">
          Track mentor activity, session progress, engagement, and outcomes—so growth becomes measurable and repeatable.
        </p>
        <div className="mt-6 grid gap-3">
          {['Goals & milestones', 'Session notes + follow-ups', 'Mentor engagement insights'].map((t) => (
            <div key={t} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-indigo-300" />
              <div className="text-sm text-white/70">{t}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

function MobileExperience() {
  return (
    <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="relative mx-auto w-full max-w-sm">
        <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-fuchsia-500/10 blur-2xl" />
        <GlassCard className="p-6">
          <div className="mx-auto aspect-[9/16] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/35">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Mobile</div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/60">
                  Peerly
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {[
                  { t: 'Mentors for you', i: HeartHandshake },
                  { t: 'Communities', i: Users },
                  { t: 'Sessions', i: Video },
                  { t: 'Progress', i: Activity },
                ].map((x) => (
                  <div key={x.t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                      <x.i className="h-5 w-5 text-indigo-200" />
                    </div>
                    <div className="text-sm font-semibold text-white/70">{x.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <Cpu className="h-6 w-6 text-indigo-200" />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">Mobile-first experience</div>
            <div className="mt-1 text-sm text-white/50">Responsive, app-like UI across devices</div>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-white/60">
          A premium interface that stays fast and readable on mobile—so sessions, chat, and communities are always within
          reach.
        </p>
        <div className="mt-6 grid gap-3">
          {['Touch-friendly UI components', 'Optimized layouts for mobile and tablet', 'Fast transitions and smooth scroll'].map(
            (t) => (
              <div key={t} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-indigo-300" />
                <div className="text-sm text-white/70">{t}</div>
              </div>
            )
          )}
        </div>
      </GlassCard>
    </div>
  );
}

function TestimonialsMarquee() {
  const reduced = useReducedMotion();
  const items = [
    { name: 'Neha', tag: 'Student • Amazon', text: 'The matching is insanely good. I booked 2 sessions in a week.' },
    { name: 'Rahul', tag: 'Mentor • Microsoft', text: 'Clean UX and smooth video calls. Mentorship feels effortless.' },
    { name: 'Isha', tag: 'Student • Deloitte', text: 'Resume reviews + mock interviews were a game-changer.' },
    { name: 'Arjun', tag: 'Mentor • Google', text: 'High-signal mentees and great scheduling. Love the flow.' },
    { name: 'Meera', tag: 'Student • Morgan Stanley', text: 'Communities make it easy to find the right people.' },
  ];
  const track = [...items, ...items];

  return (
    <GlassCard className="mt-12 overflow-hidden p-6 sm:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Testimonials</div>
      <div className="mt-6 overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={reduced ? {} : { x: ['0%', '-50%'] }}
          transition={reduced ? {} : { duration: 26, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {track.map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              className="w-[18rem] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500/25 to-purple-500/25 ring-1 ring-white/10" />
                <div>
                  <div className="text-sm font-semibold text-white/80">{t.name}</div>
                  <div className="text-xs text-white/50">{t.tag}</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">“{t.text}”</p>
            </div>
          ))}
        </motion.div>
      </div>
    </GlassCard>
  );
}

export default function FeaturesPage() {
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
              Features • AI matching • Video networking
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
              className="mt-6 text-balance text-5xl font-bold tracking-tight sm:text-7xl"
            >
              Everything You Need To Grow Your{' '}
              <span
                className="bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', animation: 'gradient 8s linear infinite' }}
              >
                Career Network
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
              className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/60"
            >
              Connect with mentors, recruiters, and alumni. Communicate in real-time, learn through video sessions, and
              build a career-ready network—faster and with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.18 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                to="/register/student"
                className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-indigo-500/40 active:scale-[0.98]"
              >
                Explore Mentors
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
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
              <div className="text-sm font-semibold text-white/70">Designed for outcomes</div>
              <div className="mt-6 grid gap-3">
                {[
                  { t: 'Mentorship Sessions', i: HeartHandshake },
                  { t: 'Video Networking', i: Video },
                  { t: 'AI Matching', i: Wand2 },
                  { t: 'Communities', i: Users },
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
              <FloatingCard icon={Wand2} title="AI Mentor Recs" />
            </motion.div>
            <motion.div
              aria-hidden
              className="absolute -right-6 top-14 hidden lg:block"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FloatingCard icon={MessageSquare} title="Real-time Chat" />
            </motion.div>
            <motion.div
              aria-hidden
              className="absolute left-10 -bottom-8 hidden lg:block"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4.7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FloatingCard icon={CalendarClock} title="Scheduling" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core features grid */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Core features"
          title="Premium capabilities, end-to-end"
          subtitle="Everything from mentorship sessions and communities to AI matching and dashboards—polished like a best-in-class SaaS."
        />
        <FeatureGrid />
      </section>

      {/* AI matching */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="AI-powered matching"
          title="Mentor recommendations that feel personal"
          subtitle="A modern recommendation engine that surfaces the right mentors—with clarity on why they’re a fit."
        />
        <AiMatching />
      </section>

      {/* Video experience */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Video networking"
          title="A premium session interface"
          subtitle="Screen sharing, live chat, notes, and recording support—designed to keep sessions focused."
        />
        <VideoExperience />
      </section>

      {/* Community */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Community & networking"
          title="Find your people faster"
          subtitle="Join communities by company, domain, skills, and interests—so networking stays high-signal."
        />
        <Communities />
      </section>

      {/* Security */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Security & privacy"
          title="Built with trust at the core"
          subtitle="A mentorship platform only works when users feel safe—privacy controls and verification included."
        />
        <Security />
      </section>

      {/* Analytics */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Analytics dashboard"
          title="Track progress, sessions, and engagement"
          subtitle="A modern dashboard preview with animated graphs and metrics—so outcomes stay measurable."
        />
        <AnalyticsPreview />
      </section>

      {/* Mobile */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Mobile experience"
          title="Fast, responsive, and app-like"
          subtitle="A mobile-first UI that stays smooth across desktop, tablet, and phone."
        />
        <MobileExperience />
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionHeading
          eyebrow="Testimonials"
          title="The premium experience users return for"
          subtitle="Auto-scrolling feedback cards with glass UI and company tags."
        />
        <TestimonialsMarquee />
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-8 pb-28">
        <GlassCard className="relative overflow-hidden p-10 sm:p-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.18),transparent_55%)]" />
          <div className="flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur">
                <Sparkles className="h-4 w-4 text-indigo-300" />
                Your Network Defines Your Opportunities
              </div>
              <h3 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-5xl">
                Your Network Defines Your Opportunities
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

