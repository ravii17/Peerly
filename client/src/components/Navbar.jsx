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
          isActive || isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'text-[#86868B]'
        }`}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#0071E3] via-[#BF40BF] to-[#5AC8FA] shadow-[0_0_15px_rgba(0,113,227,0.4)]"
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0.6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ originX: 0.5 }}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            layoutId="navbar-hover"
            className="absolute inset-0 z-0 rounded-full bg-white/5 backdrop-blur-md border border-white/5"
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
    { name: 'Features', path: '/features' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
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
          backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.3)',
          borderColor: isScrolled ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
        }}
        transition={{ duration: 0.3 }}
        className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-6 py-3 liquid-glass"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#0071E3] to-[#BF40BF] shadow-inner group-hover:shadow-[0_0_15px_rgba(0,113,227,0.6)] transition-all"
          >
            <span className="font-bold text-white text-sm">P</span>
          </motion.div>
          <span className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-white/90">
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
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-[#86868B] transition-all duration-300 hover:text-white hover:bg-white/5 sm:block"
          >
            Login
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/register/student"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-[#F5F5F7] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
