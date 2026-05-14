import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Compass, Shield, Zap } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

export default function HomePage({ isLoggedIn }) {
  return (
    <main className="min-h-screen pt-16 pb-10 overflow-hidden bg-[#030303] selection:bg-[#007AFF]/30">
      
      {/* 1. New Premium Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-6 pt-20 pb-32 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#007AFF]/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10"
          >
            <Sparkles className="w-4 h-4 text-[#007AFF]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
              The Future of Professional Connection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-10"
          >
            CONNECT. <br />
            <span className="text-gradient">COLLABORATE.</span> <br />
            CONQUER.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-zinc-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-14"
          >
            A high-performance ecosystem where mentors and students build meaningful professional relationships that last a lifetime.
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
                className="inline-flex items-center justify-center rounded-2xl bg-[#007AFF] px-12 py-5 text-lg font-black text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                Go to Dashboard
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            ) : (
              <Link
                to="/register/student"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-12 py-5 text-lg font-black text-black shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                Get Started
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            )}
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-12 py-5 text-lg font-black text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Scroll to Explore</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-zinc-800 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Trust Section */}
      <section className="py-32 relative z-10">
        <ScrollReveal className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-[10px] font-black text-zinc-500 mb-16 uppercase tracking-[0.4em]">
            Trusted by the next generation of leaders at
          </p>
          <div className="flex flex-wrap justify-center gap-16 md:gap-28 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100 duration-1000">
            {['Linear', 'Stripe', 'Notion', 'Framer', 'Vercel'].map((company) => (
              <div key={company} className="flex items-center gap-4 font-black text-2xl text-white cursor-default group">
                <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#007AFF]/20 group-hover:border-[#007AFF]/30 transition-all duration-500" />
                {company}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Feature Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal>
            <h2 className="text-6xl md:text-7xl font-black tracking-tighter mb-10 text-white leading-tight">
              Everything you <br /> <span className="text-gradient">need to excel.</span>
            </h2>
            <p className="text-zinc-500 text-xl max-w-xl font-medium leading-relaxed mb-12">
              Our platform provides the tools and connections necessary for rapid career growth and skill development.
            </p>
            <div className="space-y-6">
              {[
                { icon: Zap, title: "Real-time Collaboration", desc: "Instant feedback from industry leaders." },
                { icon: Shield, title: "Verified Mentors", desc: "Every mentor is vetted for expertise and experience." },
                { icon: Compass, title: "Personalized Roadmaps", desc: "Custom learning paths tailored to your goals." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="p-3 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/20 h-fit">
                    <item.icon className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} className="relative">
            <div className="glass-card rounded-[40px] p-10 aspect-square flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#007AFF]/20 to-transparent" />
               {/* Visual Element Placeholder */}
               <div className="w-full h-full rounded-3xl bg-zinc-900/50 border border-white/10 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#007AFF] blur-[80px] opacity-20" />
                  <div className="p-8 space-y-6">
                    <div className="h-4 w-1/3 bg-white/10 rounded-full" />
                    <div className="h-24 w-full bg-white/5 rounded-2xl" />
                    <div className="flex gap-4">
                      <div className="h-20 flex-1 bg-white/5 rounded-2xl" />
                      <div className="h-20 flex-1 bg-white/5 rounded-2xl" />
                    </div>
                  </div>
               </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Final CTA */}
      {!isLoggedIn && (
        <section className="mx-auto max-w-7xl px-6 py-40 text-center relative z-10">
          <ScrollReveal>
            <div className="glass-card rounded-[60px] p-24 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#007AFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-12 relative z-10 text-white leading-[0.85]">
                READY TO <br /> <span className="text-gradient">ACCELERATE?</span>
              </h2>
              <p className="text-zinc-500 text-2xl mb-16 relative z-10 max-w-2xl mx-auto font-medium leading-relaxed">
                Join thousands of others building meaningful professional relationships today.
              </p>
              <Link
                to="/register/student"
                className="inline-flex items-center justify-center rounded-2xl bg-[#007AFF] px-16 py-7 text-xl font-black text-white shadow-[0_20px_50px_rgba(0,122,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_25px_60px_rgba(0,122,255,0.4)] active:scale-95 relative z-10"
              >
                Create Free Account
              </Link>
            </div>
          </ScrollReveal>
        </section>
      )}
    </main>
  );
}

