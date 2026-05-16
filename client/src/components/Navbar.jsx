import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Edit3, 
  ChevronDown,
  LayoutDashboard,
  Compass,
  Calendar,
  Users,
  BookOpen,
  Zap,
  Info,
  Mail
} from 'lucide-react';

function NavLink({ to, children, icon: Icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className="relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all group"
    >
      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`} />
      <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>
        {children}
      </span>
      {isActive && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 bg-white/5 border border-white/10 rounded-xl -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

export default function Navbar({ isLoggedIn, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loggedInLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'My Sessions', path: '/sessions', icon: Calendar },
    { name: 'Community', path: '/community', icon: Users },
  ];

  const visitorLinks = [
    { name: 'Features', path: '/#features', icon: Zap },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'About', path: '/#about', icon: Info },
    { name: 'Contact', path: '/#contact', icon: Mail },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass-panel rounded-2xl px-6 py-2.5 flex items-center justify-between transition-all ${isScrolled ? 'shadow-2xl border-white/10' : 'border-transparent'}`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#007AFF] to-[#7000FF] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="font-bold text-white text-lg">M</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white hidden md:block">
              Mentor <span className="text-zinc-500 font-medium">Connect</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {(isLoggedIn ? loggedInLinks : visitorLinks).map((link) => (
              <NavLink key={link.path} to={link.path} icon={link.icon}>
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                {/* Search */}
                <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-3 py-1.5 focus-within:border-white/20 transition-all">
                  <Search className="w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Search mentors..." 
                    className="bg-transparent border-none outline-none text-sm text-white placeholder:text-zinc-600 w-32 focus:w-48 transition-all"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
                  <Bell className="w-5 h-5 text-zinc-400" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#030303]" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-all active:scale-95"
                  >
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-white/10">
                      <User className="w-4 h-4 text-zinc-400" />
                    </div>
                    <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-3 w-56 glass-card rounded-2xl p-2 overflow-hidden"
                      >
                        <div className="px-3 py-2 mb-2">
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Account</p>
                        </div>
                        <div className="space-y-1">
                          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-zinc-300 transition-colors">
                            <User className="w-4 h-4" /> View Profile
                          </button>
                          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-zinc-300 transition-colors">
                            <Edit3 className="w-4 h-4" /> Edit Profile
                          </button>
                          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-zinc-300 transition-colors">
                            <Settings className="w-4 h-4" /> Settings
                          </button>
                          <div className="h-px bg-white/5 my-2" />
                          <button 
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-rose-500/10 text-sm text-rose-400 transition-colors"
                          >
                            <LogOut className="w-4 h-4" /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/login/student"
                  className="px-5 py-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register/student"
                  className="px-5 py-2 rounded-xl bg-white text-black text-sm font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
