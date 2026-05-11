import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Video, UserCircle, Activity, Star, ChevronRight, Sparkles } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import ScrollReveal from '../components/ScrollReveal';

export default function HomePage() {
  return (
    <main className="min-h-screen pt-16 pb-10 overflow-hidden bg-black selection:bg-[#0071E3]/30">
      {/* Background Floating Elements (Decorative only, no physics) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] opacity-20 animate-float-slow">
          <MessageSquare className="w-12 h-12 text-[#0071E3] blur-[1px]" />
        </div>
        <div className="absolute top-[60%] right-[15%] opacity-10 animate-float">
          <Video className="w-20 h-20 text-[#BF40BF] blur-[2px]" />
        </div>
        <div className="absolute bottom-[20%] left-[20%] opacity-15 animate-float-delayed">
          <Activity className="w-16 h-16 text-[#5AC8FA] blur-[1px]" />
        </div>
      </div>

      {/* 1. New Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 pt-20 pb-32 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0071E3]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#BF40BF]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#0071E3]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
              The Future of Professional Connection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] mb-8"
          >
            CONNECT. <br />
            <span className="text-gradient">COLLABORATE.</span> <br />
            CONQUER.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#86868B] text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed mb-12"
          >
            A high-performance ecosystem where mentors and students build meaningful professional relationships that last a lifetime.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Link
              to="/register/student"
              className="inline-flex items-center justify-center rounded-full bg-white px-12 py-5 text-lg font-black text-black shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              Get Started
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-12 py-5 text-lg font-black text-white backdrop-blur-xl transition-all hover:bg-white/10 active:scale-95"
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* 2. Trust Section */}
      <section className="bg-black py-24 relative z-10 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-black" />
        <ScrollReveal delay={0.2} className="relative mx-auto max-w-6xl px-4 text-center">
          <p className="text-[10px] font-black text-[#86868B] mb-12 uppercase tracking-[0.4em]">
            Trusted by the next generation of leaders at
          </p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100 duration-1000">
            {['Acme Corp', 'GlobalTech', 'InnovateInc', 'NextGen', 'Quantum'].map((company) => (
              <div key={company} className="flex items-center gap-4 font-black text-2xl text-white cursor-default group">
                <div className="h-8 w-8 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#0071E3]/20 group-hover:border-[#0071E3]/30 transition-all duration-500" />
                {company}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Feature Cards Section */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-32 relative z-10 scroll-mt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,113,227,0.05),transparent_70%)]" />
        
        <ScrollReveal className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-white">Everything you <br /> need to connect</h2>
          <p className="text-[#86868B] text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Built from the ground up to provide a seamless, real-time communication experience between mentors and mentees.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
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
      <section id="about" className="mx-auto max-w-6xl px-4 py-32 relative z-10 scroll-mt-32">
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-[#BF40BF]/5 blur-[120px] rounded-full" />
        
        <ScrollReveal className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-white">Loved by our <br /> community</h2>
          <p className="text-[#86868B] text-xl max-w-2xl mx-auto font-medium leading-relaxed">See what students and professionals are saying about their experience on Peerly.</p>
        </ScrollReveal>

        <div className="grid gap-10 md:grid-cols-3">
          {[
            {
              name: "Sarah Jenkins",
              role: "Software Engineer @ Google",
              text: "Peerly made it incredibly easy for me to give back. The HD video calls are crystal clear and the scheduling is seamless."
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
              <div className="flex h-full flex-col justify-between rounded-[40px] border border-white/5 bg-white/[0.02] p-10 backdrop-blur-3xl hover:bg-white/[0.05] hover:border-white/10 transition-all duration-700 shadow-2xl group">
                <div>
                  <div className="flex gap-1 mb-10 text-[#0071E3]">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-4 w-4 fill-current shadow-[0_0_10px_rgba(0,113,227,0.5)]" />)}
                  </div>
                  <p className="text-white/80 text-xl leading-relaxed mb-10 font-medium italic">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#0071E3] to-[#BF40BF] flex items-center justify-center font-black shadow-lg text-white text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-black text-white text-lg">{testimonial.name}</div>
                    <div className="text-sm font-bold text-[#86868B] uppercase tracking-wider">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="mx-auto max-w-5xl px-4 py-32 text-center scroll-mt-32 relative z-10">
        <ScrollReveal>
          <div className="rounded-[60px] border border-white/10 bg-white/[0.02] p-20 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#0071E3]/10 blur-[120px] rounded-full group-hover:bg-[#0071E3]/20 transition-all duration-1000" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#BF40BF]/10 blur-[120px] rounded-full group-hover:bg-[#BF40BF]/20 transition-all duration-1000" />
            
            <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-8 text-white">Get in touch</h2>
            <p className="text-[#86868B] text-2xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
              Have a question, partnership idea, or feedback? <br />
              <span className="text-white/60">Reach out and we’ll get back to you.</span>
            </p>
            <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
              <a
                href="mailto:hello@peerly.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-12 py-6 text-lg font-black text-black shadow-2xl transition-all hover:scale-110 active:scale-95"
              >
                Email Us
              </a>
              <Link
                to="/register/student"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-12 py-6 text-lg font-black text-white backdrop-blur-2xl transition-all hover:bg-white/10 active:scale-95"
              >
                Join Peerly
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-32 text-center relative z-10">
        <ScrollReveal>
          <div className="rounded-[60px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-24 backdrop-blur-3xl relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0071E3]/5 to-[#BF40BF]/5 blur-[150px]" />
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 relative z-10 text-white leading-[0.85]">
              READY TO <br /> <span className="text-gradient">ACCELERATE?</span>
            </h2>
            <p className="text-[#86868B] text-2xl mb-16 relative z-10 max-w-2xl mx-auto font-medium leading-relaxed">
              Join thousands of others building meaningful professional relationships today.
            </p>
            <Link
              to="/register/student"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0071E3] to-[#0077ED] px-16 py-7 text-xl font-black text-white shadow-[0_20px_50px_rgba(0,113,227,0.3)] transition-all hover:scale-[1.05] hover:shadow-[0_25px_60px_rgba(0,113,227,0.4)] active:scale-95 relative z-10"
            >
              Create Free Account
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

