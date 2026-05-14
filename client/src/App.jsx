import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-[#007AFF]/30 relative overflow-x-hidden">
      
      {/* Global Interactive Cursor Glow */}
      <motion.div 
        className="cursor-glow"
        animate={{
          x: mousePos.x - 200,
          y: mousePos.y - 200,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, restDelta: 0.001 }}
      />

      <div className="relative flex min-h-screen flex-col">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />
              <Route 
                path="/dashboard" 
                element={isLoggedIn ? <DashboardPage /> : <Navigate to="/login/student" replace />} 
              />
              <Route path="/login/:role" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/register/:role" element={<RegisterPage onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      {/* Floating Chat Button - Only show when logged in if requested, but user said "it added the feature on the home page", maybe this button too */}
      <AnimatePresence>
        {isLoggedIn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-[#007AFF] text-white shadow-[0_10px_30px_rgba(0,122,255,0.4)] flex items-center justify-center z-50 border border-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
