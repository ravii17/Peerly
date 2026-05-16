import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Star, 
  Briefcase, 
  Clock, 
  MapPin, 
  Zap, 
  ChevronDown, 
  X, 
  Send,
  MessageSquare,
  Video,
  FileText,
  UserCheck,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Globe,
  Award,
  CheckCircle2
} from 'lucide-react';

// --- Mock Data ---

const COMPANIES = [
  { name: "Google", color: "#4285F4", domain: "FAANG" },
  { name: "Meta", color: "#0668E1", domain: "FAANG" },
  { name: "OpenAI", color: "#10a37f", domain: "AI/ML" },
  { name: "NVIDIA", color: "#76B900", domain: "AI/ML" },
  { name: "Jane Street", color: "#00a4e4", domain: "Finance" },
  { name: "Stripe", color: "#635bff", domain: "Product" },
  { name: "Microsoft", color: "#00a4ef", domain: "FAANG" },
  { name: "Goldman Sachs", color: "#21759b", domain: "Finance" },
];

const MENTORS_DATA = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior AI Researcher",
    company: "OpenAI",
    experience: 6,
    skills: ["PyTorch", "LLMs", "NLP", "Python"],
    bio: "Helping students break into AI research and understand the future of large language models.",
    availability: "Available",
    rating: 4.9,
    sessions: 42,
    matchScore: 98,
    domain: "AI Research",
    image: "https://i.pravatar.cc/150?u=alex",
    type: "AI/ML",
    location: "San Francisco, CA (Remote)"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Lead Software Engineer",
    company: "Google",
    experience: 8,
    skills: ["React", "Go", "Distributed Systems", "GCP"],
    bio: "Passionate about building scalable web applications and mentoring next-gen engineers at Google.",
    availability: "Limited",
    rating: 4.8,
    sessions: 128,
    matchScore: 92,
    domain: "Software Engineering",
    image: "https://i.pravatar.cc/150?u=sarah",
    type: "FAANG",
    location: "Mountain View, CA"
  },
  {
    id: 3,
    name: "James Wilson",
    role: "Quantitative Trader",
    company: "Jane Street",
    experience: 5,
    skills: ["Ocaml", "C++", "Probability", "Algorithms"],
    bio: "Ex-IMO medalist. Specializing in high-frequency trading and quantitative analysis strategies.",
    availability: "Available",
    rating: 5.0,
    sessions: 15,
    matchScore: 85,
    domain: "Finance/Trading",
    image: "https://i.pravatar.cc/150?u=james",
    type: "Finance",
    location: "New York, NY"
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "Senior Product Manager",
    company: "Atlassian",
    experience: 7,
    skills: ["Product Strategy", "Agile", "User Research", "SQL"],
    bio: "PM leader focusing on developer tools. I can help with product thinking and interview prep.",
    availability: "Weekend Only",
    rating: 4.7,
    sessions: 56,
    matchScore: 78,
    domain: "Product Management",
    image: "https://i.pravatar.cc/150?u=priya",
    type: "Product",
    location: "Sydney, Australia (Remote)"
  },
  {
    id: 5,
    name: "David Hoffmann",
    role: "Deep Learning Engineer",
    company: "NVIDIA",
    experience: 4,
    skills: ["CUDA", "C++", "Computer Vision", "TensorRT"],
    bio: "Optimizing neural networks for the edge. Let's talk about GPU architecture and AI performance.",
    availability: "Available",
    rating: 4.9,
    sessions: 31,
    matchScore: 95,
    domain: "AI/ML",
    image: "https://i.pravatar.cc/150?u=david",
    type: "AI/ML",
    location: "Santa Clara, CA"
  },
  {
    id: 6,
    name: "Elena Rodriguez",
    role: "Frontend Architect",
    company: "Vercel",
    experience: 9,
    skills: ["Next.js", "Tailwind CSS", "TypeScript", "UI/UX"],
    bio: "Building the future of the web. I specialize in performance, animations, and premium UX.",
    availability: "Limited",
    rating: 5.0,
    sessions: 89,
    matchScore: 88,
    domain: "Web Development",
    image: "https://i.pravatar.cc/150?u=elena",
    type: "Startup",
    location: "Remote"
  },
  {
    id: 7,
    name: "Kevin Park",
    role: "Backend Engineer",
    company: "Meta",
    experience: 6,
    skills: ["Java", "Rust", "Distributed Systems", "GraphQL"],
    bio: "Core infrastructure engineer. I help with system design and backend scalability at scale.",
    availability: "Available",
    rating: 4.6,
    sessions: 47,
    matchScore: 82,
    domain: "Software Engineering",
    image: "https://i.pravatar.cc/150?u=kevin",
    type: "FAANG",
    location: "Menlo Park, CA"
  },
  {
    id: 8,
    name: "Sophie Laurent",
    role: "Machine Learning Lead",
    company: "DeepMind",
    experience: 7,
    skills: ["Reinforcement Learning", "JAX", "Python", "Research"],
    bio: "Focusing on AGI and scientific discovery. Open to mentoring students with strong math backgrounds.",
    availability: "Limited",
    rating: 5.0,
    sessions: 24,
    matchScore: 94,
    domain: "AI Research",
    image: "https://i.pravatar.cc/150?u=sophie",
    type: "AI/ML",
    location: "London, UK"
  }
];

// --- Components ---

const FilterDropdown = ({ label, options, value, onChange }) => (
  <div className="relative group">
    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all">
      {value || label}
      <ChevronDown className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
    </button>
    <div className="absolute top-full mt-2 left-0 w-48 py-2 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="w-full text-left px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          {opt}
        </button>
      ))}
      {value && (
        <button
          onClick={() => onChange("")}
          className="w-full text-left px-4 py-2 text-sm text-[#007AFF] hover:bg-white/5 transition-colors border-t border-white/5 mt-1"
        >
          Clear Filter
        </button>
      )}
    </div>
  </div>
);

const MentorCard = ({ mentor, onOpenRequest }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-card p-6 rounded-[32px] relative overflow-hidden group cursor-default"
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-[#007AFF]/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10">
              <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-[#030303] ${mentor.availability === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#007AFF] transition-colors">{mentor.name}</h3>
            <p className="text-sm text-zinc-400 font-medium">{mentor.role}</p>
            <div className="flex items-center gap-1.5 mt-1">
               <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{mentor.company}</span>
               <div className="w-1 h-1 rounded-full bg-zinc-700" />
               <span className="text-xs text-zinc-500">{mentor.experience} yrs exp</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="px-3 py-1.5 rounded-xl bg-[#007AFF]/10 border border-[#007AFF]/20 flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,122,255,0.1)]">
            <Sparkles className="w-3.5 h-3.5 text-[#007AFF]" />
            <span className="text-xs font-black text-[#007AFF]">{mentor.matchScore}% Match</span>
          </div>
          {mentor.matchScore > 90 && (
            <span className="text-[10px] font-bold text-emerald-500 mt-1 uppercase tracking-tighter">Highly Recommended</span>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-400 line-clamp-2 font-medium leading-relaxed relative z-10">
        {mentor.bio}
      </p>

      <div className="mt-6 flex flex-wrap gap-2 relative z-10">
        {mentor.skills.map((skill) => (
          <span key={skill} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-300 uppercase tracking-wider">
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-white">{mentor.rating}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-xs font-medium text-zinc-500">{mentor.sessions} sessions</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-zinc-500">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-[10px] font-medium">{mentor.location}</span>
        </div>
      </div>

      <div className="mt-6 flex gap-3 relative z-10">
        <button className="flex-1 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all active:scale-95">
          View Profile
        </button>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onOpenRequest(mentor)}
          className="flex-1 py-3 rounded-2xl bg-[#007AFF] text-white text-xs font-bold shadow-[0_10px_20px_rgba(0,122,255,0.2)] hover:shadow-[0_15px_30px_rgba(0,122,255,0.4)] transition-all flex items-center justify-center gap-2 group/btn"
        >
          Send Request
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const RequestModal = ({ mentor, onClose, isOpen }) => {
  const [message, setMessage] = useState('');
  const [sessionType, setSessionType] = useState('Career Guidance');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Success state
    setTimeout(() => {
      onClose();
      setStep(1);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-lg glass-panel rounded-[40px] p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#007AFF]/10 blur-[80px] rounded-full -mr-32 -mt-32" />
        
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors text-zinc-500 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Send request to {mentor.name}</h3>
                <p className="text-sm text-zinc-500 font-medium">{mentor.role} at {mentor.company}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-1">Session Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Career Guidance', 'Resume Review', 'Mock Interview', 'Project Mentorship'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSessionType(type)}
                      className={`px-4 py-3 rounded-2xl border text-xs font-bold transition-all ${
                        sessionType === type 
                          ? 'bg-[#007AFF]/10 border-[#007AFF] text-[#007AFF] shadow-[0_0_20px_rgba(0,122,255,0.1)]' 
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-1">Personal Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hey Alex, I'd love to learn more about breaking into AI research..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#007AFF]/50 transition-colors resize-none"
                />
              </div>

              <div className="bg-[#007AFF]/5 border border-[#007AFF]/10 rounded-2xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#007AFF] mt-0.5" />
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <span className="font-bold text-white">AI Tip:</span> Personalized messages have a <span className="text-emerald-500 font-bold">45% higher</span> acceptance rate from OpenAI mentors.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#007AFF] text-white font-bold text-sm shadow-[0_10px_30px_rgba(0,122,255,0.3)] hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Connection Request
              </button>
            </form>
          </div>
        ) : (
          <div className="relative z-10 py-12 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Sent!</h3>
            <p className="text-zinc-500 font-medium">Alex Rivera will be notified immediately.</p>
            <div className="mt-8 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Closing in 2 seconds...
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedExp, setSelectedExp] = useState('');
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [selectedMentorForRequest, setSelectedMentorForRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredMentors = useMemo(() => {
    return MENTORS_DATA.filter(mentor => {
      const matchesSearch = !searchQuery || 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCompany = !selectedCompany || mentor.company === selectedCompany;
      const matchesDomain = !selectedDomain || mentor.type === selectedDomain;
      const matchesExp = !selectedExp || (
        selectedExp === '0-3 years' ? mentor.experience <= 3 :
        selectedExp === '3-6 years' ? (mentor.experience > 3 && mentor.experience <= 6) :
        mentor.experience > 6
      );

      return matchesSearch && matchesCompany && matchesDomain && matchesExp;
    });
  }, [searchQuery, selectedCompany, selectedDomain, selectedExp]);

  return (
    <div className="min-h-screen bg-[#030303] pt-28 pb-20 px-6 overflow-hidden">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#007AFF]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        <header className="relative space-y-8 text-center md:text-left">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20 mb-6">
              <Zap className="w-3.5 h-3.5 text-[#007AFF]" />
              <span className="text-[10px] font-black text-[#007AFF] uppercase tracking-wider">AI Powered Search</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6">
              Explore <span className="text-gradient">Mentors</span>
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl max-w-2xl font-medium leading-relaxed">
              Connect with world-class professionals from FAANG, Startups, and top Research labs.
            </p>
          </motion.div>

          <div className="sticky top-24 z-40 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-[#007AFF] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search by company, role, technology, or mentor name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#007AFF]/50 focus:bg-white/[0.08] transition-all shadow-2xl"
                />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"><X className="w-4 h-4 text-zinc-500" /></button>}
              </div>

              <div className="flex flex-wrap gap-3 items-center">
                <FilterDropdown label="Company" options={COMPANIES.map(c => c.name)} value={selectedCompany} onChange={setSelectedCompany} />
                <FilterDropdown label="Domain" options={['FAANG', 'AI/ML', 'Finance', 'Product', 'Startup']} value={selectedDomain} onChange={setSelectedDomain} />
                <FilterDropdown label="Experience" options={['0-3 years', '3-6 years', '6+ years']} value={selectedExp} onChange={setSelectedExp} />
              </div>
            </div>

            <div className="flex items-center gap-4 py-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest whitespace-nowrap">Trending:</span>
              <div className="flex gap-2">
                {COMPANIES.slice(0, 6).map((co) => (
                  <button key={co.name} onClick={() => setSelectedCompany(co.name)} className={`px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${selectedCompany === co.name ? 'bg-[#007AFF] border-[#007AFF] text-white' : 'bg-white/5 border-white/10 text-zinc-500'}`}>{co.name}</button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {!isResumeUploaded ? (
          <section className="glass-card p-12 rounded-[40px] text-center space-y-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/5 via-transparent to-purple-500/5 opacity-50" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                <FileText className="w-10 h-10 text-[#007AFF]" />
              </div>
              <h2 className="text-3xl font-bold text-white">Unlock AI Mentor Recommendations</h2>
              <p className="text-zinc-500 max-w-lg mx-auto font-medium">Upload your resume to let our AI analyze your skills and match you with the best mentors.</p>
              <button onClick={() => setIsResumeUploaded(true)} className="mt-8 px-10 py-4 rounded-2xl bg-white text-black font-black text-sm hover:bg-[#007AFF] hover:text-white transition-all shadow-2xl">Upload Resume & Start Matching</button>
            </div>
          </section>
        ) : (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">Recommended For You <Sparkles className="w-5 h-5 text-[#007AFF]" /></h2>
                <p className="text-sm text-zinc-500 font-medium">Based on your Full Stack Developer profile</p>
              </div>
              <button className="text-sm font-bold text-[#007AFF] hover:underline">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? Array(6).fill(0).map((_, i) => <div key={i} className="glass-card p-6 rounded-[32px] space-y-6 h-80 skeleton" />) : filteredMentors.map((mentor) => <MentorCard key={mentor.id} mentor={mentor} onOpenRequest={setSelectedMentorForRequest} />)}
            </div>
            
            {filteredMentors.length > 0 && (
              <div className="flex justify-center mt-12">
                <button className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 font-bold text-sm hover:bg-white/10 hover:text-white transition-all">Load More Mentors</button>
              </div>
            )}

            {filteredMentors.length === 0 && !isLoading && (
              <div className="py-20 text-center space-y-4">
                <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white">No mentors found</h3>
                <p className="text-zinc-500">Try adjusting your filters.</p>
              </div>
            )}
          </section>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12 border-t border-white/5">
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3"><Award className="w-6 h-6 text-yellow-500" /> Top Mentors This Week</h2>
            <div className="space-y-4">
              {MENTORS_DATA.slice(0, 3).map((m) => (
                <div key={m.id} className="glass-card p-4 rounded-2xl flex items-center justify-between group hover:bg-white/5">
                  <div className="flex items-center gap-4">
                    <img src={m.image} alt={m.name} className="w-12 h-12 rounded-xl border border-white/10" />
                    <div><h4 className="text-sm font-bold text-white group-hover:text-[#007AFF]">{m.name}</h4><p className="text-[10px] text-zinc-500 uppercase">{m.company} • {m.role}</p></div>
                  </div>
                  <div className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /><span className="text-xs font-bold text-white">{m.rating}</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3"><TrendingUp className="w-6 h-6 text-emerald-500" /> Trending Companies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {COMPANIES.map((co) => (
                <button key={co.name} onClick={() => setSelectedCompany(co.name)} className="glass-card p-6 rounded-3xl flex flex-col items-center justify-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black text-white bg-white/5 group-hover:scale-110 transition-transform" style={{ color: co.color }}>{co.name[0]}</div>
                  <span className="text-[10px] font-black text-zinc-400 group-hover:text-white uppercase">{co.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {selectedMentorForRequest && (
          <RequestModal mentor={selectedMentorForRequest} isOpen={!!selectedMentorForRequest} onClose={() => setSelectedMentorForRequest(null)} />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />
    </div>
  );
}
