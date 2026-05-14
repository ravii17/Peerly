import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Search, 
  Briefcase, 
  FileText, 
  Video, 
  Star,
  ChevronRight,
  Plus,
  CheckCircle2,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-6 rounded-3xl relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 rounded-full -mr-16 -mt-16 bg-${color}-500 transition-opacity group-hover:opacity-20`} />
    <div className="flex items-start justify-between relative z-10">
      <div className={`p-3 rounded-2xl bg-${color}-500/10 border border-${color}-500/20`}>
        <Icon className={`w-6 h-6 text-${color}-500`} />
      </div>
      {trend && (
        <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
          {trend}
        </span>
      )}
    </div>
    <div className="mt-4 relative z-10">
      <p className="text-sm font-medium text-zinc-500">{title}</p>
      <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
    </div>
  </motion.div>
);

const QuickAction = ({ icon: Icon, label }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex flex-col items-center gap-3 p-4 glass-card rounded-2xl hover:bg-white/5 transition-all group"
  >
    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
      <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white" />
    </div>
    <span className="text-xs font-medium text-zinc-400 group-hover:text-zinc-200">{label}</span>
  </motion.button>
);

const MentorCard = ({ name, role, company, rating, experience, image }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="glass-card p-5 rounded-3xl group"
  >
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-zinc-800 overflow-hidden border border-white/10">
           {/* Placeholder for mentor image */}
           <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-xl font-bold text-zinc-500">
             {name[0]}
           </div>
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#030303]" />
      </div>
      <div>
        <h4 className="font-bold text-white group-hover:text-[#007AFF] transition-colors">{name}</h4>
        <p className="text-xs text-zinc-500">{role} at <span className="text-zinc-300">{company}</span></p>
      </div>
    </div>
    
    <div className="mt-6 flex items-center justify-between text-xs font-medium px-1">
      <div className="flex items-center gap-1.5">
        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
        <span className="text-zinc-200">{rating}</span>
        <span className="text-zinc-600">({experience} yrs)</span>
      </div>
    </div>

    <div className="mt-6 flex gap-2">
      <button className="flex-1 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all active:scale-95">
        Connect
      </button>
      <button className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all active:scale-95">
        View Profile
      </button>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Main Content Area */}
      <div className="flex-1 space-y-12">
        
        {/* Hero Section */}
        <header className="relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#007AFF]/10 blur-[100px] rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
              <span className="text-[10px] font-bold text-[#007AFF] uppercase tracking-wider">Student Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Welcome back, <span className="text-gradient">Ravi 👋</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl font-medium leading-relaxed">
              Continue your learning journey and connect with mentors who guide your future.
            </p>
            
            <div className="flex items-center gap-4 mt-8">
              <button className="px-8 py-3.5 rounded-2xl bg-[#007AFF] text-white font-bold text-sm shadow-[0_10px_30px_rgba(0,122,255,0.3)] hover:scale-105 transition-all active:scale-95">
                Find a Mentor
              </button>
              <button className="px-8 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all active:scale-95">
                Join Community
              </button>
            </div>
          </motion.div>
        </header>

        {/* Dashboard Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard icon={Calendar} title="Upcoming Sessions" value="03" trend="+1 new" color="blue" />
          <StatCard icon={Users} title="Mentor Requests" value="12" trend="+5 this week" color="purple" />
          <StatCard icon={TrendingUp} title="Learning Progress" value="78%" trend="On track" color="emerald" />
          <StatCard icon={MessageSquare} title="Community Messages" value="24" color="cyan" />
          <StatCard icon={BookOpen} title="Saved Resources" value="15" color="orange" />
          <StatCard icon={Briefcase} title="Career Goals" value="Achieving" color="rose" />
        </section>

        {/* Learning Roadmap Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Skill Roadmap Progress</h2>
            <button className="text-sm font-bold text-[#007AFF] flex items-center gap-1 hover:underline">
              View Full Roadmap <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="glass-card p-8 rounded-[32px] relative overflow-hidden">
             {/* Simple Timeline Illustration */}
             <div className="flex items-center justify-between relative">
               <div className="absolute top-1/2 left-0 right-0 h-1 bg-zinc-800 -translate-y-1/2 z-0" />
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: '65%' }}
                 className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#007AFF] to-[#7000FF] -translate-y-1/2 z-0" 
               />
               
               {['Beginner', 'Intermediate', 'Advanced', 'Industry Ready'].map((level, i) => (
                 <div key={level} className="relative z-10 flex flex-col items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${i <= 2 ? 'bg-[#007AFF] border-[#007AFF] shadow-[0_0_20px_rgba(0,122,255,0.4)]' : 'bg-zinc-900 border-zinc-800'}`}>
                     {i <= 1 ? <CheckCircle2 className="w-5 h-5 text-white" /> : <div className={`w-2 h-2 rounded-full ${i === 2 ? 'bg-white animate-pulse' : 'bg-zinc-700'}`} />}
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${i <= 2 ? 'text-white' : 'text-zinc-600'}`}>{level}</span>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Recommended Mentors Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Recommended Mentors</h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl border border-white/5 bg-white/5 text-zinc-400 hover:text-white transition-colors"><ChevronRight className="w-5 h-5 rotate-180" /></button>
              <button className="p-2 rounded-xl border border-white/5 bg-white/5 text-zinc-400 hover:text-white transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MentorCard 
              name="Sarah Jenkins" 
              role="Senior Designer" 
              company="Stripe" 
              rating="4.9" 
              experience="8" 
            />
            <MentorCard 
              name="Marcus Chen" 
              role="Lead Engineer" 
              company="Linear" 
              rating="5.0" 
              experience="12" 
            />
          </div>
        </section>

      </div>

      {/* Sidebar Widget Area */}
      <aside className="w-full lg:w-80 space-y-8">
        
        {/* Profile Completion Widget */}
        <section className="glass-card p-6 rounded-[32px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#007AFF]/5 blur-[50px] rounded-full -mr-16 -mt-16" />
          
          <div className="flex flex-col items-center text-center">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-3xl bg-zinc-800 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#007AFF]/50">
                <Plus className="w-6 h-6 text-zinc-500 group-hover:text-[#007AFF]" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-white shadow-xl flex items-center justify-center">
                 <span className="text-[10px] font-black text-black">75%</span>
              </div>
            </div>
            <h4 className="mt-4 font-bold text-white">Ravi Kumar</h4>
            <p className="text-xs text-zinc-500">Computer Science • Year 3</p>
          </div>

          <div className="mt-8 space-y-3">
             <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">Checklist</p>
             {[
               { label: 'Add bio', done: true },
               { label: 'Add skills/interests', done: true },
               { label: 'Upload resume', done: false },
               { label: 'Add LinkedIn/GitHub', done: true },
               { label: 'Select career goals', done: false },
               { label: 'Add availability', done: false },
             ].map((item) => (
               <div key={item.label} className="flex items-center gap-3 group cursor-pointer">
                 <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${item.done ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-500' : 'bg-white/5 border-white/10 text-transparent'}`}>
                    <CheckCircle2 className="w-3 h-3" />
                 </div>
                 <span className={`text-xs font-medium transition-colors ${item.done ? 'text-zinc-400 line-through decoration-zinc-700' : 'text-zinc-300 group-hover:text-white'}`}>{item.label}</span>
               </div>
             ))}
          </div>

          <button className="w-full mt-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all">
            Complete Profile
          </button>
        </section>

        {/* Quick Actions */}
        <section className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Quick Actions</p>
          <div className="grid grid-cols-2 gap-3">
             <QuickAction icon={Calendar} label="Book Session" />
             <QuickAction icon={Search} label="Opportunities" />
             <QuickAction icon={FileText} label="Portfolio" />
             <QuickAction icon={Video} label="Live Events" />
             <QuickAction icon={CheckCircle2} label="Resume Review" />
             <QuickAction icon={Users} label="Mock Interview" />
          </div>
        </section>

        {/* External Links */}
        <section className="glass-card p-6 rounded-[32px] flex flex-col gap-4">
           <a href="#" className="flex items-center justify-between group">
             <div className="flex items-center gap-3">
               <div className="p-2 rounded-lg bg-zinc-800 text-zinc-400 group-hover:text-white transition-colors"><Github className="w-4 h-4" /></div>
               <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">GitHub Profile</span>
             </div>
             <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />
           </a>
           <a href="#" className="flex items-center justify-between group">
             <div className="flex items-center gap-3">
               <div className="p-2 rounded-lg bg-[#0077B5]/20 text-[#0077B5] group-hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></div>
               <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">LinkedIn Profile</span>
             </div>
             <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:translate-x-1 transition-transform" />
           </a>
        </section>

      </aside>

    </div>
  );
}
