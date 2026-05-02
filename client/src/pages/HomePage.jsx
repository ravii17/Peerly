import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Video, UserCircle, Activity, Star, ChevronRight } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import ScrollReveal from '../components/ScrollReveal';

export default function HomePage() {
  return (
    <main className="min-h-screen pt-32 pb-10 overflow-hidden">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-24 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl shadow-[0_0_15px_rgba(255,255,255,0.05)] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            ✨ Live networking platform
          </div>
          
          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl opacity-20 -z-10" />
            Connect Students & <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'gradient 8s linear infinite' }}>Professionals</span> Seamlessly
          </h1>
          
          <p className="mx-auto max-w-2xl text-pretty text-lg text-white/60 leading-relaxed mb-10">
            A premium network designed for the modern era. Find mentors, get referrals, and collaborate instantly through high-quality chat and video calls.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
            <Link
              to="/register/student"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 hover:shadow-indigo-500/40 active:scale-95 group"
            >
              Get Started
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="#features"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-lg transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
            >
              Explore Features
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. Trust Section */}
      <section className="border-y border-white/5 bg-white/[0.02] py-10 backdrop-blur-sm">
        <ScrollReveal delay={0.2} className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm font-medium text-white/40 mb-8 uppercase tracking-widest">
            Trusted by 5000+ students & professionals at
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100 duration-500">
            {/* Placeholder Company Logos */}
            {['Acme Corp', 'GlobalTech', 'InnovateInc', 'NextGen', 'Quantum'].map((company) => (
              <div key={company} className="flex items-center gap-2 font-bold text-xl text-white cursor-default hover:text-indigo-200 transition-colors">
                <div className="h-6 w-6 rounded bg-gradient-to-br from-white to-white/50" />
                {company}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Feature Cards Section */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-32 relative">
        <div className="absolute inset-0 top-1/2 -z-10 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl opacity-50 rounded-full" />
        
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to connect</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Built from the ground up to provide a seamless, real-time communication experience between mentors and mentees.</p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          <ScrollReveal delay={0.1}>
            <FeatureCard 
              icon={MessageSquare} 
              title="1-to-1 Chat" 
              description="Ultra-fast WebSocket messaging for seamless conversations and knowledge sharing."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <FeatureCard 
              icon={Activity} 
              title="Live Presence" 
              description="Know exactly who is online and ready to collaborate with real-time status indicators."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <FeatureCard 
              icon={Video} 
              title="HD Video Calls" 
              description="Crystal clear WebRTC peer-to-peer video calls right inside your browser without external plugins."
            />
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <FeatureCard 
              icon={UserCircle} 
              title="Rich Profiles" 
              description="Showcase your background, skills, and current company to attract the right connections and build your brand."
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="mx-auto max-w-6xl px-4 py-24 relative">
        <div className="absolute left-0 top-0 -z-10 bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl opacity-30 h-full w-1/2" />
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Loved by our community</h2>
          <p className="text-white/60 max-w-2xl mx-auto">See what students and professionals are saying about their experience on ConnectHub.</p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Sarah Jenkins",
              role: "Software Engineer @ Google",
              text: "ConnectHub made it incredibly easy for me to give back. The HD video calls are crystal clear and the scheduling is seamless."
            },
            {
              name: "David Chen",
              role: "CS Student @ Stanford",
              text: "I found my current mentor through this platform. The real-time chat helps me get quick answers when I'm stuck on algorithms."
            },
            {
              name: "Emily Rodriguez",
              role: "Product Manager @ Stripe",
              text: "The glassmorphism UI is beautiful, but the functionality is what keeps me here. It's the best networking tool I've used."
            }
          ].map((testimonial, i) => (
            <ScrollReveal key={i} delay={0.1 * (i + 1)}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg hover:bg-white/10 transition-colors shadow-lg shadow-black/20">
                <div>
                  <div className="flex gap-1 mb-6 text-indigo-400">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-white/80 leading-relaxed mb-6">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold shadow-inner">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-white/50">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-4 py-32 text-center">
        <ScrollReveal>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-12 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 relative z-10">Ready to accelerate your career?</h2>
            <p className="text-white/60 mb-8 relative z-10 max-w-lg mx-auto">Join thousands of others building meaningful professional relationships.</p>
            <Link
              to="/register/student"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-sm font-bold text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-95 relative z-10"
            >
              Create Free Account
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

