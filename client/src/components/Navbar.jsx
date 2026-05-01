import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-inner">
            <span className="font-bold text-white">C</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            ConnectHub
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="#features" className="text-sm font-medium text-white/70 transition-colors hover:text-white">Features</Link>
          <Link to="#about" className="text-sm font-medium text-white/70 transition-colors hover:text-white">About</Link>
          <Link to="#contact" className="text-sm font-medium text-white/70 transition-colors hover:text-white">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login/student" className="hidden text-sm font-medium text-white/70 transition-colors hover:text-white sm:block">
            Login
          </Link>
          <Link
            to="/register/student"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:scale-105 hover:bg-white/90 active:scale-95"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
