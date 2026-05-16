import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Plus, 
  Compass, 
  Hash, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Sparkles, 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  Video, 
  MoreVertical, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  ShieldCheck, 
  Zap, 
  Code, 
  Cpu, 
  PieChart, 
  Rocket, 
  Award,
  ChevronRight,
  X,
  UserPlus,
  Info,
  CheckCircle2,
  Lock,
  Globe,
  Radio,
  FileText,
  Maximize2,
  ChevronUp
} from 'lucide-react';

// --- Mock Data ---

const COMMUNITIES = [
  { id: 'c1', name: 'AI & Machine Learning', icon: Cpu, members: '12.4k', online: 450, color: '#10a37f', active: true, unread: 3 },
  { id: 'c2', name: 'Web Development', icon: Code, members: '24.1k', online: 1200, color: '#007AFF', active: false, unread: 0 },
  { id: 'c3', name: 'Finance & Trading', icon: PieChart, members: '8.2k', online: 210, color: '#00a4e4', active: false, unread: 12 },
  { id: 'c4', name: 'Startup Founders', icon: Rocket, members: '5.6k', online: 180, color: '#f59e0b', active: true, unread: 0 },
  { id: 'c5', name: 'Interview Prep', icon: ShieldCheck, members: '15.9k', online: 890, color: '#7000FF', active: false, unread: 5 },
  { id: 'c6', name: 'Career Guidance', icon: Zap, members: '10.3k', online: 340, color: '#ec4899', active: false, unread: 2 },
];

const FEED_POSTS = [
  {
    id: 'p1',
    user: { name: 'Alex Rivera', role: 'Mentor', image: 'https://i.pravatar.cc/150?u=alex', badge: 'AI Expert' },
    time: '2 hours ago',
    content: "Just published a comprehensive guide on fine-tuning Llama 3 for specific domain tasks. Check out the resource section in the AI community! #OpenAI #Llama3 #ML",
    likes: 124,
    comments: 18,
    tags: ['AI/ML', 'Research'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'p2',
    user: { name: 'Sarah Chen', role: 'Mentor', image: 'https://i.pravatar.cc/150?u=sarah', badge: 'Top Contributor' },
    time: '4 hours ago',
    content: "Google is opening up its Summer Internship applications tomorrow! Make sure your resumes are polished. I'll be doing a live resume review session tonight at 8 PM in the Career Room.",
    likes: 342,
    comments: 56,
    tags: ['Internships', 'Google'],
  },
  {
    id: 'p3',
    user: { name: 'Ravi Kumar', role: 'Student', image: 'https://i.pravatar.cc/150?u=ravi', badge: 'Active Learner' },
    time: '6 hours ago',
    content: "Looking for 2 more teammates for the upcoming Hackathon2026. We're building a decentralised mentoring platform. Tech stack: React, Solidity, Node.js. DM if interested!",
    likes: 45,
    comments: 12,
    tags: ['Hackathon', 'Web3'],
  }
];

const CHAT_MESSAGES = [
  { id: 'm1', user: 'Alex Rivera', text: 'Hey everyone! Ready for the AI workshop?', time: '10:00 AM', isMe: false },
  { id: 'm2', user: 'Me', text: 'Absolutely! Looking forward to the Llama 3 session.', time: '10:02 AM', isMe: true },
  { id: 'm3', user: 'Sarah Chen', text: 'I have some resources to share regarding the dataset prep.', time: '10:05 AM', isMe: false },
  { id: 'm4', user: 'Alex Rivera', text: 'Great, Sarah! Feel free to pin them in the resources channel.', time: '10:06 AM', isMe: false },
];

const TRENDING = [
  { tag: '#OpenAI', count: '2.4k posts' },
  { tag: '#GoogleInternship', count: '1.8k posts' },
  { tag: '#Hackathon2026', count: '1.2k posts' },
  { tag: '#ReactJS', count: '900 posts' },
  { tag: '#QuantFinance', count: '750 posts' },
];

// --- Components ---

const SidebarItem = ({ community, isActive, onClick }) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={() => onClick(community.id)}
    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group ${
      isActive ? 'bg-[#007AFF]/10 border border-[#007AFF]/20' : 'hover:bg-white/5 border border-transparent'
    }`}
  >
    <div className="flex items-center gap-3">
      <div 
        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
        style={{ backgroundColor: community.color + '20', border: `1px solid ${community.color}40` }}
      >
        <community.icon className="w-5 h-5" style={{ color: community.color }} />
      </div>
      <div className="text-left">
        <p className={`text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
          {community.name}
        </p>
        <p className="text-[10px] text-zinc-500 font-medium">
          {community.members} members • {community.online} online
        </p>
      </div>
    </div>
    {community.unread > 0 && (
      <span className="bg-[#007AFF] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,122,255,0.4)]">
        {community.unread}
      </span>
    )}
  </motion.button>
);

const PostCard = ({ post }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6 rounded-[32px] space-y-4 hover:border-white/20 transition-all group"
  >
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10">
          <img src={post.user.image} alt={post.user.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-white">{post.user.name}</h4>
            <span className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-black text-[#007AFF] uppercase tracking-wider">
              {post.user.role}
            </span>
            {post.user.badge && (
              <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-500 uppercase tracking-wider">
                {post.user.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500">{post.time}</p>
        </div>
      </div>
      <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-all">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>

    <p className="text-sm text-zinc-300 leading-relaxed font-medium">
      {post.content}
    </p>

    {post.image && (
      <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video">
        <img src={post.image} alt="Post content" className="w-full h-full object-cover" />
      </div>
    )}

    <div className="flex flex-wrap gap-2">
      {post.tags.map(tag => (
        <span key={tag} className="text-[10px] font-bold text-[#007AFF] hover:underline cursor-pointer">
          #{tag}
        </span>
      ))}
    </div>

    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-zinc-500 hover:text-[#007AFF] transition-colors">
          <ThumbsUp className="w-4 h-4" />
          <span className="text-xs font-bold">{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-zinc-500 hover:text-[#007AFF] transition-colors">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs font-bold">{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 text-zinc-500 hover:text-[#007AFF] transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
      <button className="text-zinc-500 hover:text-white transition-colors">
        <Bookmark className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

const ChatMessage = ({ msg }) => (
  <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} space-y-1`}>
    {!msg.isMe && <span className="text-[10px] font-black text-zinc-500 ml-4 mb-1 uppercase tracking-widest">{msg.user}</span>}
    <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium ${
      msg.isMe 
        ? 'bg-[#007AFF] text-white rounded-tr-none shadow-[0_10px_20px_rgba(0,122,255,0.2)]' 
        : 'bg-white/5 border border-white/10 text-zinc-300 rounded-tl-none'
    }`}>
      {msg.text}
    </div>
    <span className="text-[10px] text-zinc-600 font-medium px-2">{msg.time}</span>
  </div>
);

const CollaborationRoom = ({ title, active, members }) => (
  <div className="glass-card p-4 rounded-2xl flex items-center justify-between group hover:border-[#007AFF]/30 transition-all">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/5 border border-white/10'}`}>
        <Radio className={`w-5 h-5 ${active ? 'text-emerald-500 animate-pulse' : 'text-zinc-600'}`} />
      </div>
      <div>
        <h5 className="text-xs font-bold text-white group-hover:text-[#007AFF] transition-colors">{title}</h5>
        <p className="text-[10px] text-zinc-500 font-medium">{members} participating</p>
      </div>
    </div>
    <button className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
      active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/5 text-zinc-500'
    }`}>
      {active ? 'Join Room' : 'Enter'}
    </button>
  </div>
);

export default function CommunityPage() {
  const [activeCommunity, setActiveCommunity] = useState('c1');
  const [view, setView] = useState('Feed'); // 'Feed' or 'Chat'
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isImmersive, setIsImmersive] = useState(false);
  const chatEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const lastScrollY = useRef(0);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (view === 'Chat') scrollToBottom();
  }, [view]);

  // Handle Immersive Mode on Scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const globalNav = document.querySelector('nav.fixed.top-0');

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling Down - Enter Immersive Mode
        if (!isImmersive) {
          setIsImmersive(true);
          if (globalNav) {
            globalNav.style.transform = 'translateY(-100%)';
            globalNav.style.opacity = '0';
          }
        }
      } else if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        // Scrolling Up - Exit Immersive Mode
        if (isImmersive) {
          setIsImmersive(false);
          if (globalNav) {
            globalNav.style.transform = 'translateY(0)';
            globalNav.style.opacity = '1';
          }
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (globalNav) {
        globalNav.style.transform = 'translateY(0)';
        globalNav.style.opacity = '1';
      }
    };
  }, [isImmersive]);

  const currentCommunity = useMemo(() => COMMUNITIES.find(c => c.id === activeCommunity), [activeCommunity]);

  // Animation Variants
  const sidebarVariants = {
    visible: { opacity: 1, x: 0, width: '320px', display: 'flex', transition: { duration: 0.4, ease: 'easeInOut' } },
    hidden: { opacity: 0, x: -50, width: 0, transition: { duration: 0.4, ease: 'easeInOut' }, transitionEnd: { display: 'none' } }
  };

  const trendingVariants = {
    visible: { opacity: 1, x: 0, width: '320px', display: 'flex', transition: { duration: 0.4, ease: 'easeInOut' } },
    hidden: { opacity: 0, x: 50, width: 0, transition: { duration: 0.4, ease: 'easeInOut' }, transitionEnd: { display: 'none' } }
  };

  const headerVariants = {
    visible: { y: 0, opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    hidden: { y: -100, opacity: 0, height: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-[#030303] pt-28 pb-20 px-6 overflow-hidden flex flex-col items-center">
      
      {/* Immersive Mode Header Indicator */}
      <AnimatePresence>
        {isImmersive && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-4 px-6 py-3 glass-panel rounded-full shadow-2xl border-white/10"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: currentCommunity.color + '20' }}>
               <currentCommunity.icon className="w-4 h-4" style={{ color: currentCommunity.color }} />
            </div>
            <h3 className="text-sm font-black text-white whitespace-nowrap">{currentCommunity.name}</h3>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{view} Mode</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Minimal Dock (Focus Mode) */}
      <AnimatePresence>
        {isImmersive && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 p-2 glass-panel rounded-[24px] shadow-2xl border-white/10"
          >
             {[
               { icon: Compass, label: 'Explore', onClick: () => setIsImmersive(false) },
               { icon: Bell, label: 'Notifications' },
               { icon: Search, label: 'Search' },
               { icon: Users, label: 'Members' },
               { icon: ChevronUp, label: 'Scroll Top', onClick: () => scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' }) }
             ].map((btn, i) => (
               <button 
                 key={i}
                 onClick={btn.onClick}
                 className="p-3 rounded-2xl hover:bg-white/10 text-zinc-400 hover:text-white transition-all group relative"
               >
                  <btn.icon className="w-5 h-5" />
                  <span className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-black/90 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
                    {btn.label}
                  </span>
               </button>
             ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#007AFF]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className={`max-w-7xl mx-auto flex gap-8 h-[calc(100vh-180px)] transition-all duration-500 ${isImmersive ? 'w-full' : 'max-w-7xl'}`}>
        
        {/* Left Sidebar: Communities List */}
        <motion.aside 
          variants={sidebarVariants}
          animate={isImmersive ? 'hidden' : 'visible'}
          className="flex flex-col gap-6 overflow-y-auto no-scrollbar pr-2"
        >
           <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Your Communities</h3>
                <button className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-[#007AFF] transition-all">
                   <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-2">
                {COMMUNITIES.map((c) => (
                  <SidebarItem 
                    key={c.id} 
                    community={c} 
                    isActive={activeCommunity === c.id}
                    onClick={setActiveCommunity}
                  />
                ))}
              </div>
           </div>

           <div className="space-y-4 pt-6 border-t border-white/5">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2">Trending Topics</h3>
              <div className="space-y-1">
                 {['Hackathons', 'Interview Prep', 'Career Guidance', 'Project Collab'].map(topic => (
                   <button key={topic} className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-all flex items-center gap-2">
                      <Hash className="w-3.5 h-3.5" />
                      {topic}
                   </button>
                 ))}
              </div>
           </div>

           <div className="mt-auto pt-6 border-t border-white/5">
              <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#007AFF] text-white font-black text-xs shadow-[0_10px_20px_rgba(0,122,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all">
                 <Compass className="w-4 h-4" />
                 Explore Communities
              </button>
           </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className={`flex-1 flex flex-col glass-card rounded-[40px] overflow-hidden relative transition-all duration-500 ${
          isImmersive ? 'max-w-3xl mx-auto shadow-[0_0_60px_rgba(0,122,255,0.1)] border-white/10' : 'border-white/5'
        }`}>
           
           {/* Community Header (Hide on Immersive) */}
           <motion.header 
             variants={headerVariants}
             animate={isImmersive ? 'hidden' : 'visible'}
             className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] backdrop-blur-md sticky top-0 z-20 overflow-hidden"
           >
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: currentCommunity.color + '20', border: `1px solid ${currentCommunity.color}40` }}>
                    <currentCommunity.icon className="w-6 h-6" style={{ color: currentCommunity.color }} />
                 </div>
                 <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                       {currentCommunity.name}
                       {currentCommunity.active && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                    </h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{currentCommunity.members} Members • {currentCommunity.online} Online</p>
                 </div>
              </div>

              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
                 {['Feed', 'Chat'].map(v => (
                   <button
                     key={v}
                     onClick={() => setView(v)}
                     className={`px-6 py-2 rounded-xl text-xs font-bold transition-all relative ${
                       view === v ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                     }`}
                   >
                     {view === v && (
                       <motion.div
                         layoutId="view-active"
                         className="absolute inset-0 bg-[#007AFF] rounded-xl -z-10 shadow-[0_0_15px_rgba(0,122,255,0.3)]"
                         transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                       />
                     )}
                     {v}
                   </button>
                 ))}
              </div>

              <div className="flex items-center gap-3">
                 <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all">
                    <UserPlus className="w-5 h-5" />
                 </button>
                 <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all">
                    <Search className="w-5 h-5" />
                 </button>
              </div>
           </motion.header>

           {/* Content List */}
           <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8 relative"
           >
              {view === 'Feed' ? (
                <div className={`space-y-8 transition-all duration-500 ${isImmersive ? 'px-4' : ''}`}>
                   {/* Create Post Input */}
                   <div className="glass-card p-6 rounded-[32px] flex gap-4 border-dashed border-[#007AFF]/30">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center border border-white/10">
                         <MessageSquare className="w-5 h-5 text-zinc-500" />
                      </div>
                      <input 
                        type="text" 
                        placeholder={`Start a discussion in ${currentCommunity.name}...`}
                        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-600"
                      />
                      <div className="flex gap-2">
                        <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-500"><Paperclip className="w-4 h-4" /></button>
                        <button className="p-2 rounded-xl hover:bg-white/5 text-zinc-500"><Smile className="w-4 h-4" /></button>
                        <button className="px-4 py-2 rounded-xl bg-[#007AFF] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#007AFF]/20">Post</button>
                      </div>
                   </div>

                   {/* Feed Content */}
                   {FEED_POSTS.map(post => (
                     <PostCard key={post.id} post={post} />
                   ))}
                </div>
              ) : (
                <div className="flex flex-col h-full">
                   <div className={`flex-1 space-y-6 pb-20 transition-all duration-500 ${isImmersive ? 'px-4' : ''}`}>
                      <div className="flex flex-col items-center py-12 text-center">
                         <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-6" style={{ backgroundColor: currentCommunity.color + '20', border: `1px solid ${currentCommunity.color}40` }}>
                            <currentCommunity.icon className="w-10 h-10" style={{ color: currentCommunity.color }} />
                         </div>
                         <h3 className="text-2xl font-black text-white">Welcome to {currentCommunity.name} Chat!</h3>
                         <p className="text-zinc-500 text-sm max-w-xs mx-auto">This is the beginning of the conversation. Be respectful and helpful!</p>
                      </div>

                      {CHAT_MESSAGES.map(msg => (
                        <ChatMessage key={msg.id} msg={msg} />
                      ))}
                      <div ref={chatEndRef} />
                   </div>

                   {/* Chat Input */}
                   <div className={`absolute bottom-6 left-6 right-6 z-30 transition-all duration-500 ${isImmersive ? 'px-4 bottom-8' : ''}`}>
                      <div className="glass-panel p-2 rounded-2xl flex items-center gap-2 border border-white/10 shadow-2xl">
                         <button className="p-3 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-[#007AFF] transition-all">
                            <Plus className="w-5 h-5" />
                         </button>
                         <input 
                           type="text" 
                           placeholder="Message #general"
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                           onKeyPress={(e) => e.key === 'Enter' && setMessage('')}
                           className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-600 px-2"
                         />
                         <div className="flex items-center gap-1">
                            <button className="p-3 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-all"><Mic className="w-5 h-5" /></button>
                            <button className="p-3 rounded-xl hover:bg-white/5 text-zinc-500 hover:text-white transition-all"><Smile className="w-5 h-5" /></button>
                            <button 
                              onClick={() => setMessage('')}
                              className="p-3 rounded-xl bg-[#007AFF] text-white shadow-lg shadow-[#007AFF]/20 hover:scale-110 active:scale-95 transition-all"
                            >
                               <Send className="w-5 h-5" />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </main>

        {/* Right Sidebar: Trending & AI Assistant */}
        <motion.aside 
          variants={trendingVariants}
          animate={isImmersive ? 'hidden' : 'visible'}
          className="flex flex-col gap-8 overflow-y-auto no-scrollbar pb-10"
        >
           
           {/* AI Assistant Section */}
           <section className="glass-card p-6 rounded-[32px] relative overflow-hidden border-[#007AFF]/20 shadow-[0_0_40px_rgba(0,122,255,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/10 via-transparent to-transparent pointer-events-none" />
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-[#007AFF]" />
                 AI Community Helper
              </h3>
              <div className="space-y-4">
                 <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                    "Based on your <span className="text-white font-bold">AI/ML interests</span>, I recommend checking out the new <span className="text-[#007AFF] font-bold">Llama 3 discussion</span> thread."
                 </p>
                 <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[10px] text-zinc-500 italic">
                    AI Summary: 12 new posts about internship deadlines in your area.
                 </div>
                 <button className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                    Ask AI Assistant
                 </button>
              </div>
           </section>

           {/* Collaboration Rooms */}
           <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2 flex items-center justify-between">
                 Active Rooms
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </h3>
              <div className="space-y-3">
                 <CollaborationRoom title="DSA Practice Room" active={true} members="12" />
                 <CollaborationRoom title="System Design Collab" active={true} members="8" />
                 <CollaborationRoom title="Portfolio Review" active={false} members="0" />
              </div>
           </section>

           {/* Trending Now */}
           <section className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 px-2">Trending Now</h3>
              <div className="flex flex-wrap gap-2 px-2">
                 {TRENDING.map(t => (
                   <button 
                     key={t.tag}
                     className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 hover:text-white hover:border-[#007AFF]/50 transition-all flex flex-col"
                   >
                     <span className="text-[#007AFF]">{t.tag}</span>
                     <span className="text-[8px] font-medium text-zinc-600">{t.count}</span>
                   </button>
                 ))}
              </div>
           </section>

           {/* Leaderboard Section */}
           <section className="glass-card p-6 rounded-[32px]">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                 <Award className="w-4 h-4 text-yellow-500" />
                 Top Contributors
              </h3>
              <div className="space-y-4">
                 {[
                   { name: 'Sarah Chen', xp: '12,450', rank: 1 },
                   { name: 'Alex Rivera', xp: '10,200', rank: 2 },
                   { name: 'Kevin Park', xp: '8,900', rank: 3 },
                 ].map(u => (
                   <div key={u.name} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-black text-zinc-500 group-hover:bg-[#007AFF] group-hover:text-white transition-all">
                            {u.rank}
                         </div>
                         <span className="text-xs font-bold text-zinc-300 group-hover:text-white">{u.name}</span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-500">{u.xp} XP</span>
                   </div>
                 ))}
              </div>
           </section>

        </motion.aside>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
