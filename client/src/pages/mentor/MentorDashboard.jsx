import { motion } from 'framer-motion';
import { 
  Users, Calendar, Clock, TrendingUp, DollarSign, 
  MessageSquare, Star, ChevronRight, Video, 
  CheckCircle2, XCircle, ArrowRight, Sparkles
} from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, trend, trendUp, color }) => (
  <div className="glass-card p-6 rounded-[24px] relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-20 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-150" style={{ backgroundColor: color }} />
    <div className="flex justify-between items-start relative z-10 mb-4">
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10" style={{ color: color }}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${trendUp ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
          {trend}
        </div>
      )}
    </div>
    <div className="relative z-10">
      <h3 className="text-3xl font-black text-white mb-1">{value}</h3>
      <p className="text-sm font-medium text-zinc-400">{title}</p>
    </div>
  </div>
);

export default function MentorDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#9D00FF]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9D00FF] to-[#00E5FF]">Elena 👋</span>
          </h1>
          <p className="text-lg text-zinc-400 font-medium max-w-2xl">
            You have 3 sessions today and 5 new mentorship requests pending review.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} title="Active Mentees" value="42" trend="+12% this month" trendUp={true} color="#00E5FF" />
        <StatCard icon={Video} title="Sessions Completed" value="156" trend="+8 this week" trendUp={true} color="#9D00FF" />
        <StatCard icon={Star} title="Average Rating" value="4.98" trend="Top 1%" trendUp={true} color="#F59E0B" />
        <StatCard icon={DollarSign} title="Monthly Earnings" value="$4,250" trend="+$450" trendUp={true} color="#10B981" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Upcoming & Requests */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Sessions */}
          <section className="glass-card rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Calendar className="w-6 h-6 text-[#00E5FF]" /> Upcoming Sessions
              </h2>
              <button className="text-sm font-bold text-[#00E5FF] hover:text-white transition-colors">View Schedule</button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: "Alex Chen", topic: "System Design Mock", time: "14:00 PST", dur: "60m" },
                { name: "Sarah Jenkins", topic: "Career Trajectory Review", time: "16:30 PST", dur: "45m" },
              ].map((session, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#00E5FF]/30 transition-all group">
                  <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 border-2 border-[#00E5FF] overflow-hidden">
                       <div className="w-full h-full flex items-center justify-center font-bold text-white bg-gradient-to-tr from-[#9D00FF] to-[#00E5FF]">{session.name[0]}</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{session.name}</h4>
                      <p className="text-sm text-[#00E5FF]">{session.topic}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between w-full md:w-auto gap-6">
                    <div className="text-right">
                      <p className="font-bold text-white">{session.time}</p>
                      <p className="text-xs text-zinc-500 font-medium">{session.dur}</p>
                    </div>
                    <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9D00FF] to-[#00E5FF] text-white font-bold text-sm shadow-[0_0_15px_rgba(157,0,255,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                      <Video className="w-4 h-4" /> Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pending Requests */}
          <section className="glass-card rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Users className="w-6 h-6 text-[#9D00FF]" /> Mentorship Requests
              </h2>
              <span className="px-3 py-1 bg-[#9D00FF]/20 text-[#9D00FF] rounded-lg text-xs font-bold">5 Pending</span>
            </div>

            <div className="space-y-4">
              {[
                { name: "David Kim", role: "Junior Dev at Startup", msg: "Looking for guidance on scaling our Node.js backend..." },
                { name: "Maria Garcia", role: "CS Student", msg: "Would love a resume review before applying to FAANG." },
              ].map((req, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-white">{req.name}</h4>
                      <p className="text-xs text-zinc-400">{req.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors">
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-300">"{req.msg}"</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-3 text-sm font-bold text-zinc-400 hover:text-white transition-colors">
              View All Requests
            </button>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          {/* Quick Actions */}
          <section className="glass-card rounded-[32px] p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                <span className="font-bold text-white">Update Availability</span>
                <Clock className="w-5 h-5 text-zinc-400 group-hover:text-[#00E5FF]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group">
                <span className="font-bold text-white">Community Chat</span>
                <MessageSquare className="w-5 h-5 text-zinc-400 group-hover:text-[#9D00FF]" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-[#9D00FF]/10 border border-[#9D00FF]/20 hover:bg-[#9D00FF]/20 transition-colors group">
                <span className="font-bold text-[#9D00FF]">Create Resource</span>
                <ArrowRight className="w-5 h-5 text-[#9D00FF] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* AI Insights */}
          <section className="glass-card rounded-[32px] p-6 border-[#00E5FF]/20 relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#00E5FF]/10 blur-[40px] rounded-full pointer-events-none" />
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00E5FF]" /> AI Assistant
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#00E5FF]/10 to-transparent border-l-2 border-[#00E5FF]">
                <p className="text-sm text-zinc-300 font-medium">
                  You have high demand for "System Design". Consider adding more slots on Thursday.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <p className="text-sm text-zinc-400 font-medium">
                  Don't forget to send post-session feedback to Alex Chen.
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
