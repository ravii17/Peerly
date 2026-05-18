import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Sparkles, Zap, Users, Brain, Activity, Clock, Video, TrendingUp, MessageSquare, Award, ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function HomePage({ isLoggedIn }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <main className="min-h-screen pt-16 pb-10 overflow-hidden bg-[#050505] selection:bg-[#9D00FF]/30">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-6 pt-20 pb-32 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9D00FF]/20 blur-[150px] rounded-full mix-blend-screen animate-pulse-glow" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#00E5FF]/20 blur-[120px] rounded-full mix-blend-screen animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Particle Overlay (Simple visual representation) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel mb-10 shadow-[0_0_20px_rgba(157,0,255,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-white">
              The Future of Professional Connection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-10"
          >
            CONNECT. <br />
            <span className="text-gradient drop-shadow-[0_0_40px_rgba(157,0,255,0.4)]">COLLABORATE.</span> <br />
            CONQUER.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-14"
          >
            A high-energy, premium ecosystem where the ambitious unite. Supercharge your trajectory with elite mentorship and AI-driven insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="group relative inline-flex items-center justify-center rounded-2xl bg-white px-12 py-5 text-lg font-black text-black transition-all hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#9D00FF] to-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors">Enter Dashboard</span>
                <ChevronRight className="relative z-10 w-5 h-5 ml-2 group-hover:text-white transition-colors" />
              </Link>
            ) : (
              <Link
                to="/register/student"
                className="group relative inline-flex items-center justify-center rounded-2xl bg-white px-12 py-5 text-lg font-black text-black transition-all hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#9D00FF] to-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors">Get Started</span>
                <ChevronRight className="relative z-10 w-5 h-5 ml-2 group-hover:text-white transition-colors" />
              </Link>
            )}
            <a
              href="#dashboard"
              className="inline-flex items-center justify-center rounded-2xl glass-panel px-12 py-5 text-lg font-black text-white transition-all hover:bg-white/10 active:scale-95"
            >
              Explore Platform
            </a>
          </motion.div>
        </div>

        {/* Cinematic Depth Elements */}
        <motion.div style={{ y }} className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] to-transparent z-10" />
      </section>

      {/* 2. Mentor Dashboard Preview Section */}
      <section id="dashboard" className="py-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">Command <span className="text-gradient">Center</span></h2>
                <p className="text-zinc-400 text-xl font-medium">Real-time telemetry on your mentorship impact.</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Main Stats Card */}
            <ScrollReveal delay={0.1} className="lg:col-span-2 glass-card rounded-3xl p-8 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#9D00FF]/10 blur-[80px] rounded-full group-hover:bg-[#9D00FF]/20 transition-all duration-700" />
              <div className="relative z-10 flex justify-between items-start mb-12">
                <div>
                  <p className="text-zinc-400 font-bold uppercase tracking-wider text-sm mb-2">Total Community Reach</p>
                  <h3 className="text-6xl font-black text-white tracking-tighter">14,208</h3>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#00E5FF]">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5">
                  <TrendingUp className="w-5 h-5 text-[#9D00FF] mb-2" />
                  <p className="text-2xl font-bold text-white">+24%</p>
                  <p className="text-xs text-zinc-500 font-medium">Growth</p>
                </div>
                <div className="flex-1 bg-white/5 rounded-2xl p-4 border border-white/5">
                  <Users className="w-5 h-5 text-[#00E5FF] mb-2" />
                  <p className="text-2xl font-bold text-white">142</p>
                  <p className="text-xs text-zinc-500 font-medium">Active Mentees</p>
                </div>
              </div>
            </ScrollReveal>

            {/* AI Insights Card */}
            <ScrollReveal delay={0.2} className="glass-card rounded-3xl p-8 group relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#00E5FF]/10 blur-[50px] rounded-full group-hover:bg-[#00E5FF]/20 transition-all duration-700" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-6 h-6 text-[#9D00FF]" />
                  <h3 className="text-xl font-bold text-white">AI Insights</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#9D00FF]/10 to-transparent border-l-2 border-[#9D00FF]">
                    <p className="text-sm text-zinc-300 font-medium">3 mentees are showing strong interest in System Design.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5">
                    <p className="text-sm text-zinc-400 font-medium">Your response rate is top 5% this week.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Sessions UI Section */}
      <section className="py-32 relative z-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
                Next-Gen <br /><span className="text-gradient">Sessions</span>
              </h2>
              <p className="text-zinc-400 text-xl font-medium mb-10 leading-relaxed">
                Seamless video, real-time collaboration, and AI-prepared agendas. Every session is engineered for maximum knowledge transfer.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#9D00FF]/20 flex items-center justify-center shrink-0 border border-[#9D00FF]/30">
                    <Video className="w-5 h-5 text-[#9D00FF]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">HD Video & Screen Share</h4>
                    <p className="text-zinc-500 text-sm">Low-latency communication powered by WebRTC.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/20 flex items-center justify-center shrink-0 border border-[#00E5FF]/30">
                    <Zap className="w-5 h-5 text-[#00E5FF]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">AI Prep Suggestions</h4>
                    <p className="text-zinc-500 text-sm">Automatically generated talking points based on mentee goals.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="relative">
              {/* Session Card UI */}
              <div className="glass-card rounded-[32px] p-6 group">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-zinc-800 border-2 border-[#9D00FF] overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#9D00FF]/40 to-transparent" />
                      <UserAvatar />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">Alex Chen</h4>
                      <p className="text-sm text-[#00E5FF] font-medium">Frontend Architecture</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">Today</p>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 justify-end mt-1"><Clock className="w-3 h-3" /> 14:00 PST</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">AI Suggested Agenda</p>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-sm text-zinc-300">
                    <div className="w-2 h-2 rounded-full bg-[#9D00FF]" /> Review React Performance Patterns
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 text-sm text-zinc-300">
                    <div className="w-2 h-2 rounded-full bg-[#00E5FF]" /> Setup CI/CD for Vite Project
                  </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#9D00FF] to-[#00E5FF] text-white font-black text-lg shadow-[0_0_20px_rgba(157,0,255,0.4)] hover:shadow-[0_0_30px_rgba(157,0,255,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                  <Video className="w-5 h-5" /> Join Session Now
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Community Section */}
      <section className="py-32 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <ScrollReveal>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
                The <span className="text-gradient">Community</span>
              </h2>
              <p className="text-zinc-400 text-xl font-medium">
                A high-frequency hub of knowledge exchange, startup pitches, and trending discussions.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Trending */}
            <ScrollReveal delay={0.1} className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-[#9D00FF]" />
                <h3 className="font-bold text-white text-lg">Trending Now</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: "The future of AI in SaaS", replies: 142 },
                  { title: "Negotiating your first senior role", replies: 89 },
                  { title: "Building accessible design systems", replies: 56 }
                ].map((item, i) => (
                  <div key={i} className="group cursor-pointer">
                    <h4 className="text-sm font-bold text-zinc-300 group-hover:text-[#00E5FF] transition-colors">{item.title}</h4>
                    <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {item.replies} replies</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Achievements */}
            <ScrollReveal delay={0.2} className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="font-bold text-white text-lg">Recent Wins</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-300"><span className="font-bold text-white">Sarah J.</span> just landed a role at Stripe! 🚀</p>
                    <p className="text-xs text-zinc-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-300"><span className="font-bold text-white">David K.</span> shipped his first MVP.</p>
                    <p className="text-xs text-zinc-500 mt-1">5 hours ago</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* AI Connections */}
            <ScrollReveal delay={0.3} className="glass-card rounded-3xl p-6 border-[#9D00FF]/30 shadow-[0_0_20px_rgba(157,0,255,0.1)]">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-[#9D00FF]" />
                <h3 className="font-bold text-white text-lg">Recommended</h3>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-800 mx-auto mb-3 border-2 border-[#00E5FF]" />
                <h4 className="font-bold text-white">Elena Rostova</h4>
                <p className="text-xs text-[#00E5FF] mb-4">Staff Engineer @ Vercel</p>
                <button className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors">
                  Connect
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      {!isLoggedIn && (
        <section className="mx-auto max-w-7xl px-6 py-40 text-center relative z-10">
          <ScrollReveal>
            <div className="glass-card rounded-[60px] p-24 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#9D00FF]/20 via-[#00E5FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#9D00FF]/20 to-transparent blur-[100px] -z-10" />
              
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 relative z-10 text-white leading-[0.85]">
                ENTER THE <br /> <span className="text-gradient drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">NETWORK.</span>
              </h2>
              <p className="text-zinc-400 text-2xl mb-14 relative z-10 max-w-2xl mx-auto font-medium leading-relaxed">
                Join the elite tier of professionals building the future.
              </p>
              <Link
                to="/register/student"
                className="group inline-flex items-center justify-center rounded-2xl bg-white px-16 py-7 text-xl font-black text-black shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] active:scale-95 relative z-10 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#9D00FF] to-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 group-hover:text-white transition-colors">Create Free Account</span>
                <ArrowRight className="relative z-10 w-6 h-6 ml-3 group-hover:text-white transition-colors group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </section>
      )}
    </main>
  );
}

// Simple fallback avatar component
function UserAvatar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-zinc-500 p-2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}
