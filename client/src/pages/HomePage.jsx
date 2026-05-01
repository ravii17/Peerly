import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Video, UserCircle, Activity } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-4 pt-32 pb-20">
      <div className="grid w-full items-center gap-16 lg:grid-cols-2">
        
        {/* Left Section - Hero */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-xl shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Connect students ↔ professionals in real-time
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Connect Students & <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Professionals</span> Seamlessly
          </motion.h1>
          
          <motion.p variants={itemVariants} className="max-w-xl text-pretty text-lg text-white/60 leading-relaxed">
            A premium network designed for the modern era. Find mentors, get referrals, and collaborate instantly through high-quality chat and video calls.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/register/student"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 hover:shadow-indigo-500/40 active:scale-95"
            >
              Get Started
            </Link>
            <Link
              to="/login/student"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-lg transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
            >
              Login
            </Link>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-[#070A12] bg-gradient-to-br from-indigo-400 to-purple-400" />
              ))}
            </div>
            <p className="text-xs font-medium text-white/60">
              Trusted by 10,000+ users worldwide
            </p>
          </motion.div>
        </motion.div>

        {/* Right Section - Grid */}
        <div className="grid gap-4 sm:grid-cols-2 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-transparent blur-3xl opacity-50 rounded-full" />
          
          <FeatureCard 
            icon={MessageSquare} 
            title="1-to-1 Chat" 
            description="Ultra-fast WebSocket messaging for seamless conversations and knowledge sharing."
            delay={0.4}
          />
          <FeatureCard 
            icon={Activity} 
            title="Live Presence" 
            description="Know exactly who is online and ready to collaborate with real-time status indicators."
            delay={0.5}
          />
          <FeatureCard 
            icon={Video} 
            title="HD Video Calls" 
            description="Crystal clear WebRTC peer-to-peer video calls right inside your browser."
            delay={0.6}
          />
          <FeatureCard 
            icon={UserCircle} 
            title="Rich Profiles" 
            description="Showcase your background, skills, and current company to attract the right connections."
            delay={0.7}
          />
        </div>
      </div>
    </main>
  );
}

