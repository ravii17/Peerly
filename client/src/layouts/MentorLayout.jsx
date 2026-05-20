import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Globe, 
  TrendingUp, 
  MessageSquare, 
  Settings, 
  LogOut,
  Bell,
  Search,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', path: '/mentor/dashboard', icon: LayoutDashboard },
  { name: 'My Sessions', path: '/mentor/sessions', icon: Calendar },
  { name: 'Students', path: '/mentor/students', icon: Users },
  { name: 'Community', path: '/mentor/community', icon: Globe },
  { name: 'Analytics', path: '/mentor/analytics', icon: TrendingUp },
  { name: 'Messages', path: '/mentor/messages', icon: MessageSquare },
  { name: 'Settings', path: '/mentor/settings', icon: Settings },
];

export default function MentorLayout({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading animation on initial login redirect
    const timer = setTimeout(() => setIsLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/login/mentor');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#9D00FF] to-[#00E5FF] flex items-center justify-center animate-pulse-glow shadow-[0_0_30px_rgba(157,0,255,0.4)]">
            <span className="font-black text-white text-3xl">M</span>
          </div>
          <p className="text-[#00E5FF] font-bold tracking-widest text-sm uppercase animate-pulse">Initializing Interface...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#9D00FF]/30 flex">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl glass-panel hover:bg-white/5"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isMobileMenuOpen || window.innerWidth >= 1024) && (
          <motion.aside 
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#050505] border-r border-white/5 flex flex-col transition-transform lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <div className="p-6">
              <Link to="/mentor/dashboard" className="flex items-center gap-3 mb-10 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9D00FF] to-[#00E5FF] flex items-center justify-center shadow-[0_0_15px_rgba(157,0,255,0.4)] group-hover:scale-110 transition-transform">
                  <span className="font-bold text-white text-xl">M</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Mentor <span className="text-zinc-500 font-medium">Connect</span>
                </span>
              </Link>

              <nav className="space-y-2">
                {sidebarItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${isActive ? 'text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                    >
                      <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#00E5FF]' : 'group-hover:text-white'}`} />
                      <span className="font-medium text-sm">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="absolute inset-0 bg-[#9D00FF]/10 border border-[#9D00FF]/20 rounded-xl -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="mt-auto p-6 space-y-4">
              <div className="glass-panel p-4 rounded-2xl border-[#00E5FF]/20">
                <p className="text-xs text-zinc-400 mb-2">Mentor Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
                  <span className="text-sm font-bold text-white">Accepting Mentees</span>
                </div>
              </div>
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors group"
              >
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col relative overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between lg:justify-end">
          <div className="lg:hidden w-10" /> {/* Spacer for mobile menu btn */}
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 glass-panel rounded-xl px-3 py-2 focus-within:border-[#00E5FF]/50 transition-all">
              <Search className="w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search students, sessions..." 
                className="bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-600 w-48 focus:w-64 transition-all"
              />
            </div>
            
            <button className="relative p-2 rounded-xl glass-panel hover:bg-white/5 transition-all">
              <Bell className="w-5 h-5 text-zinc-400 hover:text-white" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#9D00FF] rounded-full border-2 border-[#050505] shadow-[0_0_8px_rgba(157,0,255,0.6)]" />
            </button>
            
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9D00FF] to-[#00E5FF] p-0.5 cursor-pointer">
              <div className="w-full h-full bg-zinc-900 rounded-[10px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Render nested routes */}
        <div className="flex-1 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-6 md:p-10"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
