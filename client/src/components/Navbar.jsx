import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

function NavLink({ to, children, isHovered, onHover }) {
  const location = useLocation();
  const isActive = location.pathname === to || location.hash === to;

  return (
    <Link 
      to={to} 
      className="relative px-4 py-2 rounded-full outline-none"
      onMouseEnter={onHover}
      onFocus={onHover}
    >
      <motion.div
        className={`relative z-10 transition-colors duration-300 text-sm font-medium ${
          isActive || isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/70'
        }`}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            layoutId="navbar-hover"
            className="absolute inset-0 z-0 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
}

export default function Navbar() {
  const [hoveredPath, setHoveredPath] = useState(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const links = [
    { name: 'Features', path: '#features' },
    { name: 'About', path: '#about' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <motion.div 
        animate={{
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
          borderColor: isScrolled ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 4px 30px rgba(0, 0, 0, 0)',
        }}
        transition={{ duration: 0.3 }}
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-6 py-3"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-inner group-hover:shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all"
          >
            <span className="font-bold text-white">P</span>
          </motion.div>
          <span className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-purple-200">
            Peerly
          </span>
        </Link>

        <div 
          className="hidden items-center gap-2 md:flex relative"
          onMouseLeave={() => setHoveredPath(null)}
          onBlur={() => setHoveredPath(null)}
        >
          {links.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              isHovered={hoveredPath === link.path}
              onHover={() => setHoveredPath(link.path)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link 
            to="/login/student" 
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:text-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:backdrop-blur-md sm:block"
          >
            Login
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register/student"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
