import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Star, CheckCircle, MapPin, Calendar, Clock, Video, MessageSquare, 
  Award, TrendingUp, Zap, Sparkles, Brain, Code, Terminal, Database, 
  Users, ChevronRight, Activity, Send, Globe, Share2, Heart, ShieldCheck, 
  Check, Layout, Cpu
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function MentorProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[#050505] selection:bg-[#9D00FF]/30 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#9D00FF]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00E5FF]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HERO SECTION */}
        <section className="mb-16 relative">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            
            {/* Profile Avatar & Glow */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#9D00FF] to-[#00E5FF] rounded-3xl blur-xl opacity-40 animate-pulse-glow" />
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-3xl p-1 bg-gradient-to-tr from-[#9D00FF] via-[#00E5FF] to-[#9D00FF] relative z-10 bg-[length:200%_200%] animate-[gradient-flow_4s_linear_infinite]">
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-zinc-900 relative">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Elena Rostova" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-green-500 border-2 border-zinc-900 shadow-[0_0_10px_rgba(34,197,94,0.6)]" title="Online Now" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="glass-panel px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_15px_rgba(157,0,255,0.3)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-white">Top Mentor • Verified</span>
                </div>
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1 pt-2">
              <ScrollReveal>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                    Elena Rostova
                  </h1>
                  <div className="flex gap-3">
                    <button className="w-12 h-12 rounded-xl glass-panel flex items-center justify-center hover:bg-white/5 hover:text-[#9D00FF] transition-all group">
                      <Share2 className="w-5 h-5 text-zinc-400 group-hover:text-[#9D00FF]" />
                    </button>
                    <button 
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`w-12 h-12 rounded-xl glass-panel flex items-center justify-center transition-all group ${isFollowing ? 'bg-[#9D00FF]/20 border-[#9D00FF]/50 shadow-[0_0_15px_rgba(157,0,255,0.2)]' : 'hover:bg-white/5'}`}
                    >
                      <Heart className={`w-5 h-5 ${isFollowing ? 'text-[#9D00FF] fill-[#9D00FF]' : 'text-zinc-400 group-hover:text-rose-400'}`} />
                    </button>
                  </div>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#9D00FF] to-[#00E5FF] mb-4">
                  AI Engineer • Startup Mentor • Product Strategist
                </h2>

                <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-6">
                  Ex-OpenAI researcher and 2x Founder. I help ambitious engineers break into AI, scale their startups, and architect high-performance distributed systems. Let's build the future.
                </p>

                <div className="flex flex-wrap gap-4 text-sm font-medium text-zinc-300 mb-8">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#9D00FF]" /> San Francisco, CA</div>
                  <div className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-[#00E5FF]" /> 8+ Years Experience</div>
                  <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#9D00FF]" /> 340+ Sessions Completed</div>
                  <div className="flex items-center gap-1.5 text-yellow-500"><Star className="w-4 h-4 fill-yellow-500" /> 4.98 (124 Reviews)</div>
                </div>

                {/* Main CTAs */}
                <div className="flex flex-wrap gap-4">
                  <button className="relative group overflow-hidden rounded-xl px-8 py-4 font-black text-white shadow-[0_0_20px_rgba(157,0,255,0.4)] transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_35px_rgba(157,0,255,0.6)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#9D00FF] to-[#00E5FF] transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative z-10 flex items-center gap-2">
                      <Calendar className="w-5 h-5" /> Book Session
                    </span>
                  </button>
                  <button className="glass-panel hover:bg-white/5 rounded-xl px-8 py-4 font-bold text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group border-white/10 hover:border-white/20">
                    <MessageSquare className="w-5 h-5 text-[#00E5FF] group-hover:text-white transition-colors" /> Message
                  </button>
                  <button className="glass-panel hover:bg-white/5 rounded-xl px-8 py-4 font-bold text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group border-white/10 hover:border-white/20">
                    <Globe className="w-5 h-5 text-[#9D00FF] group-hover:text-white transition-colors" /> Join Community
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN - CONTENT */}
          <div className="lg:w-2/3 space-y-12">
            
            {/* Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Mentees', value: '450+', icon: Users, color: '#9D00FF' },
                { label: 'Success Rate', value: '96%', icon: TrendingUp, color: '#00E5FF' },
                { label: 'Comm. Reach', value: '14.2K', icon: Globe, color: '#9D00FF' },
                { label: 'Avg Rating', value: '4.98', icon: Star, color: '#00E5FF' }
              ].map((stat, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="glass-card rounded-2xl p-5 hover:border-[var(--hover-color)] transition-all duration-300 hover:-translate-y-1 group" style={{ '--hover-color': `${stat.color}80` }}>
                    <stat.icon className="w-6 h-6 mb-3 transition-transform group-hover:scale-110" style={{ color: stat.color }} />
                    <h4 className="text-3xl font-black text-white mb-1">{stat.value}</h4>
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </section>

            {/* Expertise */}
            <section>
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-6">
                  <Brain className="w-6 h-6 text-[#9D00FF]" />
                  <h3 className="text-2xl font-black text-white">Mentor Expertise</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { text: 'Artificial Intelligence', icon: Brain },
                    { text: 'System Design', icon: Database },
                    { text: 'Startup Building', icon: Zap },
                    { text: 'Web Development', icon: Code },
                    { text: 'UI/UX Architecture', icon: Layout },
                    { text: 'Career Guidance', icon: TrendingUp }
                  ].map((skill, i) => (
                    <div key={i} className="glass-panel px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-bold text-zinc-200 border-white/10 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 transition-all hover:-translate-y-1 cursor-default group">
                      <skill.icon className="w-4 h-4 text-[#9D00FF] group-hover:text-[#00E5FF] transition-colors" />
                      {skill.text}
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* About Mentor */}
            <section>
              <ScrollReveal>
                <div className="glass-card rounded-[32px] p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#9D00FF]/5 blur-[80px] rounded-full" />
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-[#00E5FF]" /> The Journey
                  </h3>
                  <div className="space-y-4 text-zinc-300 font-medium leading-relaxed relative z-10">
                    <p>
                      I started my journey hacking on neural networks in a dorm room before joining OpenAI as one of the early researchers. After contributing to foundational LLM models, I stepped out to found my own AI infrastructure startup, scaling it to a successful exit.
                    </p>
                    <p>
                      My mentorship philosophy is built on <strong className="text-white">radical candor</strong> and <strong className="text-white">execution velocity</strong>. I don't just review your code—I help you understand the architecture decisions that scale, the mindset required to navigate tech leadership, and how to position yourself in the AI-first era.
                    </p>
                    <p>
                      Whether you're looking to break into FAANG, architect your next SaaS, or seeking a co-founder sounding board, I bring 8+ years of battle-tested engineering and product strategy to our sessions.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* Sessions */}
            <section>
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-6">
                  <Video className="w-6 h-6 text-[#9D00FF]" />
                  <h3 className="text-2xl font-black text-white">Available Sessions</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "System Design Mock Interview", dur: "60 min", price: "$150", level: "Advanced", ai: "High Match", desc: "Deep dive into distributed systems, load balancing, and database sharding. Includes a realistic mock interview." },
                    { title: "Startup Tech Stack Strategy", dur: "45 min", price: "$120", level: "All Levels", ai: "Recommended", desc: "Architectural review for your MVP. We'll pick the right tools for speed and scale." },
                    { title: "Career Trajectory Review", dur: "30 min", price: "$80", level: "Intermediate", ai: null, desc: "Resume review, portfolio tear-down, and a roadmap to hit your next compensation tier." }
                  ].map((session, i) => (
                    <div key={i} className="glass-card rounded-[24px] p-6 hover:shadow-[0_0_25px_rgba(157,0,255,0.15)] transition-all group">
                      <div className="flex flex-col md:flex-row gap-6 justify-between md:items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">{session.title}</h4>
                            {session.ai && (
                              <span className="px-2.5 py-1 rounded-md bg-[#9D00FF]/20 border border-[#9D00FF]/40 text-[10px] font-black uppercase text-[#9D00FF] flex items-center gap-1">
                                <Brain className="w-3 h-3" /> {session.ai}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-400 font-medium mb-4">{session.desc}</p>
                          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-zinc-500">
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-[#9D00FF]" /> {session.dur}</span>
                            <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-[#00E5FF]" /> {session.level}</span>
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col items-center justify-between gap-4 md:gap-2 border-t border-white/5 md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0 shrink-0">
                          <div className="text-2xl font-black text-white">{session.price}</div>
                          <button className="px-6 py-2 rounded-xl bg-white/10 hover:bg-[#9D00FF] text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-lg">
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* Reviews & Testimonials */}
            <section>
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-[#9D00FF]" />
                  <h3 className="text-2xl font-black text-white">Student Reviews</h3>
                </div>
                {/* Horizontal Scroll Container */}
                <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {[
                    { name: "Michael T.", role: "Junior Dev", session: "System Design Mock", review: "Elena completely changed how I think about scale. Her feedback was sharp, direct, and actionable. I crushed my Stripe onsite thanks to her.", stars: 5 },
                    { name: "Sarah K.", role: "Founder", session: "Startup Tech Stack", review: "Worth every penny. We were about to make a huge mistake with our database choice. Elena saved us months of refactoring.", stars: 5 },
                    { name: "David L.", role: "Frontend Eng", session: "Career Trajectory", review: "Incredibly insightful. She mapped out exactly what I need to do to hit Senior level this year. Highly recommend!", stars: 5 }
                  ].map((review, i) => (
                    <div key={i} className="min-w-[320px] max-w-[320px] snap-center glass-card rounded-[24px] p-6 hover:-translate-y-2 transition-transform duration-300 relative group overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9D00FF] to-[#00E5FF] opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-zinc-300 text-sm font-medium mb-6 line-clamp-4">"{review.review}"</p>
                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 shrink-0" />
                        <div>
                          <h5 className="text-sm font-bold text-white">{review.name}</h5>
                          <p className="text-xs text-[#00E5FF]">{review.session}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

            {/* Community & Content */}
            <section>
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-6 h-6 text-[#00E5FF]" />
                  <h3 className="text-2xl font-black text-white">Community & Content</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="glass-panel p-5 rounded-[20px] group cursor-pointer hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#9D00FF]/20 flex items-center justify-center border border-[#9D00FF]/30 group-hover:scale-110 transition-transform">
                        <Terminal className="w-5 h-5 text-[#9D00FF]" />
                      </div>
                      <h4 className="font-bold text-white">Resources & Code</h4>
                    </div>
                    <p className="text-xs text-zinc-400 font-medium">12 System Design Templates, 4 Architecture Guides.</p>
                  </div>
                  
                  <div className="glass-panel p-5 rounded-[20px] group cursor-pointer hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/20 flex items-center justify-center border border-[#00E5FF]/30 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-5 h-5 text-[#00E5FF]" />
                      </div>
                      <h4 className="font-bold text-white">Startup Threads</h4>
                    </div>
                    <p className="text-xs text-zinc-400 font-medium">Active discussions on scaling SaaS & fundraising.</p>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* Timeline */}
            <section>
              <ScrollReveal>
                <div className="flex items-center gap-2 mb-8">
                  <Activity className="w-6 h-6 text-[#00E5FF]" />
                  <h3 className="text-2xl font-black text-white">Activity Timeline</h3>
                </div>
                <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#9D00FF] before:via-[#00E5FF]/50 before:to-transparent">
                  {[
                    { icon: Video, color: '#9D00FF', title: 'Completed a System Design Session', time: '2 hours ago', desc: 'Helped a mentee optimize their Redis caching strategy.' },
                    { icon: MessageSquare, color: '#00E5FF', title: 'Published a Community Thread', time: '1 day ago', desc: '"Why most startups choose the wrong database in 2026."' },
                    { icon: Award, color: '#9D00FF', title: 'Reached 300 Sessions Milestone', time: '1 week ago', desc: 'Recognized as a Top 1% Mentor on the platform.' },
                    { icon: Cpu, color: '#00E5FF', title: 'Launched AI Engineering Masterclass', time: '2 weeks ago', desc: 'A 4-part series on building robust RAG pipelines.' }
                  ].map((event, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      {/* Node */}
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#050505] absolute left-[-24px] md:left-1/2 md:-translate-x-1/2 shadow-[0_0_10px_rgba(157,0,255,0.5)] transition-all duration-300 group-hover:scale-125" style={{ backgroundColor: event.color }}>
                      </div>
                      
                      {/* Content Card */}
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] p-4 rounded-2xl glass-card group-hover:border-[#00E5FF]/40 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <event.icon className="w-4 h-4" style={{ color: event.color }} />
                          <h4 className="font-bold text-white text-sm">{event.title}</h4>
                        </div>
                        <p className="text-xs text-zinc-500 mb-2">{event.time}</p>
                        <p className="text-sm text-zinc-400 font-medium">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </section>

          </div>

          {/* RIGHT COLUMN - STICKY PANEL */}
          <div className="lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              
              <ScrollReveal delay={0.2}>
                <div className="glass-card rounded-[32px] p-6 relative overflow-hidden border-[#9D00FF]/20 shadow-[0_0_30px_rgba(157,0,255,0.1)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/10 blur-[40px] rounded-full" />
                  
                  {/* AI Compatibility */}
                  <div className="bg-gradient-to-r from-[#9D00FF]/10 to-transparent p-4 rounded-2xl border-l-2 border-[#9D00FF] mb-6 flex items-start gap-3">
                    <Brain className="w-5 h-5 text-[#9D00FF] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-black text-white mb-1">98% AI Match Score</h4>
                      <p className="text-xs text-zinc-400 font-medium">Elena's expertise in React and AI aligns perfectly with your current learning goals.</p>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white mb-4">Availability</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="glass-panel p-3 rounded-xl text-center">
                      <p className="text-xs text-zinc-500 font-bold uppercase mb-1">Response Time</p>
                      <p className="text-lg font-black text-[#00E5FF]">&lt; 1 hr</p>
                    </div>
                    <div className="glass-panel p-3 rounded-xl text-center">
                      <p className="text-xs text-zinc-500 font-bold uppercase mb-1">Next Slot</p>
                      <p className="text-lg font-black text-white">Tomorrow</p>
                    </div>
                  </div>

                  {/* Mini Calendar UI */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-white">May 2026</span>
                      <div className="flex gap-1">
                        <button className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10"><ChevronRight className="w-3 h-3 rotate-180" /></button>
                        <button className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10"><ChevronRight className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-center">
                      {[18, 19, 20, 21, 22].map((day, i) => (
                        <div key={i} className="space-y-1">
                          <p className="text-[10px] text-zinc-500 font-bold">{'MTWTF'[i]}</p>
                          <button className={`w-full aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                            i === 1 ? 'bg-gradient-to-tr from-[#9D00FF] to-[#00E5FF] text-white shadow-[0_0_10px_rgba(157,0,255,0.4)]' : 
                            i === 3 ? 'bg-white/10 text-white hover:bg-white/20' : 
                            'text-zinc-600 cursor-not-allowed'
                          }`}>
                            {day}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#9D00FF] to-[#00E5FF] text-white font-black text-sm shadow-[0_0_20px_rgba(157,0,255,0.4)] hover:shadow-[0_0_30px_rgba(157,0,255,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98] mb-3">
                    Check Full Schedule
                  </button>
                  <p className="text-center text-xs text-zinc-500 font-medium flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> 100% Satisfaction Guarantee
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="glass-card rounded-[32px] p-6">
                  <h3 className="text-lg font-black text-white mb-4">Quick Connect</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <Terminal className="w-5 h-5 text-zinc-400 group-hover:text-[#00E5FF] transition-colors" />
                        <span className="text-sm font-bold text-white">Code Review</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                      <div className="flex items-center gap-3">
                        <Send className="w-5 h-5 text-zinc-400 group-hover:text-[#9D00FF] transition-colors" />
                        <span className="text-sm font-bold text-white">Startup Pitch Pitch</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
