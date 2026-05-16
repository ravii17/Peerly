import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Clock, 
  Video, 
  MoreVertical, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ExternalLink, 
  FileText, 
  MessageSquare, 
  Download, 
  Star, 
  ChevronRight, 
  Sparkles, 
  Timer,
  Users,
  TrendingUp,
  ArrowRight,
  BookOpen,
  MapPin
} from 'lucide-react';

// --- Mock Data ---

const INITIAL_SESSIONS = [
  {
    id: 's1',
    mentorName: 'Alex Rivera',
    role: 'Senior AI Researcher',
    company: 'OpenAI',
    mentorImage: 'https://i.pravatar.cc/150?u=alex',
    topic: 'Introduction to LLM Fine-tuning',
    date: new Date().toISOString().split('T')[0], // Today
    startTime: '14:00',
    endTime: '15:00',
    duration: '60 min',
    mode: 'Google Meet',
    status: 'Upcoming',
    agenda: '1. Overview of fine-tuning techniques\n2. Selecting appropriate datasets\n3. Hardware requirements & optimization\n4. Q&A session',
    resources: ['Fine-tuning Guide PDF', 'Sample Python Script'],
    notes: ''
  },
  {
    id: 's2',
    mentorName: 'Sarah Chen',
    role: 'Lead Software Engineer',
    company: 'Google',
    mentorImage: 'https://i.pravatar.cc/150?u=sarah',
    topic: 'System Design Interview Prep',
    date: '2026-05-18',
    startTime: '10:00',
    endTime: '11:00',
    duration: '60 min',
    mode: 'Zoom',
    status: 'Upcoming',
    agenda: '1. Load balancing strategies\n2. Database sharding vs replication\n3. Caching patterns\n4. Mock scenario walkthrough',
    resources: ['System Design Roadmap'],
    notes: ''
  },
  {
    id: 's3',
    mentorName: 'Marcus Chen',
    role: 'Lead Engineer',
    company: 'Linear',
    mentorImage: 'https://i.pravatar.cc/150?u=marcus',
    topic: 'Frontend Performance Optimization',
    date: '2026-05-10',
    startTime: '16:00',
    endTime: '17:00',
    duration: '60 min',
    mode: 'In-app call',
    status: 'Completed',
    agenda: 'Discussed Core Web Vitals, code-splitting strategies, and image optimization.',
    resources: ['Performance Audit Checklist'],
    notes: 'Ravi has a strong grasp of React but needs to focus more on cumulative layout shift (CLS) issues.',
    rating: 5,
    feedback: 'Excellent session! Very practical advice.'
  }
];

// --- Components ---

const StatusBadge = ({ status }) => {
  const styles = {
    Upcoming: 'bg-[#007AFF]/10 border-[#007AFF]/20 text-[#007AFF]',
    Live: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 animate-pulse',
    Completed: 'bg-zinc-500/10 border-zinc-500/20 text-zinc-400',
    Cancelled: 'bg-rose-500/10 border-rose-500/20 text-rose-500',
  };

  return (
    <div className={`px-2.5 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${styles[status]}`}>
      {status === 'Live' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
      {status}
    </div>
  );
};

const SessionCard = ({ session, onOpenDetails, isLive }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`glass-card p-6 rounded-[32px] relative overflow-hidden group border transition-all ${
        isLive ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 'border-white/10'
      }`}
    >
      {isLive && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            LIVE NOW
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        {/* Mentor Info */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-transform group-hover:scale-105">
              <img src={session.mentorImage} alt={session.mentorName} className="w-full h-full object-cover" />
            </div>
            {isLive && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#030303]" />}
          </div>
          <div>
            <h4 className="font-bold text-white group-hover:text-[#007AFF] transition-colors">{session.mentorName}</h4>
            <p className="text-xs text-zinc-500 font-medium">{session.role} at <span className="text-zinc-300">{session.company}</span></p>
            <div className="mt-3 flex items-center gap-3">
               <StatusBadge status={isLive ? 'Live' : session.status} />
            </div>
          </div>
        </div>

        {/* Session Details */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white line-clamp-1">{session.topic}</h3>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                {session.date}
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                <Clock className="w-3.5 h-3.5" />
                {session.startTime} - {session.endTime} ({session.duration})
              </div>
              <div className="flex items-center gap-1.5 text-[#007AFF] text-xs font-bold">
                <Video className="w-3.5 h-3.5" />
                {session.mode}
              </div>
            </div>
          </div>

          {isLive && (
             <div className="flex items-center gap-4 py-3 px-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest">
                   <Users className="w-4 h-4" />
                   2 Participants
                </div>
                <div className="h-4 w-px bg-emerald-500/20" />
                <div className="flex-1 flex items-center gap-1">
                   {[1,2,3,4,5].map(i => (
                     <motion.div 
                       key={i}
                       animate={{ height: [4, 12, 6, 16, 4] }}
                       transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                       className="w-1 bg-emerald-500/40 rounded-full"
                     />
                   ))}
                </div>
                <div className="text-emerald-500 text-xs font-mono font-bold">
                   <Timer className="inline w-3.5 h-3.5 mr-1" />
                   42:15
                </div>
             </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-row md:flex-col gap-3 justify-end">
          {session.status === 'Completed' ? (
             <button onClick={() => onOpenDetails(session)} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all">
                View Summary
             </button>
          ) : (
             <>
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all ${
                   isLive ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-[#007AFF] text-white shadow-[#007AFF]/20'
                 }`}
               >
                 {isLive ? 'Join Now' : 'Join Session'}
               </motion.button>
               <button onClick={() => onOpenDetails(session)} className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all">
                 Details
               </button>
             </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SessionDetailsPanel = ({ session, onClose }) => {
  if (!session) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-2xl glass-panel rounded-[40px] p-8 relative overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#007AFF]/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-500 hover:text-white">
          <XCircle className="w-6 h-6" />
        </button>

        <div className="relative z-10 space-y-8">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
               <img src={session.mentorImage} alt={session.mentorName} className="w-full h-full object-cover" />
             </div>
             <div>
               <h2 className="text-2xl font-bold text-white">{session.topic}</h2>
               <p className="text-zinc-500 font-medium">Session with {session.mentorName}</p>
               <div className="mt-3 flex items-center gap-3">
                  <StatusBadge status={session.status} />
                  <span className="text-xs text-zinc-600 font-medium">{session.date} • {session.startTime}</span>
               </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <section>
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" /> Agenda
                </h4>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{session.agenda}</p>
                </div>
              </section>

              <section>
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5" /> Shared Resources
                </h4>
                <div className="space-y-2">
                  {session.resources.map(res => (
                    <div key={res} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-pointer">
                      <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">{res}</span>
                      <Download className="w-4 h-4 text-zinc-600 group-hover:text-[#007AFF]" />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              {session.status === 'Completed' && (
                <section>
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Mentor Notes
                  </h4>
                  <div className="bg-[#007AFF]/5 border border-[#007AFF]/10 rounded-2xl p-4 italic">
                    <p className="text-sm text-zinc-400 leading-relaxed">"{session.notes}"</p>
                  </div>
                </section>
              )}

              <section>
                <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" /> Session Messages
                </h4>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-40 flex items-center justify-center text-center">
                  <p className="text-xs text-zinc-600 italic">No messages sent yet. Use the chat during the live session.</p>
                </div>
              </section>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
             {session.status === 'Completed' ? (
               <button className="flex-1 py-4 rounded-2xl bg-[#007AFF] text-white font-bold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Book Follow-up Session
               </button>
             ) : (
               <>
                <button className="flex-1 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">
                   Reschedule
                </button>
                <button className="flex-1 py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 font-bold text-sm hover:bg-rose-500/20 transition-all">
                   Cancel Session
                </button>
               </>
             )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function MySessionsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentTime = new Date();
  
  const filteredSessions = useMemo(() => {
    return sessions.filter(s => {
      // Logic for Live state (session is today and time is within 5 mins of start or during duration)
      // For mock, let's say 's1' is live if activeTab is 'Live Now' or if we're checking its time
      const sessionDate = new Date(s.date);
      const isToday = sessionDate.toDateString() === currentTime.toDateString();
      
      const [startH, startM] = s.startTime.split(':').map(Number);
      const startTime = new Date();
      startTime.setHours(startH, startM, 0);

      const [endH, endM] = s.endTime.split(':').map(Number);
      const endTime = new Date();
      endTime.setHours(endH, endM, 0);

      const isLive = isToday && currentTime >= startTime && currentTime <= endTime;

      const matchesSearch = s.mentorName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.topic.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === 'Live Now') return isLive && matchesSearch;
      if (activeTab === 'Upcoming') return s.status === 'Upcoming' && !isLive && matchesSearch;
      if (activeTab === 'Completed') return s.status === 'Completed' && matchesSearch;
      if (activeTab === 'Cancelled') return s.status === 'Cancelled' && matchesSearch;
      
      return matchesSearch;
    });
  }, [activeTab, searchQuery, sessions]);

  const tabs = ['Upcoming', 'Live Now', 'Completed', 'Cancelled'];

  return (
    <div className="min-h-screen bg-[#030303] pt-28 pb-20 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-[#007AFF]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="relative space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20 mb-6">
              <Calendar className="w-3.5 h-3.5 text-[#007AFF]" />
              <span className="text-[10px] font-black text-[#007AFF] uppercase tracking-wider">Session Manager</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              My <span className="text-gradient">Sessions</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-2xl font-medium leading-relaxed">
              Manage your mentorship meetings, track upcoming sessions, and revisit past conversations.
            </p>
          </motion.div>

          {/* Search & Tabs Bar */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between border-b border-white/5 pb-8 sticky top-24 z-40 bg-[#030303]/80 backdrop-blur-xl -mx-6 px-6">
            {/* Tabs */}
            <div className="flex items-center p-1.5 rounded-2xl bg-white/5 border border-white/10 w-full lg:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-active"
                      className="absolute inset-0 bg-[#007AFF] rounded-xl -z-10 shadow-[0_0_20px_rgba(0,122,255,0.3)]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative group w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#007AFF] transition-colors" />
              <input 
                type="text" 
                placeholder="Search sessions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#007AFF]/50 transition-all"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           
           {/* Sessions List */}
           <div className="lg:col-span-2 space-y-8">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="glass-card p-8 rounded-[32px] h-48 skeleton" />
                ))
              ) : filteredSessions.length > 0 ? (
                <div className="space-y-6">
                   {filteredSessions.map((session) => (
                      <SessionCard 
                        key={session.id} 
                        session={session} 
                        isLive={activeTab === 'Live Now' || (session.id === 's1' && activeTab === 'Upcoming' && new Date().getHours() >= 14)}
                        onOpenDetails={setSelectedSession}
                      />
                   ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-24 text-center space-y-8 glass-card rounded-[48px] border-dashed border-white/10"
                >
                   <div className="w-32 h-32 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center relative group">
                      <div className="absolute inset-0 bg-[#007AFF]/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Calendar className="w-16 h-16 text-zinc-700 animate-float" />
                   </div>
                   <div>
                      <h2 className="text-3xl font-bold text-white mb-3">No Session Records Found</h2>
                      <p className="text-zinc-500 max-w-sm mx-auto font-medium">You haven't booked any mentorship sessions yet. Start your journey today!</p>
                   </div>
                   <button 
                    onClick={() => navigate('/explore')}
                    className="px-10 py-4 rounded-2xl bg-[#007AFF] text-white font-black text-sm shadow-[0_10px_30px_rgba(0,122,255,0.3)] hover:scale-105 transition-all active:scale-95 flex items-center gap-2"
                   >
                      Explore Mentors
                      <ArrowRight className="w-4 h-4" />
                   </button>
                </motion.div>
              )}
           </div>

           {/* AI Insights & Progress Sidebar */}
           <div className="space-y-8">
              {/* Progress Widget */}
              <section className="glass-card p-8 rounded-[40px] relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#007AFF]/10 blur-[60px] rounded-full -mr-16 -mt-16" />
                 <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#007AFF]" />
                    Your Mentorship Progress
                 </h3>
                 
                 <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Sessions</p>
                          <h4 className="text-2xl font-black text-white">12</h4>
                       </div>
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Streak</p>
                          <h4 className="text-2xl font-black text-[#007AFF]">4 <span className="text-xs">wks</span></h4>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <p className="text-xs font-bold text-zinc-400">Skills Improvement</p>
                          <span className="text-xs font-black text-[#007AFF]">78%</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '78%' }}
                            className="h-full bg-gradient-to-r from-[#007AFF] to-[#7000FF]"
                          />
                       </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4">Domains Explored</p>
                       <div className="flex flex-wrap gap-2">
                          {['AI/ML', 'System Design', 'Web Dev', 'Product'].map(tag => (
                            <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-300">
                               {tag}
                            </span>
                          ))}
                       </div>
                    </div>
                 </div>
              </section>

              {/* AI Recommendations */}
              <section className="glass-card p-8 rounded-[40px] relative overflow-hidden border-[#007AFF]/20 shadow-[0_0_40px_rgba(0,122,255,0.1)]">
                 <div className="absolute inset-0 bg-[#007AFF]/5 pointer-events-none" />
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#007AFF]" />
                    AI Insights
                 </h3>
                 <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    "Based on your recent <span className="text-white font-bold">AI mentorship sessions</span>, we recommend connecting with <span className="text-[#007AFF] font-bold">Data Science</span> mentors next to round out your knowledge."
                 </p>
                 <button 
                  onClick={() => navigate('/explore')}
                  className="mt-6 w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                 >
                    View Recommendations
                    <ChevronRight className="w-4 h-4" />
                 </button>
              </section>

              {/* Reminder Section */}
              <section className="glass-card p-8 rounded-[40px] bg-gradient-to-br from-[#007AFF]/20 to-transparent">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#007AFF] flex items-center justify-center shadow-lg">
                       <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <h4 className="text-white font-bold">Next Session</h4>
                       <p className="text-xs text-zinc-300">In 2 hours, 15 mins</p>
                    </div>
                 </div>
                 <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-[#007AFF]" />
                       <p className="text-xs font-bold text-zinc-300 line-clamp-1">Alex Rivera • LLM Fine-tuning</p>
                    </div>
                    <button className="w-full py-2.5 rounded-xl bg-white text-black text-xs font-black hover:scale-[1.02] active:scale-[0.98] transition-all">
                       Set Reminder
                    </button>
                 </div>
              </section>
           </div>
        </div>

      </div>

      {/* Details Modal */}
      <AnimatePresence>
         {selectedSession && (
           <SessionDetailsPanel 
             session={selectedSession} 
             onClose={() => setSelectedSession(null)} 
           />
         )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
