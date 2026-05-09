import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Video, UserCircle, Activity, Star, ChevronRight } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import ScrollReveal from '../components/ScrollReveal';

export default function HomePage() {
  return (
    <main className="min-h-screen pt-32 pb-10 overflow-hidden bg-black">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-24 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-[13px] font-medium text-[#86868B] backdrop-blur-xl mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5AC8FA] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071E3]"></span>
            </span>
            ✨ Live networking platform
          </div>
          
          <h1 className="text-balance text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl mb-8 relative text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0071E3] to-[#BF40BF] blur-[120px] opacity-20 -z-10" />
            Connect Students & <br className="hidden sm:block" />
            <span className="text-gradient">Professionals</span> Seamlessly
          </h1>
          
          <p className="mx-auto max-w-2xl text-pretty text-xl text-[#86868B] leading-relaxed mb-12 font-medium">
            A premium network designed for the modern era. Find mentors, get referrals, and collaborate instantly through high-quality chat and video calls.
          </p>
          
          <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
            <Link
              to="/register/student"
              className="inline-flex items-center justify-center rounded-full bg-[#0071E3] px-10 py-4 text-sm font-bold text-white shadow-lg shadow-[#0071E3]/25 transition-all hover:bg-[#0077ED] hover:scale-[1.02] active:scale-95 group"
            >
              Get Started
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="#features"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 py-4 text-sm font-bold text-white backdrop-blur-lg transition-all hover:bg-white/10 active:scale-95"
            >
              Explore Features
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. Trust Section */}
      <section className="bg-[#1D1D1F] py-16">
        <ScrollReveal delay={0.2} className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-xs font-bold text-[#86868B] mb-10 uppercase tracking-[0.2em]">
            Trusted by 5000+ students & professionals at
          </p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-80 duration-700">
            {['Acme Corp', 'GlobalTech', 'InnovateInc', 'NextGen', 'Quantum'].map((company) => (
              <div key={company} className="flex items-center gap-3 font-bold text-xl text-white cursor-default">
                <div className="h-7 w-7 rounded-lg bg-white/10 border border-white/10" />
                {company}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Feature Cards Section */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-32 relative scroll-mt-32 bg-black">
        <div className="absolute inset-0 top-1/2 -z-10 bg-gradient-to-br from-[#0071E3]/10 via-[#BF40BF]/10 to-transparent blur-[150px] opacity-50 rounded-full" />
        
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">Everything you need to connect</h2>
          <p className="text-[#86868B] text-lg max-w-2xl mx-auto font-medium">Built from the ground up to provide a seamless, real-time communication experience between mentors and mentees.</p>
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
      <section id="about" className="mx-auto max-w-6xl px-4 py-32 relative scroll-mt-32 bg-[#1D1D1F]">
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">Loved by our community</h2>
          <p className="text-[#86868B] text-lg max-w-2xl mx-auto font-medium">See what students and professionals are saying about their experience on Peerly.</p>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
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
              <div className="flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-black/40 p-10 backdrop-blur-xl hover:bg-black/60 transition-all duration-500 shadow-2xl group">
                <div>
                  <div className="flex gap-1 mb-8 text-[#0071E3]">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed mb-8 font-medium italic">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0071E3] to-[#BF40BF] flex items-center justify-center font-bold shadow-lg text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-[#86868B]">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="mx-auto max-w-4xl px-4 py-32 text-center scroll-mt-32 bg-black">
        <ScrollReveal>
          <div className="rounded-[40px] border border-white/5 bg-[#1D1D1F] p-16 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-[#0071E3]/20 blur-[100px] rounded-full group-hover:bg-[#0071E3]/30 transition-colors duration-700" />
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">Contact</h2>
            <p className="text-[#86868B] text-xl mb-12 max-w-2xl mx-auto font-medium">
              Have a question, partnership idea, or feedback? Reach out and we’ll get back to you.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <a
                href="mailto:hello@peerly.com"
                className="inline-flex items-center justify-center rounded-full bg-[#0071E3] px-10 py-4 text-sm font-bold text-white shadow-lg shadow-[#0071E3]/20 transition-all hover:bg-[#0077ED] hover:scale-105 active:scale-95"
              >
                Email Us
              </a>
              <Link
                to="/register/student"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-10 py-4 text-sm font-bold text-white backdrop-blur-lg transition-all hover:bg-white/10 active:scale-95"
              >
                Join Peerly
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-4 py-32 text-center">
        <ScrollReveal>
          <div className="rounded-[40px] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-20 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0071E3]/10 to-[#BF40BF]/10 blur-[120px]" />
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 relative z-10 text-white">Ready to accelerate <br /> your career?</h2>
            <p className="text-[#86868B] text-xl mb-12 relative z-10 max-w-xl mx-auto font-medium">Join thousands of others building meaningful professional relationships.</p>
            <Link
              to="/register/student"
              className="inline-flex items-center justify-center rounded-full bg-white px-12 py-5 text-base font-bold text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] active:scale-95 relative z-10"
            >
              Create Free Account
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}

